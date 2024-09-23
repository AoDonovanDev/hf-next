'use server';

import { Resend } from "resend";
import { unstable_noStore } from "next/cache";
import { sql } from '@vercel/postgres';
import OrderReceivedNotice from "@/emails/OrderReceivedNotice";
import OrderDetails from "@/emails/OrderDetail";
import OrderConfirmation from "@/emails/OrderConfirmation";
import { addCake, addCustomer, addOrder, addCakeDay } from "./queries";
import { cookies } from 'next/headers';
import { redirect } from "next/navigation";
import jwt from 'jsonwebtoken';
import { revalidatePath } from "next/cache";
import bcrypt from 'bcrypt';

export async function upload(b64Img){
  const cut = b64Img.indexOf(",");
  const snip = b64Img.slice(cut+1);
  const params = new URLSearchParams({
    key: process.env.IMGBB_API_KEY,
    image: snip
  })

  try {
    const response = await fetch('https://api.imgbb.com/1/upload', {
    method: 'POST',
    cache: 'no-cache',
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    },
    body: params
    })
    const uploadResponseObj = await response.json();
    console.log(uploadResponseObj);
    const { data } = uploadResponseObj;
    const { display_url } = data;
    return display_url;
  } catch(err) {
    console.log(err);
    return("could not upload image");
  }
}

export async function submit(formData){
  unstable_noStore()
  const resend = new Resend(process.env.RESEND_API_KEY);
  try {
    const data = await resend.emails.send({
      from: 'HF <hank@houseflyvictuals.com>',
      to: [formData.contactInfo.email],
      reply_to: [process.env.ADMIN_EMAIL],
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
  const cakeDay = await addCakeDay({date, pickupTime});
}

export async function confirmOrder (formData) {
  unstable_noStore();
  const resend = new Resend(process.env.RESEND_API_KEY);
  const emailBody = formData.get("emailBody");
  const customerEmail = formData.get("customerEmail")
  const update = await sql`UPDATE Orders SET status = 'confirmed' where Orders.id = ${formData.get('orderId')};`;
  
  console.log('beep boop, sending confirmation email');
  try{
    const confirmation = await resend.emails.send({
      from: 'HF <hank@houseflyvictuals.com>',
      to: [customerEmail],
      reply_to: [process.env.ADMIN_EMAIL],
      subject: 'Order Confirmed',
      react: <OrderConfirmation emailBody={emailBody}/>
    });
  } catch(error) {
    console.log('failed to send email', error)
  }

  revalidatePath(`/dashboard`);
  redirect('/dashboard/confirmed');
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

export async function login(formData){
  unstable_noStore();
  const admin = await sql`SELECT password FROM Users WHERE id=1`;
  const authorized = await bcrypt.compare(formData.get('pwd'), admin.rows[0].password);
  if(authorized){
    const token = jwt.sign({
      user: "theOnlyUser",
      admin: true
    }, process.env.JWT_SECRET)
    cookies().set("hfa", token, {maxAge: 3600});
    redirect('/dashboard/new');
  } else {
    redirect('/');
  }
}

export async function isAuthenticated(){
  const token = cookies().get("hfa");
  if(!token?.value){
    return false
  }
  const { admin } = jwt.verify(token.value, process.env.JWT_SECRET);
  return admin;
}

export async function pullOrders(status){
  unstable_noStore();

  const orders = await sql`
      SELECT Orders.id AS order_id, * FROM Orders 
      INNER JOIN cakes c ON Orders.cake = c.id
      INNER JOIN customers cu ON Orders.customer = cu.id;
      `
  return orders.rows
} 

export async function updateOrderStatus(order_id, target, current){
  unstable_noStore();

  const update = await sql`UPDATE Orders SET status = ${target} where Orders.id = ${order_id};`;
  revalidatePath(`/dashboard/${current}`);
}

export async function getOrderInfo(order_id){
  unstable_noStore();
  const order = await sql`
      SELECT Orders.id AS order_id, * FROM Orders 
      INNER JOIN cakes c ON Orders.cake = c.id
      INNER JOIN customers cu ON Orders.customer = cu.id
      WHERE Orders.id = ${order_id};`
  return order;
  }

export async function logout(){
  cookies().delete("hfa");
  redirect('/');
}

export async function redirectToJotForm(){
  redirect("https://form.jotform.com/233177226048052");
}

export async function deleteOrder(order_id, current){
  unstable_noStore();
  await sql`DELETE FROM Orders WHERE id = ${order_id};`;
  revalidatePath(`/dashboard/${current}`);
}


