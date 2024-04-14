import Link from "next/link"

export default function FAQ(){
  return (
    <div style={{zIndex: 0}}>
    <p>For any questions not answered here, drop me a line at <Link href={"mailto:houseflyvictuals@gmail.com"}>houseflyvictuals@gmail.com</Link></p>
    <div className="collapse collapse-plus bg-base-200">
      <input type="radio" name="my-accordion-3" defaultChecked /> 
      <div className="collapse-title text-xl font-medium">
        How soon should I order my cake?
      </div>
      <div className="collapse-content"> 
        <p>Two weeks notice is required but I typically fill up at least a month in advance.</p>
      </div>
    </div>
    <div className="collapse collapse-plus bg-base-200">
      <input type="radio" name="my-accordion-3" /> 
      <div className="collapse-title text-xl font-medium">
        Can I order a cake for next year?
      </div>
      <div className="collapse-content"> 
        <p>No, I book three months at a time.</p>
      </div>
    </div>
    <div className="collapse collapse-plus bg-base-200">
      <input type="radio" name="my-accordion-3" /> 
      <div className="collapse-title text-xl font-medium">
        Do you have vegan and gluten free options?
      </div>
      <div className="collapse-content"> 
        <p>Yes! Just use the allergies/preferences box to explain.  I&apos;ll send you a follow up email to talk about some options.</p>
      </div>
    </div>
    <div className="collapse collapse-plus bg-base-200">
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