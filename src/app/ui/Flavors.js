'use client';

import uuid4 from "uuid4"
import { useState } from "react";

export default function Flavors({dispatch, warnings, existingInfo}){

  const flavors = ['Chocolate', 'Vanilla', 'Strawberry', 'Ube', 'Pandan', 'Fig', 'Black Sesame', 'Rosemary', 'Brown Butter', 'Espresso', 'Red Velvet', 
  'Hummingbird', 'Matcha', 'Lemon', 'Lime', 'Orange', 'Yuzu', 'Lavender', 'Earl Grey', 'Coconut', 'Carrot', 'Golden Milk', 'Mixed Berry', 'Tamarind', 
  'Banana', 'Mountain Dew', 'Cornmeal', 'Honey', 'Chai', 'Peach', 'Lychee', 'Other']

  const [other, setOther] = useState(existingInfo.cakeDetails?.fillingType === 'other' ? true : false);
  const [cakeFlavor, setCakeFlavor] = useState(existingInfo.cakeDetails?.cakeFlavor ? existingInfo.cakeDetails.cakeFlavor : 'placeholder');
  const [frostingFlavor, setFrostingFlavor] = useState(existingInfo.cakeDetails?.cakeFlavor ? existingInfo.cakeDetails.frostingFlavor : 'placeholder');


  function flavorPicker(e){
    setCakeFlavor(e.target.value)
  }
  function frostingPicker(e){
    setFrostingFlavor(e.target.value)
  }

  function handleOther(e){
    setOther(()=>{
      return e.target.value === 'other' ? true : false;
    })
    console.log(other)
  }

  function extraHandler(e){
    
    switch(e.target.name){
      case 'glitterCherries':
        dispatch(
          { 
            type: 'extra', 
            payload: {
              total: e.target.checked ? existingInfo.total + 5 : existingInfo.total - 5,
              name: 'glitterCherries', 
              checkedState: e.target.checked
            }
          })
        break
      case 'discoBalls':
        dispatch(
          {
            type: 'extra', 
            payload: {
              total: e.target.checked ? existingInfo.total + 10 : existingInfo.total - 10,
              name: 'discoBalls', 
              checkedState: e.target.checked
            }
          })
        break
      case 'treeTrunk':
        dispatch(
          {
            type: 'extra', 
            payload: {
              total: e.target.checked ? existingInfo.total + 20 : existingInfo.total - 20,
              name: 'treeTrunk',
              checkedState: e.target.checked
            }
          })
        break
      case 'bows':
        dispatch({
          type: 'extra', 
          payload: {
            total: e.target.checked ? existingInfo.total + 2 : existingInfo.total - 2,
            name: 'bows',
            checkedState: e.target.checked
          }
        })
        break
      case 'freshFruit':
        dispatch({
          type: 'extra',
          payload: {
            name: 'freshFruit',
            total: existingInfo.total,
            checkedState: e.target.schecked
          }
        })
    }
  }

  function next(formData){
    console.log(formData)
    const cakeFlavor = formData.get('cakeFlavor');
    const frostingType = formData.get('frostingType');
    const frostingFlavor = formData.get('frostingFlavor');
    const fillingType = formData.get('fillingType');
    const other = formData.get('other');
    const fillingFlavor = formData.get('fillingFlavor');
    const writeInCakeFlavor = formData.get('writeInCakeFlavor');
    const writeInFrostingFlavor = formData.get('writeInFrostingFlavor');

    const extras = {
      glitterCherries: formData.get('glitterCherries') === "on" ? true : false,
      discoBalls: formData.get('discoBalls') === "on" ? true : false,
      bows: formData.get('bows') === "on" ? true : false,
      freshFruit: formData.get('freshFruit') === "on" ? true : false
    }
    const cakeDetails = {
      cakeFlavor,
      writeInCakeFlavor: writeInCakeFlavor ? writeInCakeFlavor : '',
      frostingType,
      frostingFlavor,
      writeInFrostingFlavor: writeInFrostingFlavor ? writeInFrostingFlavor : '',
      fillingType,
      other: other ? other : '',
      fillingFlavor,
      extras
    }
    if(!cakeFlavor){
      dispatch({type: 'warn', payload:{cakeFlavor: "Please pick a cake flavor"}});
    }
    else if(!frostingType){
      dispatch({type: 'warn', payload:{frostingType: "Please pick a frosting type"}});
    }
    else if(!frostingFlavor){
      dispatch({type: 'warn', payload:{frostingFlavor: "Please pick a frosting flavor"}});
    } else {
      console.log(cakeDetails);
      dispatch({type: 'next', payload: { cakeDetails }})
    }
  }
    

  function prev(){
    dispatch({type: "prev"})
  }

  return (
    <form className="overflow-auto overflow-x-visible overscroll-contain lg:grid lg:grid-cols-2 pl-6 py-6 flex flex-col gap-6" action={next}>
      <div>
        <p className="text-red-400">{warnings.cakeFlavor}</p>
        <label htmlFor="cakeFlavor" className="font-semibold">What flavor cake?</label>
        <p className="text-sm font-thin">Some are combinable upon request</p>
        <select className="select select-bordered w-full max-w-xs" 
                name="cakeFlavor" 
                value={cakeFlavor} 
                onChange={flavorPicker} >
          <option disabled value={'placeholder'}>Choose a cake flavor</option>
          {flavors.map(f => <option key={uuid4()} value={f}>{f}</option>)}
        </select>
        {cakeFlavor === 'Other' && <input type="text" 
                         name="writeInCakeFlavor" 
                         placeholder="Please type another option here" 
                         className="input input-bordered input-sm input-info w-full max-w-xs"
                         defaultValue={existingInfo.cakeDetails?.writeInCakeFlavor ? existingInfo.cakeDetails.writeInCakeFlavor : ''}/>}
      </div>
      <div>
        <p className="text-red-400">{warnings.frostingType}</p>
        <label className="mb-2 font-semibold">Frosting type:</label>
        <div className="mb-2 flex items-center">
          <input type="radio" 
                 name="frostingType" 
                 className="radio radio-secondary" 
                 id={"smb"}
                 value={"Swiss Meringue Buttercream"} 
                 defaultChecked={existingInfo.cakeDetails?.frostingType === 'Swiss Meringue Buttercream'}/>
          <label htmlFor="smb" className="ml-6">Swiss Meringue Buttercream</label>
        </div>
        <div className="mb-2 flex items-center">
          <input type="radio" 
                 name="frostingType" 
                 className="radio radio-secondary" 
                 id={"ab"} 
                 value={"American Buttercream"}
                 defaultChecked={existingInfo.cakeDetails?.frostingType === 'American Buttercream'}/>
          <label htmlFor="ab" className="ml-6">American Buttercream</label>
        </div>
        <div className="mb-2 flex items-center">
          <input type="radio" 
                 name="frostingType" 
                 className="radio radio-secondary" 
                 id={"cc"}
                 value={"Cream Cheese"}
                 defaultChecked={existingInfo.cakeDetails?.frostingType === 'Cream Cheese'}/>
          <label htmlFor="cc" className="ml-6">Cream Cheese (not available for heavily piped cakes)</label>
        </div>
      </div>
      <div>
        <p className="text-red-400">{warnings.frostingFlavor}</p>
        <label className="mb-2 font-semibold">What flavor frosting?</label>
        <select className="select select-bordered w-full max-w-xs"
                name="frostingFlavor" 
                value={frostingFlavor}
                onChange={frostingPicker}>
          <option disabled value="placeholder" >Choose a frosting flavor</option>
          {flavors.map(f => <option key={uuid4()} value={f}>{f}</option>)}
        </select>
        {frostingFlavor === 'Other' && <input type="text" 
                         name="writeInFrostingFlavor" 
                         placeholder="Please type another option here" 
                         className="input input-bordered input-sm input-info w-full max-w-xs"
                         defaultValue={existingInfo.cakeDetails?.writeInFrostingFlavor ? existingInfo.cakeDetails.writeInFrostingFlavor : ''}/>}
      </div>
      <div>
        <label className="font-semibold mb-6">Filling Type</label>
        <div className="mb-2 flex items-center"> 
          <input type="radio" 
                 name="fillingType"
                 className="radio radio-secondary" 
                 value="Ganache"
                 id="ganache" 
                 onChange={(e)=>handleOther(e)}
                 defaultChecked={existingInfo.cakeDetails?.fillingType === 'Ganache'}/>
          <label className="ml-6" htmlFor="ganache">Ganache</label>
        </div>
        <div className="mb-2 flex items-center">
          <input type="radio" 
                name="fillingType" 
                className="radio radio-secondary" 
                value="Curd"
                id="cured" 
                onChange={(e)=>handleOther(e)}
                defaultChecked={existingInfo.cakeDetails?.fillingType === 'Curd'}/>
          <label className="ml-6" htmlFor="curd">Curd</label>
        </div>
        <div className="mb-2 flex items-center">
          <input type="radio" 
                 name="fillingType" 
                 className="radio radio-secondary" 
                 value="Jam"
                 id="jam" 
                 onChange={(e)=>handleOther(e)}
                 defaultChecked={existingInfo.cakeDetails?.fillingType === 'Jam'}/>
          <label className="ml-6" htmlFor="jam">Jam</label>
        </div>
        <div className="mb-2 flex items-center">
          <input type="radio" 
                 name="fillingType" 
                 className="radio radio-secondary" 
                 value="Cream Cheese"
                 id="creamCheese" 
                 onChange={(e)=>handleOther(e)}
                 defaultChecked={existingInfo.cakeDetails?.fillingType === 'Cream Cheese'}/>
          <label className="ml-6" htmlFor="creamCheese">Cream Cheese</label>
        </div>
        <div className="mb-2 flex items-center">
          <input type="radio" 
                 name="fillingType" 
                 className="radio radio-secondary" 
                 value="Fresh Fruit"
                 id="freshFruit" 
                 onChange={(e)=>handleOther(e)}
                 defaultChecked={existingInfo.cakeDetails?.fillingType === 'Fresh Fruit'}/>
          <label className="ml-6" htmlFor="freshFruit">Fresh Fruit</label>
        </div>
        <div className="mb-2 flex items-center">
          <input type="radio" 
                 name="fillingType" 
                 className="radio radio-secondary" 
                 value="other"
                 id="otherRadio" 
                 onChange={(e)=>handleOther(e)} 
                 defaultChecked={existingInfo.cakeDetails?.fillingType === 'other'}/>
          <label className="ml-6" htmlFor="otherRadio">Other</label>
        </div>
        {other && <input type="text" 
                         name="other" 
                         placeholder="Please type another option here" 
                         className="input input-bordered input-sm input-info w-full max-w-xs"
                         defaultValue={existingInfo.cakeDetails?.fillingType === 'other' ? existingInfo.cakeDetails.other : ''}/>}
      </div>
      <div>
        <label className="font-semibold">What flavor filling?</label>
        <p className="text-sm font-thin">Fruit, chocolate, matcha, etc</p>
        <input type="text" 
               placeholder="Type here" 
               className="input input-bordered input-accent w-full max-w-xs" 
               name="fillingFlavor"
               defaultValue={existingInfo.cakeDetails?.fillingFlavor ?? ''}/>
      </div>
      <div>
          <label className="font-semibold">Extras:</label>
          <div className="display flex w-5/6">
            <input type="checkbox" 
                   className="checkbox checkbox-secondary" 
                   name="glitterCherries"
                   id="glCherries" 
                   defaultChecked={existingInfo.cakeDetails?.extras?.glitterCherries === true}
                   onClick={(e)=>extraHandler(e)}/>
            <label className="ml-6" htmlFor="glCherries">Glitter cherries +$5</label>
          </div>
          <div className="display flex w-5/6">
            <input type="checkbox" 
                   className="checkbox checkbox-secondary" 
                   name="discoBalls"
                   id="dBalls"
                   defaultChecked={existingInfo.cakeDetails?.extras?.discoBalls === true}
                   onClick={(e)=>extraHandler(e)}/>
            <label className="ml-6" htmlFor="dBalls">Disco balls +$10</label>
          </div>
          <div className="display flex w-5/6">
            <input type="checkbox" 
                   className="checkbox checkbox-secondary" 
                   name="bows"
                   id="xBows"
                   defaultChecked={existingInfo.cakeDetails?.extras?.bows === true}
                   onClick={(e)=>extraHandler(e)}/>
            <label className="ml-6" htmlFor="xBows">Keepsake bows +$2 each</label>
          </div>
          <div className="display flex w-5/6">
            <input type="checkbox" 
                   className="checkbox checkbox-secondary" 
                   name="freshFruit"
                   id="frFruit"
                   defaultChecked={existingInfo.cakeDetails?.extras?.freshFruit === true}
                   onClick={(e)=>extraHandler(e)}/>
            <label className="ml-6" htmlFor="frFruit">Fresh fruit +Market Price</label>
          </div>
      </div>
      <div className="flex justify-between">
        <button type="button" className="formBtn btn-warn relative right-[16px]" onClick={prev}>Previous</button>
        <button type="submit" className="formBtn btn-primary mr-[16px]">Next</button>
      </div>
    </form>
  )
}