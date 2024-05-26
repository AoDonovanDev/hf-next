import DatePicker from "react-datepicker"
import { useEffect, useState } from "react";
import { getDay } from "date-fns";
import "react-datepicker/dist/react-datepicker.css";
import { getCakeDays } from "../../lib/actions";


export default function Pickup({dispatch, existingInfo, warnings}){

  const [startDate, setStartDate] = useState(existingInfo.pickupDetails?.date ? new Date(existingInfo.pickupDetails.date) : '');
  const [time, setTime] = useState(existingInfo.pickupDetails?.pickupTime ? existingInfo.pickupDetails.pickupTime : null);
  const [cakeDays, setCakeDays] = useState([]);
  const [unavailable, setUnavilable] = useState([]);
  

  useEffect(() => {
    (async() => {
      const { cakeDays } = await getCakeDays();
      const booked = cakeDays.rows.filter(r => !r.available).map(r => new Date(r.date));
      setUnavilable(booked);
      setCakeDays(cakeDays.rows);
    })();
  }, [])

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

  function isUnavilable(btnTime) {
    if(!cakeDays.length){
      return false;
    } else {
      return cakeDays.find(c => c.date == startDate)?.pickup1 === btnTime
    }
  }

  function buttonClasses(btnTime){
    if(isUnavilable(btnTime)){
      return "formBtn btn-disabled line-through cursor-not-allowed";
    } else if(time === btnTime){
      return "formBtn btn-success";
    } else {
      return "formBtn";
    }
  }

  return (
    <div className="Pickup h-full flex flex-col py-6">
      <h1 className="text-xl font-bold self-center">Pickup Info</h1>
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
          filterDate={isOffDay}
          excludeDates={unavailable}
          excludeDateIntervals={[
            { start: new Date(), end: new Date('6-30-2024') },
          ]}
          minDate={new Date('7-01-2024')}
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
      <div className="flex justify-between justify-self-end items-end mt-8 h-full">
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