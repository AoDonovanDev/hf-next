export default function ContactInfo({dispatch, warnings, existingInfo}){


  function next(formData){
    const firstName = formData.get('firstName');
    const lastName = formData.get('lastName');
    const email = formData.get('email');
    const phoneNumber = formData.get('phoneNumber')

    if(!firstName){
      dispatch({type: 'warn', payload: {firstName: 'First Name Required'}})
    } 
    if(!lastName){
      dispatch({type: 'warn', payload: {lastName: 'Last Name Required'}})
    }
    if(!email){
      dispatch({type: 'warn', payload: {email: 'Email Required'}})
    }
    if(!phoneNumber){
      dispatch({type: 'warn', payload: {phoneNumber: "Phone Number Required"}})
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
    <form action={next}>
    
    <div className="join join-vertical">
      <label htmlFor="firstName" className={warnings.firstName ? "text-red-200" : "text-black"}>{warnings.firstName ? warnings.firstName : "First Name"}</label>
      <input type="text" placeholder="Type here" className="input input-bordered w-full max-w-xs" name="firstName" defaultValue={existingInfo.contactInfo?.firstName ?? ''}/>
      <label htmlFor="lastName" className={warnings.lastName ? "text-red-200" : "text-black"}>{warnings.lastName ? warnings.lastName : "Last Name"}</label>
      <input type="text" placeholder="Type here" className="input input-bordered w-full max-w-xs" name="lastName" defaultValue={existingInfo.contactInfo?.lastName ?? ''}/>
      <label htmlFor="email" className={warnings.email ? "text-red-200" : "text-black"}>{warnings.email ? warnings.email : "Email"}</label>
      <input type="text" placeholder="Type here" className="input input-bordered w-full max-w-xs" name="email" defaultValue={existingInfo.contactInfo?.email ?? ''}/>
      <label htmlFor="phoneNumber" className={warnings.phoneNumber ? "text-red-200" : "text-black"}>{warnings.phoneNumber ? warnings.phoneNumber : "Phone Number"}</label>
      <input type="text" placeholder="Type here" className="input input-bordered w-full max-w-xs" name="phoneNumber" defaultValue={existingInfo.contactInfo?.phoneNumber ?? ''}/>
      <button className="btn btn-primary w-1/3 flex self-end m-6">Next</button>
    </div>
    </form>
  )
}