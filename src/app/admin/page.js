import { login } from "@/lib/actions";
import Image from "next/image";

export default function Page() {

  return (
    <div className="card w-96 bg-neutral text-neutral-content flex flex-col justify-center self-center p-8" style={{backgroundImage: 'url(/jf-rip.png)', backgroundRepeat: 'repeat-y', backgroundSize: '300px 300px'}}>
      <div className="card-body items-center text-center">
        <form action={login} className="flex gap-8">
          <input type="password" placeholder="" className="input w-full max-w-xs bg-primary" name="pwd" />
          
          <button className="btn w-1/4 btn-outline"><Image src={"/loginMinimal.svg"} height={70} width={70} alt="login" id="confirmed"/></button>
        </form>
      </div>
    </div>
  )
}