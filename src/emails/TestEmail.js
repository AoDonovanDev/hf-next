export default function TestEmail( { firstName, img } ) {
  return (
    <div className="EmailBody">
      <h1>this is a test email</h1>
      <a href={img}>here is a reference image for the order</a>
      <h1>hello {firstName}!</h1>
      {img && <img src={img} alt="test img"></img>}
    </div>
  )
}