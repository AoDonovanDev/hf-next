import { useState } from "react"

export default function CakeType({dispatch, warnings, existingInfo}){

  const [type, setType] = useState(existingInfo.cakeType ?? 'trust');
  const [size, setSize] = useState(existingInfo.cakeSize ?? '6');

  function toggle(){
    const cakeType = (type === 'custom') ? 'trust' : 'custom';
    setType(cakeType);
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
    <div className="form-control flex w-full h-full overflow-auto overscroll-contain py-6">
      <h1 className="text-xl font-bold self-center cursiveHeader">Trust or Custom</h1>
      <label className="cursor-pointer label flex justify-center">
        <div className="flex flex-col">
          <label className="swap swap-flip text-2xl">
            <input type="checkbox" checked={type === 'trust'} readOnly={true}/>
            <div className="swap-on ml-4">Trust</div>
            <div className="swap-off">Custom</div>
          </label>
          <input type="checkbox" className="toggle toggle-secondary w-full" checked={type === 'trust'} onChange={()=>toggle()} />
          <p className="flex justify-center text-xs">switch</p>
        </div>
      </label>
      {type === 'trust' ?
      <p className="mx-[16px] my-[24px]">This is like a dealer&apos;s choice. The only information requirements are any allergies, dislikes, and size. These typically lean toward the whimsical side of things and will be decorated in a HFV signature style.</p> : 
      <><p className="mx-[16px] my-[24px]">Totally up to you! Choose from options in the drop down menus and add any other details in the text box on the next page. Some flavors are combinable! Specific designs or requests fall into this category. If you&apos;re wanting a themed cake or specific elements, it is a custom cake. Pick this option also if you would like to try a partial trust cake.</p><br/> 
      <p className="mx-[16px] mb-[24px]">Partial Trust: You pick the flavors, Housefly picks the design.</p></>
      }
      <div className="flex flex-col">
        <p className="text-red-400 ml-6">{warnings.cakeSize}</p>
        <div className="flex">
          <input type="radio" name="cakeSize" className="radio radio-secondary" id="sixInch" checked={size === '6'} onChange={(e)=>radioHandler(e)} value={6}/>
          <label htmlFor="sixInch">6” ~ 8-10 servings {type === 'trust' ? '$80' : '$100'}</label>
        </div>
        <div className="flex">
          <input type="radio" name="cakeSize" className="radio radio-secondary" id="eightInch" checked={size === '8'} onChange={(e)=>radioHandler(e)} value={8}/>
          <label htmlFor="eightInch">8” ~ 12-15 servings {type === 'trust' ? '$100' : '$120'}</label>
        </div>
      </div>
      <div className="flex justify-between h-full items-end">
        <form action={prev} className="flex mx-6">
          <button className="formBtn btn-warn">Previous</button>
        </form>
        <form action={next} className="flex mx-6">
          <input readOnly={true} value={type} name="trust" hidden={true}/>
          <input readOnly={true} value={size} name="cakeSize" hidden={true}/>
          <button className="formBtn btn-primary">Next</button>
        </form>
      </div>
    </div>
  )
}