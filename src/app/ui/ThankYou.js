'use client';

import { useRouter } from "next/navigation";

export default function ThankYou(){

  const { replace } = useRouter()

  function retvrn(){
    replace('/')
  }

  return (
      <div className="hero h-full w-full md:h-full md:w-1/2 aspect-auto" style={{backgroundImage: 'url(/jf-rip.png)'}} >
        <div className="hero-overlay bg-opacity-20"></div>
        <div className="hero-content text-center text-neutral-content">
          <div className="max-w-md">
            <h1 className="font-bold">Thank you for your order!</h1>
            <p className="py-6 font-medium">You will receive order updates by email!</p>
            <button className="btn btn-primary" onClick={()=>retvrn()}>Home</button>
          </div>
        </div>
      </div>
  )
}