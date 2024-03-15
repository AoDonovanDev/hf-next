"use client";

import Image from "next/image"
import { useRouter } from "next/navigation";
import { useParams } from "next/navigation";
import { logout } from "../../lib/actions";

export default function Layout({children}) {

  const { replace } = useRouter();
  const { status } = useParams();

  function switchView(e){
    replace(`/dashboard/${e.target.id}`)
  }

  return (
    <>
      <Image src={"/logout.svg"} height={80} width={80} alt="logout" className="btn absolute top-5 right-5" onClick={()=>logout()}/>
      {children}
      <div className="btm-nav">
        <button className={`bg-pink-200 text-pink-600 ${status === 'rejected' ? 'active' : ''}`}>
          <Image src={"/rejected2.svg"} height={40} width={40} id="rejected" alt="rejected" onClick={switchView}></Image>
        </button>
        <button className={`bg-blue-200 text-blue-600 border-blue-600 ${status === 'new' ? 'active' : ''}`}>
          <Image src={"/new.svg"} height={50} width={50} id="new" alt="new" onClick={switchView}></Image>
        </button>
        <button className={`bg-teal-200 text-teal-600 ${status === 'confirmed' ? 'active' : ''}`}>
          <Image src={"/pending.svg"} height={40} width={40} id="confirmed" alt="pending" onClick={switchView}></Image>
        </button>
    </div>
  </>
  )
}