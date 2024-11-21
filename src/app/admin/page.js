'use client';

import { login } from "@/lib/actions";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useFormStatus } from "react-dom";

export default function Page() {

  const [password, setPassword] = useState("");

  useEffect(() => {
    const pwd = localStorage.getItem("password");
    if(pwd){
      setPassword(pwd);
    }
  }, []);

  function savePwd(pwd){
    localStorage.setItem("password", pwd);
  }

  function handleChange(pwd) {
    setPassword(pwd);
  }

  function LoginBtn(){
    const { pending } = useFormStatus();
    return <button className="btn w-1/4 btn-outline" 
            disabled={pending}
            onClick={()=>savePwd(password)}> {pending? <span className="loading loading-spinner text-primary"></span> : <Image src={"/loginMinimal.svg"} height={70} width={70} alt="login" id="confirmed"/>}
    </button>
  }

  return (
    <div className="card w-96 bg-neutral text-neutral-content flex flex-col justify-center self-center p-8" style={{backgroundImage: 'url(/jf-rip.png)', backgroundRepeat: 'repeat-y', backgroundSize: '300px 300px'}}>
      <div className="card-body items-center text-center">
        <form action={login} className="flex gap-8">
          <input type="password" placeholder="" className="input w-full max-w-xs bg-primary" name="pwd" value={password} onChange={(e)=>handleChange(e.target.value)} />
          <LoginBtn />
        </form>
      </div>
    </div>
  )
}