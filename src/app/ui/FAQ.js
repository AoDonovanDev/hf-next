export default function FAQ(){
  return (
    <div style={{zIndex: 0}}>
    <div className="collapse collapse-plus bg-base-200">
      <input type="radio" name="my-accordion-3" defaultChecked /> 
      <div className="collapse-title text-xl font-medium">
        Will you make me a drip cake?
      </div>
      <div className="collapse-content"> 
        <p>No. Fuck You.</p>
      </div>
    </div>
    <div className="collapse collapse-plus bg-base-200">
      <input type="radio" name="my-accordion-3" /> 
      <div className="collapse-title text-xl font-medium">
        Are the flowers edible?
      </div>
      <div className="collapse-content"> 
        <p>I try not to put anything poisonous on the cakes but you should probably google any plants that you eat!</p>
      </div>
    </div>
    <div className="collapse collapse-plus bg-base-200">
      <input type="radio" name="my-accordion-3" /> 
      <div className="collapse-title text-xl font-medium">
        Will you deliver my cake to Grundy?
      </div>
      <div className="collapse-content"> 
        <p>Sorry no</p>
      </div>
  </div>
  </div>
  )
}