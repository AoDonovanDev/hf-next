import { type } from "os";

export default function ContactInfo({dispatch, warnings, existingInfo}){


  function next(formData){
    const firstName = formData.get('firstName');
    const lastName = formData.get('lastName');
    const email = formData.get('email');
    const phoneNumber = formData.get('phoneNumber')
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    const phoneRegex = /^(?:\+1[-.\s]?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}$/;


    if(!firstName){
      dispatch({type: 'warn', payload: {firstName: 'First Name Required'}})
    } 
    else if(!lastName){
      dispatch({type: 'warn', payload: {lastName: 'Last Name Required'}})
    }
    else if(!email){
      dispatch({type: 'warn', payload: {email: 'Email Required'}})
    }
    else if(!emailRegex.test(email)){
      dispatch({type: 'warn', payload: {email: "Not a valid email."}})
    }
    else if(!phoneNumber){
      dispatch({type: 'warn', payload: {phoneNumber: "Phone Number Required"}})
    }
    else if(!phoneRegex.test(phoneNumber)){
      dispatch({type: 'warn', payload: {phoneNumber: "Not a valid phone number"}})
    }
    else {
      dispatch({type: 'next', payload: {
        contactInfo: {
          firstName,
          lastName,
          email,
          phoneNumber
        }
      }})
    }
  } 

  return (
    <form action={next} className="flex flex-col h-full justify-between py-6">
      <div className="join join-vertical p-[60px]">
        <h1 className="text-xl font-bold mb-[24px]">Contact Info</h1>
        <label htmlFor="firstName" className={warnings.firstName ? "text-red-400" : "text-black"}>{warnings.firstName ? warnings.firstName : "First Name"}</label>
        <input type="text" placeholder="Type here" className="input input-bordered w-full max-w-xs" name="firstName" defaultValue={existingInfo.contactInfo?.firstName ?? ''}/>
        <label htmlFor="lastName" className={warnings.lastName ? "text-red-400" : "text-black"}>{warnings.lastName ? warnings.lastName : "Last Name"}</label>
        <input type="text" placeholder="Type here" className="input input-bordered w-full max-w-xs" name="lastName" defaultValue={existingInfo.contactInfo?.lastName ?? ''}/>
        <label htmlFor="email" className={warnings.email ? "text-red-400" : "text-black"}>{warnings.email ? warnings.email : "Email"}</label>
        <input type="text" placeholder="Type here" className="input input-bordered w-full max-w-xs" name="email" defaultValue={existingInfo.contactInfo?.email ?? ''}/>
        <label htmlFor="phoneNumber" className={warnings.phoneNumber ? "text-red-400" : "text-black"}>{warnings.phoneNumber ? warnings.phoneNumber : "Phone Number"}</label>
        <input type="text" placeholder="Type here" className="input input-bordered w-full max-w-xs" name="phoneNumber" defaultValue={existingInfo.contactInfo?.phoneNumber ?? ''}/>
      </div>
      <button className="formBtn btn-primary w-[90px] flex self-end mr-[16px]">Next</button>
    </form>
  )
}