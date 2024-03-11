import { pullOrders } from "@/lib/actions";
import AdminDash from "C:/Users/aodon/repos/hf-next/src/app/ui/AdminDash.js";

export default async function Page() {
  
  const allOrders = await pullOrders();

  return (
    <AdminDash allOrders={allOrders}/>
  )
}