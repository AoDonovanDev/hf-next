export default function OrderReceived({ formData }){
  return (
 <div className="hero min-h-screen bg-base-200">
    <div className="hero-content text-center">
      <div className="max-w-md">
        <h1 className="text-5xl font-bold">Thanks {formData.contactInfo.firstName}! Your order has been received!</h1>
        <p className="py-6">Thank you for choosing Housefly Victuals. You will receive an order confirmation and invoice in the next 2 to 3 business days.</p>
      </div>
    </div>
  </div>
  )
}