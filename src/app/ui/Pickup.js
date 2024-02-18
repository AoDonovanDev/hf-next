import DatePicker from "react-datepicker"
import { useState } from "react";
import { getDay, setHours, setMinutes } from "date-fns";
import "react-datepicker/dist/react-datepicker.css";


export default function Pickup({dispatch, existingInfo, warnings}){

  const [startDate, setStartDate] = useState(existingInfo.pickupDate ? new Date(existingInfo.pickupDate) : '');
  const [time, setTime] = useState(null)
  const isOffDay = (date) => {
    const day = getDay(date);
    return day !== 0 && day !== 1 && day !== 2;
  };

  function next(formData){
    const date = formData.get('date');
    const pickupTime = formData.get('pickupTime')
    if(!date) {
      dispatch({
        type: 'warn', 
        payload: {
          pickupDate: 'Pickup Date Required'
        }
      });
    } else if(!pickupTime) {
      dispatch({
        type: 'warn', 
        payload: {
          pickupTime: 'Pickup Time Required'
        }
      });
    } else {
      dispatch({
        type: "next", payload: {
          pickupDetails: {
            date,
            pickupTime
          }
        }
      });
    }
  }

  function timeClick(e){
    setTime(parseInt(e.target.value));
  }

  function prev(){
    dispatch({type: "prev"});
  }

  return (
    <div className="Pickup h-full flex flex-col justify-center">
      <div className="flex justify-center mb-6">
        <p className="text-red-400">{warnings.pickupDate}</p>
        <p className="text-red-400">{warnings.pickupTime}</p>
      </div>
      <div className="flex">
        <DatePicker
          selected={startDate}
          onChange={(date) => setStartDate(date)}
          filterDate={isOffDay}
          placeholderText="Select a day for pickup"
          form="external-form"
          inline
        />
        <div className="flex flex-col justify-center items-center">
          <label htmlFor="12pm" className={time === 12 ? "btn btn-success" : "btn"}>12pm</label>
          <label htmlFor="1pm" className={time === 1 ? "btn btn-success" : "btn"}>1pm</label>
          <label htmlFor="2pm" className={time === 2 ? "btn btn-success" : "btn"}>2pm</label>
        </div>
      </div>
      <div className="flex justify-between items-end mt-8">
        <form action={prev}>
          <button className="btn btn-warn">Previous</button>
        </form>
        <form id="external-form" action={next}>
          <input type="radio" name="pickupTime" id="12pm" value={12} onChange={timeClick} checked={time===12} hidden={true}/>
          <input type="radio" name="pickupTime" id="1pm" value={1} onChange={timeClick} checked={time===1} hidden={true}/>
          <input type="radio" name="pickupTime" id="2pm" value={2} onChange={timeClick} checked={time===2} hidden={true}/>
          <input hidden={true} defaultValue={startDate} name="date"/>
          <button className="btn btn-primary">Next</button>
        </form>
      </div>
    </div>
  );
}