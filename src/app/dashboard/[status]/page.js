import { pullOrders } from "@/lib/actions";
import AdminDash from "@/ui/AdminDash";

export default async function Page() {
  
  const allOrders = await pullOrders();

  return (
    <AdminDash allOrders={allOrders}/>
  )
}