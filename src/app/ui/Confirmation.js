'use client';

import { useRouter } from "next/navigation";
import { confirmOrder } from "@/lib/actions";
import { useFormState } from 'react-dom';

export default function Confirmation ( { order } ) {
  const { replace } = useRouter();
  function cancel(){
    replace('/dashboard/new')
  }

  function SendButton(){
    const { pending } = useFormState();
    return <button type="submit" className="formBtn btn-success" disabled={pending}>{pending ? <span className="loading loading-spinner text-primary"></span> : 'Send'}</button>;
  }

  const capitalizedFirstName = order.first_name.split('').map((c, i) => i == 0 ? c.toUpperCase() : c).join('');

  return(
    <form className="flex flex-col justify-center w-full" action={confirmOrder}>
      <textarea placeholder="write something here beb"
                className="textarea textarea-bordered textarea-lg w-full h-96 max-w-xs flex self-center mx-0 my-6 text-sm overflow-auto overscroll-contain"
                name="emailBody"
                defaultValue={`Hey ${capitalizedFirstName}!
                
                
I take a 50% deposit within the week of order confirmation and the rest on pick up.The deposit can be made via Venmo to houseflyvictuals and the last half can be through Venmo or in cash on pick up. Please put a fun emoji as the tagline for your payment. The pick up address is 101 W Locust St and my phone number is 4233284070. Let me know if you have any questions!`}
      />
    <input defaultValue={order.order_id} name="orderId" hidden />
    <input defaultValue={order.email} name="customerEmail" hidden/>
    <div className="flex justify-between mx-8 my-8">
      <button type="button" className="formBtn btn-error" onClick={cancel}>Cancel</button>
      <SendButton />
    </div>
    </form>
  )
}