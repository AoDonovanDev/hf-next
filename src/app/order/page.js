import CakeForm from "../ui/CakeForm";
import { getCakeDays } from "@/lib/actions";

export default async function Page(){

  const { cakeDays } = await getCakeDays();
  const booked = cakeDays.rows.filter(r => !r.available).map(r => new Date(r.date));
  const holidays = [
    new Date(2024, 10, 20),
    new Date(2024, 10 ,21),
    new Date(2024, 10, 22),
    new Date(2024, 11, 24),
    new Date(2024, 11, 25),
    new Date(2024, 11, 26)
    ]
  for(let date of holidays){
      booked.push(date);
      }

  return (
    <CakeForm cakeDays={cakeDays.rows} unavailable={booked}/>
  )
}