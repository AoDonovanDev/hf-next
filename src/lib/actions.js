'use server';

import { Resend } from "resend";
import TestEmail from "@/emails/TestEmail";
import { unstable_noStore } from "next/cache";

export async function test(firstName, b64Img){
  unstable_noStore()
  const resend = new Resend(process.env.RESEND_API_KEY);
  console.log(b64Img)
  const emailProps = {
    firstName,
    img: ''
  }
  if(b64Img){
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
    const upload = await response.json()
    emailProps.img = upload.img
    console.log(upload)
  }
  try {
    const data = await resend.emails.send({
      from: 'HF <hank@houseflyvictuals.com>',
      to: ['aodonovancodes@gmail.com'],
      subject: 'Hello world',
      react: TestEmail({firstName, img: emailProps.img})

    });

    console.log(data)
  } catch (error) {
    console.log(error)
    return error ;
  }
}