import { getConfirmedOrdersWithCustomerInfo } from "@/lib/queries"
import uuid4 from "uuid4";

export default async function Page(){

  const confirmedOrdersWithCustomerInfo = await getConfirmedOrdersWithCustomerInfo();
  const sorted = confirmedOrdersWithCustomerInfo.sort( (a,b) => new Date(a.pickup_date) - new Date(b.pickup_date) );
  
  return (

    <div className="overflow-x-auto overscroll-contain">
    <table className="table table-zebra">
      {/* head */}
      <thead>
        <tr>
          <th>Pickup Date</th>
          <th>Pickup Time</th>
          <th>Name</th>
          <th>Phone Number</th>
          <th>Email</th>
        </tr>
      </thead>
      <tbody>
        {/* row 1 */}
        {sorted.map(order => <tr key={uuid4()}>
          <td>{order.pickup_date.slice(0,10)}</td>
          <td>{order.pickup_time}</td>
          <td>{order.first_name} {order.last_name}</td>
          <td>{order.phone_number}</td>
          <td>{order.email}</td>
        </tr>)}
      </tbody>
    </table>
    </div>
  )
}