'use server';

import { Resend } from "resend";
import { unstable_noStore } from "next/cache";
import OrderReceivedNotice from "@/emails/OrderReceivedNotice";

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
  } catch (error) {
    console.log(error)
    return error ;
  }
}