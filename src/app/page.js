import Image from "next/image";

export default async function Page() {
  return (
    <div>
      <Image src={"/fgs.png"} height={800} width={600} alt="fly guy" className={"z-0 absolute h-max w-max top-36 lg:left-1/3"}/>
    </div>
  )
}
