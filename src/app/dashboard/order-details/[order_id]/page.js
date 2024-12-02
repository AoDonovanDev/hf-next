import { getOrderInfo } from "@/lib/actions";
import OrderTable from "@/app/ui/OrderTable";

export default async function Page( { params } ) {

    const {order_id } = params;

    const order = await getOrderInfo(order_id);

    return (
        <OrderTable order={order.rows[0]}/>
    )
}