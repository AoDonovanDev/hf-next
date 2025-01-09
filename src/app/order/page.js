import CakeForm from "../ui/CakeForm";
import { getCakeDays } from "@/lib/actions";

export default async function Page(){

  const { cakeDays } = await getCakeDays();
  const booked = cakeDays.rows.filter(r => !r.available).map(r => new Date(r.date));
  const holidays = [
    new Date(2025, 1, 13),
    new Date(2025, 1, 14),
    new Date(2025, 2, 14),
    new Date(2025, 1, 27)
    ]
  for(let date of holidays){
      booked.push(date);
      }

  return (
    <CakeForm cakeDays={cakeDays.rows} unavailable={booked}/>
  )
}