"use client";

import Image from "next/image";
import { useState } from "react";
import { useParams } from "next/navigation";
import { updateOrderStatus } from "@/lib/actions";


export default function AdminDash( { allOrders }) {
  
  const [i, setI] = useState(0);
  const { status } = useParams();

  const orders = allOrders.filter(o => o.status === status);

  console.log(orders)
  console.log('status param in page component', status)

  function next(){
    setI(i+1);
  }

  function prev(){
    setI(i-1);
  }

  async function update(order_id, target, current){
    await updateOrderStatus(order_id, target, current);
    setI(0);
  }

  return (
     <div className="h-5/6 overflow-auto overscroll-contain">
       {orders.length && <>
        <div className="stats shadow w-full text-center m-0 flex divide-x-0">
          {i > 0 && <Image src={"/prevArrow2.svg"} height={60} width={60} alt="prevArrow" className="btn self-center" onClick={()=>prev()}/>}
          <div className="stat">
            <div className="stat-title">{orders[i].first_name} {orders[i].last_name}</div>
            <div className="stat-value">${orders[i].quote}</div>
            <div className="stat-desc">{orders[i].pickup_date.slice(0,10)}</div>
            <div className="stat-desc">{orders[i].pickup_time}</div>
          </div>
          {i < orders.length-1 && <Image src={"/nextArrow2.svg"} height={60} width={60} alt="prevArrow" className="btn self-center" onClick={()=>next()}/>}
        </div>
        <div className="overflow-x-auto">
          <div className="flex">
            <table className="table table-zebra">
              {/* head */}
              <thead>
                <tr>
                  <th></th>
                  <th></th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {/* row 1 */}
                <tr>
                  <th>Type</th>
                  <td>{orders[i].cake_type}</td>
                </tr>
                {/* row 2 */}
                <tr>
                  <th>Size</th>
                  <td>{orders[i].cake_size}</td>
                </tr>
                {/* row 3 */}
                <tr>
                  <th>Cake Flavor</th>
                  <td>{orders[i].cake_flavor === "other" ? orders[i].write_in_cake_flavor : orders[i].cake_flavor}</td>
                </tr>
                <tr>
                  <th>Filling Flavor</th>
                  <td>{orders[i].filling_flavor}</td>
                </tr>
              </tbody>
            </table>
            <table className="table table-zebra">
              {/* head */}
              <thead>
                <tr>
                  <th></th>
                  <th></th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {/* row 1 */}
                <tr>
                  <th>Frosting Flavor</th>
                  <td>{orders[i].frosting_flavor === "other" ? orders[i].write_in_frosting_flavor : orders[i].frosting_flavor}</td>
                </tr>
                {/* row 2 */}
                <tr>
                  <th>Frosting Type</th>
                  <td>{orders[i].frosting_type}</td>
                </tr>
                {/* row 3 */}
                <tr>
                  <th>Filling Type</th>
                  <td>{orders[i].filling_type === 'other' ? orders[i].other : orders[i].filling_type}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <table className="table table-zebra">
              {/* head */}
              <thead>
                <tr>
                  <th></th>
                  <th></th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {/* row 1 */}
                {orders[i].glitter_cherries ? <tr>
                  <th>Glitter Cherries</th>
                </tr> : <></>}
                {/* row 2 */}
                {orders[i].bows ? <tr>
                  <th>bows</th>
                </tr> : <></>}
                {/* row 3 */}
                {orders[i].disco_balls ? <tr>
                  <th>Disco Balls</th>
                </tr> : <></>}
                {orders[i].fresh_fruit ? <tr>
                  <th>Fresh Fruit</th>
                </tr> : <></>}
              </tbody>
            </table>
          <div className="chat chat-start ml-6">
            <div className="chat-bubble">{orders[i].preferences}</div>
          </div>
          {orders[i].reference_img && <Image src={orders[i].reference_img} height={200} width={200} alt="reference" />}
        </div>
       </>}
      <div className="flex flex-row justify-between mx-2 my-24 items-center">        
          <Image src={"/rejectPink.svg"} height={70} width={70} alt="thumbDown" className="btn" id="rejected" onClick={()=>update(orders[i].order_id, 'rejected', status)}/>      
          <Image src={"/confirmTeal.svg"} height={70} width={70} alt="thumbUp" className="btn" id="pending" onClick={()=>update(orders[i].order_id, 'pending', status)}/>    
      </div>
     </div>
  )
}