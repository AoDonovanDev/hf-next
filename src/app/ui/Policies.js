import Image from "next/image"

export default function Policies({dispatch, warnings}){

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


  return (
    <form className="overflow-auto overscroll-contain flex flex-col pb-6" action={submit}>
      <Image src={'/policyCake.jpeg'} height={200} width={200} alt="policy cake" className="w-full self-center mb-6 rounded"/>
      <div className="bg-pink-200 m-[8px] display flex flex-col p-4 rounded">
        <h1 className="text-xl font-medium self-center">Policies</h1>
        <p>2 weeks notice required for all cakes. Any order placed with shorter notice may be subject to a rush fee.<br/><br/>
          All prices listed are the base price for your chosen size. A quote will be sent to you within 7 days of submitting the order request.<br/><br/>
          A 50% deposit is required within 7 days of order confirmation. Spots are very limited. If the deposit is not received within this time period, your order is subject to
          rescheduling or cancellation. Deposits are only available through Venmo. No Cashapp or PayPal. <br/><br/>
          All cakes, fillings and icings may contain, or come into contact with, soy, wheat, dairy, nuts or other allergens.<br/><br/>
          It is your responsibility to inform me prior to the confirmation of the booking of any allergy issues. It is your responsibility to inform your guests of all allergy information and because of
          this Housefly Victuals will not be held liable for any allergic reaction resulting from consumption of the cake.
          Final payment is available in exact change on pick up or Venmo. Payment must be made before the cake leaves the premises.<br/><br/>
          If the booking is cancelled due to illness or any other unforeseen circumstance that affects the ability to complete the order, the deposit will be refunded within 7 days after notification of cancellation.
          Pick up only. Delivery unavailable at this time.  <br/><br/>
          I agree to all of the above</p>
          {warnings && <h1 className="text-red-400">{warnings.agree}</h1>}
          <input type="radio" name="agree" className="radio" value={'yes'} />
      </div>
      <div className="flex justify-between">
        <button type="button" className="formBtn btn-warn" onClick={prev}>Previous</button>
        <button type="submit" className="formBtn btn-primary">Submit</button>
      </div>
    </form>
  )
}