import DatePicker from "react-datepicker";
import { useState } from "react";
import { getDay, add } from "date-fns";
import "react-datepicker/dist/react-datepicker.css";


export default function Pickup({dispatch, existingInfo, warnings, cakeDays, unavailable}){

  const [startDate, setStartDate] = useState(existingInfo.pickupDetails?.date ? new Date(existingInfo.pickupDetails.date) : '');
  const [time, setTime] = useState(existingInfo.pickupDetails?.pickupTime ? existingInfo.pickupDetails.pickupTime : null);
  const isAvailable = (date) => {
    const day = getDay(date);
    return day === 3 || day === 4 || day === 5 || day === 6;
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

  function isUnavilable(btnTime) {
    if(!cakeDays.length){
      return false;
    } else {
      return cakeDays.find(c => c.date == startDate)?.pickup1 === btnTime;
    }
  }

  function buttonClasses(btnTime){
    if(isUnavilable(btnTime)){
      return "formBtn line-through cursor-not-allowed disabled";
    } else if(time === btnTime){
      return "formBtn btn-success";
    } else {
      return "formBtn";
    }
  }

  return (
    <div className="Pickup h-full flex flex-col py-6 items-center">
      <h1 className="text-xl font-bold self-center cursiveHeader">Pickup Info</h1>
      {/* <p className="mt-[24px] text-sm mx-[8px]">If the date you&apos;d like is not available on the calendar, there are no pick ups left for that day. 
        Consider picking a day close to what you&apos;d like - cakes can last up to 4 days if kept refrigerated in their original box.
      </p> */}
      <p className="mt-[24px] text-sm mx-[8px]">Closed for now! Follow me on instagram for updates!
      </p>
      <div className="flex justify-center my-6">
        <p className="text-red-400">{warnings.pickupDate}</p>
        <p className="text-red-400">{warnings.pickupTime}</p>
      </div>
      <div className="flex gap-4 justify-self-start">
        <DatePicker
          selected={startDate}
          onChange={(date) => {
            setTime(null);
            setStartDate(date);
            }
          }
          filterDate={isAvailable}
          excludeDates={[...unavailable,  new Date(2025, 1, 13),
            new Date(2025, 1, 14),
            new Date(2025, 2, 14),
            new Date(2025, 1, 27)]}
          excludeDateIntervals={[
            { start: new Date(), end: add(new Date(), {
              days: 5
            })},
          ]}
          minDate={new Date(2025, 0, 30)}
          maxDate={new Date(2025, 0, 29)}
          placeholderText="Select a day for pickup"
          form="external-form"
          inline
        />
        <div className="flex flex-col justify-center items-center">
          <label htmlFor="12pm" className={buttonClasses('12:00')}>12:00pm</label>
          <label htmlFor="1230pm" className={buttonClasses('12:30')}>12:30pm</label>
          <label htmlFor="1pm" className={buttonClasses('1:00')}>1:00pm</label>
          <label htmlFor="130pm" className={buttonClasses('1:30')}>1:30pm</label>
          <label htmlFor="2pm" className={buttonClasses('2:00')}>2:00pm</label>
          <label htmlFor="230pm" className={buttonClasses('2:30')}>2:30pm</label>
        </div>
      </div>
      <div className="flex justify-between items-end mt-8 h-full w-full">
        <form action={prev}>
          <button className="formBtn btn-warn w-[90px]">Previous</button>
        </form>
        <form id="external-form" action={next}>
          <input type="radio" name="pickupTime" id="12pm" value={'12:00'} onChange={timeClick} checked={time==='12:00'} hidden={true}/>
          <input type="radio" name="pickupTime" id="1230pm" value={'12:30'} onChange={timeClick} checked={time==='12:30'} hidden={true}/>
          <input type="radio" name="pickupTime" id="1pm" value={'1:00'} onChange={timeClick} checked={time==='1:00'} hidden={true}/>
          <input type="radio" name="pickupTime" id="130pm" value={'1:30'} onChange={timeClick} checked={time==='1:30'} hidden={true}/>
          <input type="radio" name="pickupTime" id="2pm" value={'2:00'} onChange={timeClick} checked={time==='2:00'} hidden={true}/>
          <input type="radio" name="pickupTime" id="230pm" value={'2:30'} onChange={timeClick} checked={time==='2:30'} hidden={true}/>
          <input hidden={true} defaultValue={startDate} name="date"/>
          <button className="formBtn btn-primary justify-self-end w-[90px]">Next</button>
        </form>
      </div>
    </div>
  );
}