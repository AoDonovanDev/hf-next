'use server';

import { Resend } from "resend";
import { unstable_noStore } from "next/cache";
import { QueryResult, sql } from '@vercel/postgres';
import OrderReceivedNotice from "@/emails/OrderReceivedNotice";
import OrderDetails from "@/emails/OrderDetail";
import { addCake, addCustomer, addOrder, addCakeDay } from "./queries";

export async function upload(b64Img){
  const cut = 'data:image/png;base64,'
  const snip = b64Img.slice(cut.length)
  const params = new URLSearchParams({
    key: process.env.IMGBB_API_KEY,
    image: snip
  })

  const response = await fetch('https://api.imgbb.com/1/upload', {
    method: 'POST',
    cache: 'no-cache',
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    },
    body: params
  })
  const uploadResponseObj = await response.json()
  const { data } = uploadResponseObj;
  const { display_url } = data;
  return display_url;
}

export async function submit(formData){
  unstable_noStore()
  const resend = new Resend(process.env.RESEND_API_KEY);
  try {
    const data = await resend.emails.send({
      from: 'HF <hank@houseflyvictuals.com>',
      to: [formData.contactInfo.email],
      subject: 'Order Received',
      react: <OrderReceivedNotice firstName={formData.contactInfo.firstName} hfEmail={"houseflyvictuals@gmail.com"} estimatedTotal={`$${formData.total}.00`} />
    });
    console.log(data)
    const adminEmail = await resend.emails.send({
      from: 'HF <hank@houseflyvictuals.com>',
      to: process.env.ADMIN_EMAIL,
      subject: 'New Order',
      react: <OrderDetails total={formData.total}
                           cakeDetails={formData.cakeDetails}
                           cakeSize={formData.cakeSize}
                           cakeType={formData.cakeType}
                           contactInfo={formData.contactInfo}
                           pickupDetails={formData.pickupDetails}
                           preferences={formData.preferences}
                           imgUrl={formData.imgUrl}/>
    })
  } catch (error) {
    console.log(error)
    return error ;
  }

  const {total, cakeSize, cakeType, preferences, imgUrl} = formData;
  const {date, pickupTime} = formData.pickupDetails;
  const cake = await addCake({cakeSize, cakeType, preferences, imgUrl, ...formData.cakeDetails});
  const customer = await addCustomer(formData.contactInfo);
  const order = await addOrder({customerId: customer.rows[0].id, cakeId: cake.rows[0].id, date, pickupTime, total});
  const cakeDay = await addCakeDay(date);
}

export async function getCakeDays(){
  unstable_noStore();
  try {
    const cakeDays = await sql`SELECT * FROM Cake_Days`;
    return {cakeDays};
  } catch {
    console.log(error);
  }
}


