'use client';

import Image from "next/image";
import { useParams } from "next/navigation";
import { updateOrderStatus, deleteOrder } from "@/lib/actions";
import { useRouter } from "next/navigation";
import uuid4 from "uuid4";

export default function AdminDash( { allOrders }) {
  
  const { status } = useParams();
  const { replace } = useRouter();

  const orders = allOrders.filter(o => o.status === status);

  async function update(order_id, target, current){
    if(target === 'confirmed'){
      replace(`/confirm/${order_id}`);
    } else {
      await updateOrderStatus(order_id, target, current);
    }
  }

  const badgeMap = {
    confirmed: 'border-[#008080] text-[#008080]',
    new: 'badge-neutral',
    rejected: 'badge-error'
  }

  return (
     <div className="h-5/6 overflow-y-scroll overscroll-contain mb-[64px]" style={{WebkitOverflowScrolling: "touch"}}>
      {orders.length > 0 ? orders.map(order => 
      <div key={uuid4()} className="collapse join-item border border-base-300">
        <input type="checkbox" name="my-accordion-3"/>
        <div className="collapse-title text-xl font-medium">
          <div className="stat-title font-bold">{order.first_name} {order.last_name}</div>
          <div className={`badge badge-outline ${badgeMap[status]}`}>{status}</div>
        </div>
        <div className="collapse-content">
          <div className="text-center m-0 flex-col divide-x-0">
          </div>
          <div className="overflow-x-auto">
            <div className="flex">
              <table className="table table-zebra">
                {/* head */}
                <thead>
                  <tr>
                    <th><div className="text-lg font-bold">{order.pickup_date.slice(0,10)}</div></th>
                    <th><div className="text-lg font-bold">{order.pickup_time}</div></th>
                  </tr>
                </thead>
                <tbody>
                  {/* row 1 */}
                  <tr>
                    <th>Type</th>
                    <td>{order.cake_type}</td>
                  </tr>
                  {/* row 2 */}
                  <tr>
                    <th>Size</th>
                    <td>{order.cake_size}</td>
                  </tr>
                  {/* row 3 */}
                  <tr>
                    <th>Cake Flavor</th>
                    <td>{order.cake_flavor === "other" ? order.write_in_cake_flavor : order.cake_flavor}</td>
                  </tr>
                  <tr>
                    <th>Filling Flavor</th>
                    <td>{order.filling_flavor}</td>
                  </tr>
              
                  {/* row 1 */}
                  <tr>
                    <th>Frosting Flavor</th>
                    <td>{order.frosting_flavor === "other" ? order.write_in_frosting_flavor : order.frosting_flavor}</td>
                  </tr>
                  {/* row 2 */}
                  <tr>
                    <th>Frosting Type</th>
                    <td>{order.frosting_type}</td>
                  </tr>
                  {/* row 3 */}
                  <tr>
                    <th>Filling Type</th>
                    <td>{order.filling_type === 'other' ? order.other : order.filling_type}</td>
                  </tr>
                   {/* row 1 */}
                  {order.glitter_cherries ? <tr>
                    <th>Glitter Cherries</th>
                  </tr> : <></>}
                  {/* row 2 */}
                  {order.bows ? <tr>
                    <th>bows</th>
                  </tr> : <></>}
                  {/* row 3 */}
                  {order.disco_balls ? <tr>
                    <th>Disco Balls</th>
                  </tr> : <></>}
                  {order.fresh_fruit ? <tr>
                    <th>Fresh Fruit</th>
                  </tr> : <></>}
                  <tr>
                    <th>Quote</th>
                    <td>{order.quote}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="chat chat-start ml-6">
              <div className="chat-bubble">{order.preferences}</div>
            </div>
            <div className="flex justify-center">
              {order.reference_img && order.reference_img.slice(0, 4) == "http" && <Image src={order.reference_img} height={200} width={200} alt="reference"/>}
            </div>
          </div>
          <div className="flex flex-row justify-between mx-2 mb-32 mt-6 items-center">
            {status == 'rejected' ? <Image src={"/trashPink.svg"} height={70} width={70} alt="trashCan" className="btn" id="trashCan" onClick={()=>deleteOrder(order.order_id, status)}/> 
            : <Image src={"/rejectPink.svg"} height={70} width={70} alt="thumbs down" className="btn" id="rejected" onClick={()=>update(order.order_id, 'rejected', status)}/>}
            <div className={"badge badge-outline badge-neutral"} onClick={()=>document.getElementById(`contactInfoModal-${order.order_id}`).showModal()}>contact info</div>
            {status == 'confirmed' ? <Image src={"/completeTeal3.svg"} height={70} width={70} alt="complete" className="btn" id="complete" onClick={()=>update(order.order_id, 'complete', status)}/> 
            : <Image src={"/confirmTeal.svg"} height={70} width={70} alt="thumbs up" className="btn" id="confirmed" onClick={()=>update(order.order_id, 'confirmed', status)}/>}
          </div>
        </div>
        <dialog id={`contactInfoModal-${order.order_id}`} className="modal">
        <div className="modal-box">
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
            </form>
            <h3 className="font-bold text-lg">{order.first_name}</h3>
            <p className="py-4">Phone: {order.phone_number}</p>
            <a href={`mailto:${order.email}`}>Email: {order.email}</a>
          </div>
        </dialog>
      </div>) : <h1 className="p-5">all caught up!</h1>}
     </div>
  )
}