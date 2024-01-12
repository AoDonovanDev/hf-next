import DatePicker from "react-datepicker"
import { useState } from "react";
import { getDay } from "date-fns";
import "react-datepicker/dist/react-datepicker.css";


export default function Pickup({dispatch, existingInfo}){

  const [startDate, setStartDate] = useState(null);
  const isOffDay = (date) => {
    const day = getDay(date);
    return day !== 0 && day !== 1 && day !== 2;
  };

  function next(formData){
    const date = formData.get('date');
    dispatch({type: "next", payload: {pickupDate: date}});
  }

  function prev(){
    dispatch({type: "prev"})
  }

  return (
    <div className="Pickup">
      <DatePicker
        selected={existingInfo.pickupDate ? new Date(existingInfo.pickupDate) : startDate}
        onChange={(date) => setStartDate(date)}
        filterDate={isOffDay}
        placeholderText="Select a day for pickup"
        form="external-form"
        name="date"
      />
      <form id="external-form" action={next}>
        <button className="btn btn-primary">Next</button>
      </form>
      <form action={prev}>
        <button className="btn btn-warn">Previous</button>
      </form>
    </div>
  );
}