import DatePicker from "react-datepicker"
import { useState } from "react";
import { getDay, setHours, setMinutes } from "date-fns";
import "react-datepicker/dist/react-datepicker.css";


export default function Pickup({dispatch, existingInfo, warnings}){

  const [startDate, setStartDate] = useState(existingInfo.pickupDate ? new Date(existingInfo.pickupDate) : '');
  const isOffDay = (date) => {
    const day = getDay(date);
    return day !== 0 && day !== 1 && day !== 2;
  };

  function next(formData){
    const date = formData.get('date');
    if(!date) {
      dispatch({type: 'warn', payload: {pickupDate: 'Pickup Date Required'}})
    } else {
    dispatch({type: "next", payload: {pickupDate: date}});
    }
  }

  function prev(){
    dispatch({type: "prev"})
  }

  return (
    <div className="Pickup">
      <h1 className="text-red-200">{warnings?.pickupDate}</h1>
      <DatePicker
        selected={startDate}
        onChange={(date) => setStartDate(date)}
        filterDate={isOffDay}
        includeTimes={[
        setHours(setMinutes(new Date(), 0), 12),
        setHours(setMinutes(new Date(), 0), 13),
        setHours(setMinutes(new Date(), 0), 14),
        setHours(setMinutes(new Date(), 0), 15),
      ]}
        showTimeSelect
        placeholderText="Select a day for pickup"
        form="external-form"
        inline
      />
      <div className="flex justify-between">
        <form action={prev}>
          <button className="btn btn-warn">Previous</button>
        </form>
        <form id="external-form" action={next}>
          <input hidden={true} defaultValue={startDate} name="date"/>
          <button className="btn btn-primary">Next</button>
        </form>
      </div>
    </div>
  );
}