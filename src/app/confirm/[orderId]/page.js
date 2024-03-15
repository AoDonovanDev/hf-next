import Confirmation from "../../ui/Confirmation";
import { getOrderInfo } from "@/lib/actions";

export default async function Page ( { params } ) {

  const { orderId } = params;
  const order = await getOrderInfo(orderId);
  
  return (
    <Confirmation order={order.rows[0]}/>
  )
}