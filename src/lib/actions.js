'use server';

import { Resend } from "resend";
import { unstable_noStore } from "next/cache";
import { sql } from '@vercel/postgres';
import OrderReceivedNotice from "@/emails/OrderReceivedNotice";
import OrderDetails from "@/emails/OrderDetail";
import { addCake, addCustomer, addOrder, addCakeDay } from "./queries";
import { cookies } from 'next/headers';
import { redirect } from "next/navigation";
import jwt from 'jsonwebtoken';
import { revalidatePath } from "next/cache";

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

export async function setAdminCookie(formData){
  const token = jwt.sign({raw: formData.get('pwd')}, process.env.JWT_SECRET);
  cookies().set("hfa", token);
  redirect('/dashboard/new');
}

export async function isAuthorized(){
  const adminCookie = cookies().get("hfa");
  if(!adminCookie?.value) return false;
  const passCheck = await fetch('http://localhost:3000/admin/auth', {
    cache: "no-cache",
    method: "POST",
    body: JSON.stringify({adminCookie: adminCookie.value})
  });
  const authorized = await passCheck.json();
  return authorized;
}

export async function pullOrders(status){
  unstable_noStore();

  const orders = await sql`
      SELECT Orders.id AS order_id, * FROM Orders 
      INNER JOIN cakes c ON Orders.cake = c.id
      INNER JOIN customers cu ON Orders.customer = cu.id;
      `
  return orders.rows;
} 

export async function updateOrderStatus(order_id, target, current){
  unstable_noStore();

  const update = await sql`UPDATE Orders SET status = ${target} where Orders.id = ${order_id};`;
  revalidatePath(`/dashboard/${current}`);
}

export async function logout(){
  cookies().delete("hfa");
  redirect("/");
}

