import Link from "next/link"

export default function FAQ(){
  return (
    <div style={{zIndex: 0}} className="flex flex-col">
      <div className="flex flex-col mx-[24px] my-[16px]">
        <div className="card bg-base-100 w-96 shadow-xl px-[12px] py-[8px]">
          <p>For any questions not answered here, drop me a line at <Link href={"mailto:houseflyvictuals@gmail.com"}>houseflyvictuals@gmail.com</Link></p>
        </div>
      </div>
    <div className="collapse collapse-plus bg-base-200 mb-[12px] shadow-md">
      <input type="radio" name="my-accordion-3" defaultChecked /> 
      <div className="collapse-title text-xl font-medium">
        How soon should I order my cake?
      </div>
      <div className="collapse-content"> 
        <p>Two weeks notice is required but I typically fill up at least a month in advance.</p>
      </div>
    </div>
    <div className="collapse collapse-plus bg-base-200 mb-[20px] shadow-md">
      <input type="radio" name="my-accordion-3" /> 
      <div className="collapse-title text-xl font-medium">
        Can I order a cake for next year?
      </div>
      <div className="collapse-content"> 
        <p>No, I book three months at a time.</p>
      </div>
    </div>
    <div className="collapse collapse-plus bg-base-200 mb-[20px] shadow-md">
      <input type="radio" name="my-accordion-3" /> 
      <div className="collapse-title text-xl font-medium">
        Do you have vegan and gluten free options?
      </div>
      <div className="collapse-content"> 
        <p>Yes! Just use the allergies/preferences box to explain.  I&apos;ll send you a follow up email to talk about some options.</p>
      </div>
    </div>
    <div className="collapse collapse-plus bg-base-200 shadow-md">
      <input type="radio" name="my-accordion-3" /> 
      <div className="collapse-title text-xl font-medium">
        Can you copy this picture exactly?
      </div>
      <div className="collapse-content"> 
        <p>No, every cake is a unique creation.</p>
      </div>
    </div>
  </div>
  )
}