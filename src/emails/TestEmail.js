export default function TestEmail( { firstName } ) {
  return (
    <div className="EmailBody">
      <h1>this is a test email</h1>
      <p>Hello {firstName}!</p>
    </div>
  )
}