import { useState } from "react"

export default function CakeType({dispatch, warnings, existingInfo}){

  const [trust, setTrust] = useState(false)

  function toggle(){
    const cakeType = trust ? false : true;
    setTrust(cakeType);
    console.log(trust)
  }

  function prev(){
    dispatch({type: 'prev'})
  }

  return (
    <div className="form-control w-52">
      <label className="cursor-pointer label">
        <label className="label-text">Trust</label> 
        <input type="checkbox" className="toggle toggle-secondary" checked={trust} onChange={()=>toggle()} />
      </label>




      <form action={prev}>
        <button className="btn btn-warn">Previous</button>
      </form>
    </div>
  )
}