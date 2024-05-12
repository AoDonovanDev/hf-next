export default function Preferences({dispatch, warnings, existingInfo}){
  console.log(existingInfo.trust, existingInfo)

  function next(formData){
    console.log('form submit', formData.get('preferences'))
    const preferences = formData.get('preferences')
    dispatch({type: 'next', payload: { preferences }})
  }

  function prev(){
    dispatch({type: 'prev'})
  }

  return(
    <form className="overflow-auto overscroll-contain h-full pt-6" action={next}>
      <div className="w-5/6 ml-6 mb-6">{existingInfo.cakeType === 'trust' ? 
      <div><b>You&apos;ve selected a Trust Cake! Yippee!</b><br /> <br />List your allergies and preferences below. You can also specify <i>Full Trust</i> or <i>Partial Trust</i>
      <br/><br/>
      <i>Full trust = HFV picks flavor <b>and</b> decoration</i><br/>
      <i>Partial Trust = HFV picks flavor <b>or</b> decoration</i><br/><br/>
      On the next page, you&apos;ll also have the option to attach a photo reference.</div> : <div><b>You&apos;ve chosen custom!</b> <br/><br/> What style of cake would you like? Describe what cake design you want below. After you pick your flavors, you&apos;ll also have the option to attach a photo reference.</div>}
      </div>
      <textarea className="textarea textarea-secondary textarea-large w-5/6 h-1/2 md:h-5/6 ml-6 mb-6" placeholder="Allergies and preferences" name="preferences" defaultValue={existingInfo.preferences}></textarea>
      <div className="flex justify-between">
        <button type="button" className="formBtn btn-warn" onClick={prev}>Previous</button>
        <button type="submit" className="formBtn btn-primary">Next</button>
      </div>
    </form>
  )
}