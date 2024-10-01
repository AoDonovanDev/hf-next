'use client';

import Image from "next/image"
import { useState } from "react";

export default function Policies({dispatch, warnings}){

  const [viewWidth, setViewWidth] = useState(visualViewport.width);

  function submit(formData){
    const agree = formData.get('agree')
    if(agree !== 'yes'){
      dispatch({type: 'warn', payload:{agree: 'You have to agree.'}})
    } else {
      dispatch({type: 'submit', payload:{agree}})
    }
  }

  function prev(){
    dispatch({type: 'prev'})
  }

  visualViewport.addEventListener('resize', () => {
    setViewWidth(visualViewport.width);
  })

  const center = Math.floor(viewWidth/3);
  console.log(viewWidth);

  return (
    <form className="overflow-auto overscroll-contain flex flex-col pb-6" action={submit}>
      {viewWidth > 500 ? <Image src={"/hf2.png"} height={800} width={600} alt="fly guy" className={`z-8 absolute p-0 m-0 opacity-15`} style={{left: viewWidth > 1500 ? center : center-100}}/> :
      <Image src={'/policyCake.jpeg'} height={800} width={800} alt="policy cake" className="w-full self-center mb-6 rounded md:h-[440px] md:w-[440px]"/>}
      <div className="bg-pink-200 m-[8px] display flex flex-col p-4 rounded">
        <h1 className="text-xl font-medium self-center">Policies</h1>
        <p>2 weeks notice required for all cakes. Any order placed with shorter notice may be subject to a rush fee.<br/><br/>
          All prices listed are the base price for your chosen size. A quote will be sent to you within 7 days of submitting the order request.<br/><br/>
          A 50% deposit is required within 7 days of order confirmation. Spots are very limited. If the deposit is not received within this time period, your order is subject to
          rescheduling or cancellation. Deposits are only available through Venmo. No Cashapp or PayPal. <br/><br/>
          All cakes, fillings and icings may contain, or come into contact with, soy, wheat, dairy, nuts or other allergens.<br/><br/>
          It is your responsibility to inform me prior to the confirmation of the booking of any allergy issues. It is your responsibility to inform your guests of all allergy information and because of
          this Housefly Victuals will not be held liable for any allergic reaction resulting from consumption of the cake.<br/><br/>
          Final payment is available in exact change on pick up or Venmo. Payment must be made before the cake leaves the premises.<br/><br/>
          If the booking is cancelled due to illness or any other unforeseen circumstance that affects the ability to complete the order, the deposit will be refunded within 7 days after notification of cancellation.
          Pick up only. Delivery unavailable at this time.  <br/><br/>
          </p>
          <div className="flex">
          {warnings && <h1 className="text-red-400">{warnings.agree}</h1>}
          <input type="radio" name="agree" className="radio radio-primary" value={'yes'} id="agree"/>
          <label htmlFor="agree" className="italic ml-[12px] cursor-pointer">I agree to all of the above</label>
          </div>
      </div>
      <div className="flex justify-between">
        <button type="button" className="formBtn btn-warn z-0" onClick={prev}>Previous</button>
        <button type="submit" className="formBtn btn-primary mr-[16px] z-0">Submit</button>
      </div>
    </form>
  )
}