import DatePicker from "react-datepicker"
import { useEffect, useState } from "react";
import { getDay } from "date-fns";
import "react-datepicker/dist/react-datepicker.css";
import { getCakeDays } from "../../lib/actions";


export default function Pickup({dispatch, existingInfo, warnings}){

  const [startDate, setStartDate] = useState(existingInfo.pickupDetails?.date ? new Date(existingInfo.pickupDetails.date) : '');
  const [time, setTime] = useState(existingInfo.pickupDetails?.pickupTime ? existingInfo.pickupDetails.pickupTime : null);
  const [cakeDays, setCakeDays] = useState('');

  useEffect(() => {
    (async() => {
      const { cakeDays } = await getCakeDays();
      setCakeDays(cakeDays.rows.filter(r => !r.available).map(r => new Date(r.date)));
    })();
  }, [])

  console.log(cakeDays)
  const isOffDay = (date) => {
    const day = getDay(date);
    return day === 5 || day === 6;
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
        type: "next", 
        payload: {
          pickupDetails: {
            date,
            pickupTime
          }
        }
      });
    }
  }

  function timeClick(e){
    setTime(e.target.value);
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
      <div className="flex gap-4">
        <DatePicker
          selected={startDate}
          onChange={(date) => setStartDate(date)}
          filterDate={isOffDay}
          excludeDates={cakeDays}
          minDate={new Date()}
          placeholderText="Select a day for pickup"
          form="external-form"
          inline
        />
        <div className="flex flex-col justify-center items-center">
          <label htmlFor="12pm" className={time === '12:00' ? "btn btn-success" : "btn"}>12:00pm</label>
          <label htmlFor="1230pm" className={time === '12:30' ? "btn btn-success" : "btn"}>12:30pm</label>
          <label htmlFor="1pm" className={time === '1:00' ? "btn btn-success" : "btn"}>1:00pm</label>
          <label htmlFor="130pm" className={time === '1:30' ? "btn btn-success" : "btn"}>1:30pm</label>
          <label htmlFor="2pm" className={time === '2:00' ? "btn btn-success" : "btn"}>2:00pm</label>
          <label htmlFor="230pm" className={time === '2:30' ? "btn btn-success" : "btn"}>2:30pm</label>
        </div>
      </div>
      <div className="flex justify-between items-end mt-8">
        <form action={prev}>
          <button className="btn btn-warn">Previous</button>
        </form>
        <form id="external-form" action={next}>
          <input type="radio" name="pickupTime" id="12pm" value={'12:00'} onChange={timeClick} checked={time==='12:00'} hidden={true}/>
          <input type="radio" name="pickupTime" id="1230pm" value={'12:30'} onChange={timeClick} checked={time==='12:30'} hidden={true}/>
          <input type="radio" name="pickupTime" id="1pm" value={'1:00'} onChange={timeClick} checked={time==='1:00'} hidden={true}/>
           <input type="radio" name="pickupTime" id="130pm" value={'1:30'} onChange={timeClick} checked={time==='1:30'} hidden={true}/>
            <input type="radio" name="pickupTime" id="2pm" value={'2:00'} onChange={timeClick} checked={time==='2:00'} hidden={true}/>
             <input type="radio" name="pickupTime" id="230pm" value={'2:30'} onChange={timeClick} checked={time==='2:30'} hidden={true}/>
          <input hidden={true} defaultValue={startDate} name="date"/>
          <button className="btn btn-primary">Next</button>
        </form>
      </div>
    </div>
  );
}