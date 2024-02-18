'use client';

import uuid4 from "uuid4"
import { useState } from "react";

export default function Flavors({dispatch, warnings, existingInfo}){

  const flavors = ['Chocolate', 'Vanilla', 'Strawberry', 'Ube', 'Pandan', 'Fig', 'Black Sesame', 'Rosemary', 'Brown Butter', 'Espresso', 'Red Velvet', 
  'Hummingbird', 'Matcha', 'Lemon', 'Lime', 'Orange', 'Yuzu', 'Lavender', 'Earl Grey', 'Coconut', 'Carrot', 'Golden Milk', 'Mixed Berry', 'Tamarind', 
  'Banana', 'Mountain Dew', 'Cornmeal', 'Honey', 'Chai', 'Peach', 'Lychee']

  const [other, setOther] = useState(existingInfo.cakeDetails?.fillingType === 'other' ? true : false)
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
    const extras = {
      glitterCherries: formData.get('glitterCherries') === "on" ? true : false,
      discoBalls: formData.get('discoBalls') === "on" ? true : false,
      treeTrunk: formData.get('treeTrunk') === "on" ? true : false,
      bows: formData.get('bows') === "on" ? true : false,
      freshFruit: formData.get('freshFruit') === "on" ? true : false
    }
    const cakeDetails = {
      cakeFlavor,
      frostingType,
      frostingFlavor,
      fillingType,
      other,
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
    <form className="overflow-auto overscroll-contain lg:grid lg:grid-cols-2 ml-6 flex flex-col gap-6" action={next}>
      <div>
        <p className="text-red-400">{warnings.cakeFlavor}</p>
        <label htmlFor="cakeFlavor" className="font-semibold">What flavor cake?</label>
        <select className="select select-bordered w-full max-w-xs" 
                name="cakeFlavor" 
                defaultValue={existingInfo.cakeDetails?.cakeFlavor ? existingInfo.cakeDetails.cakeFlavor : 'placeholder'} >
          <option disabled value={'placeholder'}>Choose a cake flavor</option>
          {flavors.map(f => <option key={uuid4()} value={f}>{f}</option>)}
        </select>
        <p className="text-sm ml-3 font-thin">Some are combinable upon request</p>
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
                defaultValue={existingInfo.cakeDetails?.cakeFlavor ? existingInfo.cakeDetails.frostingFlavor : 'placeholder'}>
          <option disabled value="placeholder" >Choose a frosting flavor</option>
          {flavors.map(f => <option key={uuid4()} value={f}>{f}</option>)}
        </select>
      </div>
      <div>
        <label className="font-semibold mb-6">Filling Type</label>
        <div className="mb-2 flex items-center"> 
          <input type="radio" 
                 name="fillingType"
                 className="radio radio-secondary" 
                 value="Ganache" 
                 onChange={(e)=>handleOther(e)}
                 defaultChecked={existingInfo.cakeDetails?.fillingType === 'Ganache'}/>
          <label className="ml-6">Ganache</label>
        </div>
        <div className="mb-2 flex items-center">
          <input type="radio" 
                name="fillingType" 
                className="radio radio-secondary" 
                value="Curd" 
                onChange={(e)=>handleOther(e)}
                defaultChecked={existingInfo.cakeDetails?.fillingType === 'Curd'}/>
          <label className="ml-6">Curd</label>
        </div>
        <div className="mb-2 flex items-center">
          <input type="radio" 
                 name="fillingType" 
                 className="radio radio-secondary" 
                 value="Jam" 
                 onChange={(e)=>handleOther(e)}
                 defaultChecked={existingInfo.cakeDetails?.fillingType === 'Jam'}/>
          <label className="ml-6">Jam</label>
        </div>
        <div className="mb-2 flex items-center">
          <input type="radio" 
                 name="fillingType" 
                 className="radio radio-secondary" 
                 value="Cream Cheese" 
                 onChange={(e)=>handleOther(e)}
                 defaultChecked={existingInfo.cakeDetails?.fillingType === 'Cream Cheese'}/>
          <label className="ml-6">Cream Cheese</label>
        </div>
        <div className="mb-2 flex items-center">
          <input type="radio" 
                 name="fillingType" 
                 className="radio radio-secondary" 
                 value="Fresh Fruit" 
                 onChange={(e)=>handleOther(e)}
                 defaultChecked={existingInfo.cakeDetails?.fillingType === 'Fresh Fruit'}/>
          <label className="ml-6">Fresh Fruit</label>
        </div>
        <div className="mb-2 flex items-center">
          <input type="radio" 
                 name="fillingType" 
                 className="radio radio-secondary" 
                 value="other" 
                 onChange={(e)=>handleOther(e)} 
                 defaultChecked={existingInfo.cakeDetails?.fillingType === 'other'}/>
          <label className="ml-6">Other</label>
        </div>
        {other && <input type="text" 
                         name="other" 
                         placeholder="Please type another option here" 
                         className="input input-bordered input-sm input-info w-full max-w-xs"
                         defaultValue={existingInfo.cakeDetails?.fillingType === 'other' ? existingInfo.cakeDetails.other : ''}/>}
      </div>
      <div>
        <label className="font-semibold">What flavor filling?</label>
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
                   defaultChecked={existingInfo.cakeDetails?.extras?.glitterCherries === true}
                   onClick={(e)=>extraHandler(e)}/>
            <label className="ml-6">Glitter cherries +$5</label>
          </div>
          <div className="display flex w-5/6">
            <input type="checkbox" 
                   className="checkbox checkbox-secondary" 
                   name="discoBalls"
                   defaultChecked={existingInfo.cakeDetails?.extras?.discoBalls === true}
                   onClick={(e)=>extraHandler(e)}/>
            <label className="ml-6">Disco balls +$10</label>
          </div>
          <div className="display flex w-5/6">
            <input type="checkbox" 
                   className="checkbox checkbox-secondary" 
                   name="treeTrunk" 
                   defaultChecked={existingInfo.cakeDetails?.extras?.treeTrunk === true}
                   onClick={(e)=>extraHandler(e)}/>
            <label className="ml-6">Tree Trunk Style +$20</label>
          </div>
          <div className="display flex w-5/6">
            <input type="checkbox" 
                   className="checkbox checkbox-secondary" 
                   name="bows"
                   defaultChecked={existingInfo.cakeDetails?.extras?.bows === true}
                   onClick={(e)=>extraHandler(e)}/>
            <label className="ml-6">Keepsake bows +$2 each</label>
          </div>
          <div className="display flex w-5/6">
            <input type="checkbox" 
                   className="checkbox checkbox-secondary" 
                   name="freshFruit"
                   defaultChecked={existingInfo.cakeDetails?.extras?.freshFruit === true}
                   onClick={(e)=>extraHandler(e)}/>
            <label className="ml-6">Fresh fruit +Market Price</label>
          </div>
      </div>
      <div className="flex justify-between">
        <button type="button" className="btn btn-warn" onClick={prev}>Previous</button>
        <button type="submit" className="btn btn-primary">Next</button>
      </div>
    </form>
  )
}