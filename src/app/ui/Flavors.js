'use client';

import uuid4 from "uuid4"
import { useState } from "react";

export default function Flavors({dispatch, warnings, existingInfo}){

  const flavors = ['Chocolate', 'Vanilla', 'Strawberry', 'Ube', 'Pandan', 'Fig', 'Black Sesame', 'Rosemary', 'Brown Butter', 'Espresso', 'Red Velvet', 
  'Hummingbird', 'Matcha', 'Lemon', 'Lime', 'Orange', 'Yuzu', 'Lavender', 'Earl Grey', 'Coconut', 'Carrot', 'Golden Milk', 'Mixed Berry', 'Tamarind', 
  'Banana', 'Mountain Dew', 'Cornmeal', 'Honey', 'Chai', 'Peach', 'Lychee']

  const [other, setOther] = useState(false)
  function handleOther(e){
    setOther(()=>{
      return e.target.value === 'other' ? true : false;
    })
    console.log(other)
  }

  function next(formData){
    console.log(formData)
    console.log(formData.get('frostingType'))
    const cakeFlavor = formData.get('cakeFlavor');
    const frostingType = formData.get('frostingType');
    const frostingFlavor = formData.get('frostingFlavor');
    const fillingType = formData.get('fillingType');
    const other = formData.get('other');
    const fillingFlavor = formData.get('fillingFlavor');
    const extras = {
      glitterCherries: formData.get('glitterCherries'),
      discoBalls: formData.get('discoBalls'),
      treeTrunk: formData.get('treeTrunk'),
      bows: formData.get('bows'),
      freshFruit: formData.get('freshFruit')
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
    <form className="overflow-auto overscroll-contain" action={next}>
      <div className="mb-6">
        <label htmlFor="cakeFlavor" className="ml-3 mb-2">What flavor cake?</label>
        <select className="select select-bordered w-full max-w-xs" name="cakeFlavor" defaultValue={'placeholder'} >
          <option disabled value={'placeholder'}>Choose a cake flavor</option>
          {flavors.map(f => <option key={uuid4()} value={f}>{f}</option>)}
        </select>
        <p className="text-sm ml-3">Some are combinable upon request</p>
      </div>
      <div className="mb-6">
        <label className="ml-3 mb-2">Frosting type:</label>
        <div className="mb-2 flex items-center">
          <input type="radio" name="frostingType" className="radio radio-secondary" id={"smb"}value={"Swiss Meringue Buttercream"}/>
          <label htmlFor="smb" className="ml-6">Swiss Meringue Buttercream</label>
        </div>
        <div className="mb-2 flex items-center">
          <input type="radio" name="frostingType" className="radio radio-secondary" id={"ab"} value={"American Buttercream"}/>
          <label htmlFor="ab" className="ml-6">American Buttercream</label>
        </div>
        <div className="mb-2 flex items-center">
          <input type="radio" name="frostingType" className="radio radio-secondary" id={"cc"}value={"Cream Cheese"}/>
          <label htmlFor="cc" className="ml-6">Cream Cheese (not available for heavily piped cakes)</label>
        </div>
      </div>
      <div className="mb-6">
        <label className="ml-3 mb-2">What flavor frosting?</label>
        <select className="select select-bordered w-full max-w-xs" name="frostingFlavor" defaultValue={'placeholder'}>
          <option disabled value="placeholder" >Choose a frosting flavor</option>
          {flavors.map(f => <option key={uuid4()} value={f}>{f}</option>)}
        </select>
      </div>
      <div className="mb-6">
        <label>Filling Type</label>
        <div className="mb-2 flex items-center"> 
          <input type="radio" name="fillingType" className="radio radio-secondary" value="Ganache" onChange={(e)=>handleOther(e)}/>
          <label className="ml-6">Ganache</label>
        </div>
        <div className="mb-2 flex items-center">
          <input type="radio" name="fillingType" className="radio radio-secondary" value="Curd" onChange={(e)=>handleOther(e)}/>
          <label className="ml-6">Curd</label>
        </div>
        <div className="mb-2 flex items-center">
          <input type="radio" name="fillingType" className="radio radio-secondary" value="Jame" onChange={(e)=>handleOther(e)}/>
          <label className="ml-6">Jam</label>
        </div>
        <div className="mb-2 flex items-center">
          <input type="radio" name="fillingType" className="radio radio-secondary" value="Cream Cheese" onChange={(e)=>handleOther(e)}/>
          <label className="ml-6">Cream Cheese</label>
        </div>
        <div className="mb-2 flex items-center">
          <input type="radio" name="fillingType" className="radio radio-secondary" value="Fresh Fruit" onChange={(e)=>handleOther(e)}/>
          <label className="ml-6">Fresh Fruit</label>
        </div>
        <div className="mb-2 flex items-center">
          <input type="radio" name="fillingType" className="radio radio-secondary" value="other" onChange={(e)=>handleOther(e)} />
          <label className="ml-6">Other</label>
        </div>
        {other && <input type="text" name="other" placeholder="Please type another option here" className="input input-bordered input-sm input-info w-full max-w-xs"></input>}
      </div>
      <div className="my-6">
        <label>What flavor filling?</label>
        <input type="text" placeholder="Type here" className="input input-bordered input-accent w-full max-w-xs" name="fillingFlavor"/>
      </div>
      <div className="mb-6">
          <label>Extras</label>
          <div className="display flex w-5/6">
            <input type="checkbox" className="checkbox checkbox-secondary" name="glitterCherries" />
            <label className="ml-6">Glitter cherries +$5</label>
          </div>
          <div className="display flex w-5/6">
            <input type="checkbox" className="checkbox checkbox-secondary" name="discoBalls"/>
            <label className="ml-6">Disco balls +$10</label>
          </div>
          <div className="display flex w-5/6">
            <input type="checkbox" className="checkbox checkbox-secondary" name="treeTrunk"/>
            <label className="ml-6">Tree Trunk Style +$20</label>
          </div>
          <div className="display flex w-5/6">
            <input type="checkbox" className="checkbox checkbox-secondary" name="bows"/>
            <label className="ml-6">Keepsake bows +$2 each</label>
          </div>
          <div className="display flex w-5/6">
            <input type="checkbox" className="checkbox checkbox-secondary" name="freshFruit"/>
            <label className="ml-6">Fresh fruit +Market Price</label>
          </div>
      </div>
      <button type="button" className="btn btn-warn" onClick={prev}>Previous</button>
      <button type="submit" className="btn btn-primary">Next</button>
    </form>
  )
}