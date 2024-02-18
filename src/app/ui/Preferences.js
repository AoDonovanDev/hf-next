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
    <form className="w-5/6" action={next}>
      <div className="w-5/6 mb-6">{existingInfo.cakeType === 'trust' ? <div>You&apos;ve selected a Trust Cake!<br />List your allergies and preferences below:</div>: "You've chosen custom! What style of cake would you like? Describe what cake design you want below or attach a photo reference:"}</div>
      <textarea className="textarea textarea-secondary textarea-large w-full h-1/2 md:h-5/6" placeholder="Allergies and preferences" name="preferences" defaultValue={existingInfo.preferences}></textarea>
      <div className="flex justify-between">
        <button type="button" className="btn btn-warn" onClick={prev}>Previous</button>
        <button type="submit" className="btn btn-primary">Next</button>
      </div>
    </form>
  )
}