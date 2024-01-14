import { useState } from "react"

export default function CakeType({dispatch, warnings, existingInfo}){

  const [type, setType] = useState(existingInfo.cakeType ?? 'custom');
  const [size, setSize] = useState(existingInfo.cakeSize ?? '6');

  function toggle(){
    const cakeType = (type === 'custom') ? 'trust' : 'custom';
    setType(cakeType);
    console.log(type)
  }

  function prev(){
    dispatch({type: 'prev'})
  }

  function next(formData){
    /* const cakeType = formData.get('type');
    const cakeSize = formData.get('cakeSize') */
    dispatch({type: 'next', payload: {cakeType: type, cakeSize: size}})
  }

  function radioHandler(e){
    setSize(e.target.value);
  }

  return (
    <div className="form-control flex md:w-full md:h-full justify-between">
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
      <p className="m-6">{type==='trust' ? "Trust Cake: A trust cake is a surprise! The only information requirements are any allergies, dislikes, and size. If there is a specific cake Housefly has produced that you want your cake to be inspired by design wise, please attach a photo at the end of this form. All prompts, details or preferences you want to share are welcome! "
      : "Custom cake: Totally up to you! Choose from options in the drop down menus and add any other details in the text box. Some flavors are combinable! "}</p>
      <div className="flex flex-col">
        <div className="flex">
          <input type="radio" name="cakeSize" className="radio radio-secondary" checked={size === '6'} onChange={(e)=>radioHandler(e)} value={6}/>
          <label>6” ~ 8-10 servings $80</label>
        </div>
        <div className="flex">
          <input type="radio" name="cakeSize" className="radio radio-secondary" checked={size === '8'} onChange={(e)=>radioHandler(e)} value={8}/>
          <label>8” ~ 12-15 servings $100</label>
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