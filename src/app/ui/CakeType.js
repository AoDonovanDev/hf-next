import { useState } from "react"

export default function CakeType({dispatch, warnings, existingInfo}){

  const [type, setType] = useState(existingInfo.cakeType ?? 'trust');
  const [size, setSize] = useState(existingInfo.cakeSize ?? '');

  function toggle(){
    const cakeType = (type === 'custom') ? 'trust' : 'custom';
    setType(cakeType);
    console.log(type)
  }

  function prev(){
    dispatch({type: 'prev'})
  }

  function next(formData){
    if(!size){
      dispatch({type: 'warn', payload: {cakeSize: "Please select a size!"}})
    } else {
    dispatch({type: 'next', payload: {cakeType: type, cakeSize: size}})
    }
  }

  function radioHandler(e){
    setSize(e.target.value);
  }

  return (
    <div className="form-control flex justify-between w-full h-full overflow-auto overscroll-contain">
      <label className="cursor-pointer label flex justify-center m-6">
        <div className="flex flex-col">
          <label className="swap swap-flip text-2xl">
            {/* this hidden checkbox controls the state */}
            <input type="checkbox" checked={type === 'trust'} readOnly={true}/>
            <div className="swap-on ml-4">Trust</div>
            <div className="swap-off">Custom</div>
          </label>
          <input type="checkbox" className="toggle toggle-secondary w-full" checked={type === 'trust'} onChange={()=>toggle()} />
        </div>
      </label>
      <p className="m-6">{type==='trust' ? "Trust Cake: This is like a dealer's choice. The only information requirements are any allergies, dislikes, and size. If there is a specific cake Housefly has produced that you want your cake to be inspired by design wise, please attach a photo at the end of this form. All prompts, details or preferences you want to share are welcome! These typically lean toward the whimsical side of things."
      : "Custom cake: Totally up to you! Choose from options in the drop down menus and add any other details in the text box on the next page. Some flavors are combinable! "}</p>
      <div className="flex flex-col">
        <p className="text-red-400 ml-6">{warnings.cakeSize}</p>
        <div className="flex">
          <input type="radio" name="cakeSize" className="radio radio-secondary" checked={size === '6'} onChange={(e)=>radioHandler(e)} value={6}/>
          <label>6” ~ 8-10 servings {type === 'trust' ? '$80' : '$100'}</label>
        </div>
        <div className="flex">
          <input type="radio" name="cakeSize" className="radio radio-secondary" checked={size === '8'} onChange={(e)=>radioHandler(e)} value={8}/>
          <label>8” ~ 12-15 servings {type === 'trust' ? '$100' : '$120'}</label>
        </div>
      </div>
      <div className="flex justify-between">
        <form action={prev} className="flex self-start justify-start m-6">
          <button className="btn btn-warn">Previous</button>
        </form>
        <form action={next} className="flex self-end m-6">
          <input readOnly={true} value={type} name="trust" hidden={true}/>
          <input readOnly={true} value={size} name="cakeSize" hidden={true}/>
          <button className="btn btn-primary">Next</button>
        </form>
      </div>
    </div>
  )
}