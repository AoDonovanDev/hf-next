import Link from "next/link"

export default function FAQ(){
  return (
    <div style={ {
      zIndex: 0,
      backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='80' height='80' viewBox='0 0 80 80'%3E%3Cg fill='%2377b8da' fill-opacity='0.27'%3E%3Cpath fill-rule='evenodd' d='M0 0h40v40H0V0zm40 40h40v40H40V40zm0-40h2l-2 2V0zm0 4l4-4h2l-6 6V4zm0 4l8-8h2L40 10V8zm0 4L52 0h2L40 14v-2zm0 4L56 0h2L40 18v-2zm0 4L60 0h2L40 22v-2zm0 4L64 0h2L40 26v-2zm0 4L68 0h2L40 30v-2zm0 4L72 0h2L40 34v-2zm0 4L76 0h2L40 38v-2zm0 4L80 0v2L42 40h-2zm4 0L80 4v2L46 40h-2zm4 0L80 8v2L50 40h-2zm4 0l28-28v2L54 40h-2zm4 0l24-24v2L58 40h-2zm4 0l20-20v2L62 40h-2zm4 0l16-16v2L66 40h-2zm4 0l12-12v2L70 40h-2zm4 0l8-8v2l-6 6h-2zm4 0l4-4v2l-2 2h-2z'/%3E%3C/g%3E%3C/svg%3E")`,
      backgroundColor: `#f9f1fe`
      }
    } 
    className="flex flex-col h-full">
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
        <p>Currently I am only booking two months out at a time.</p>
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