'use server';

import { Resend } from "resend";
import TestEmail from "@/emails/TestEmail";
import { unstable_noStore } from "next/cache";

export async function test(firstName){
  unstable_noStore()
  console.log('env in test action', process.env.RESEND_API_KEY)
  const resend = new Resend(process.env.RESEND_API_KEY);
  try {
    const data = await resend.emails.send({
      from: 'HF <hank@houseflyvictuals.com>',
      to: ['aodonovancodes@gmail.com'],
      subject: 'Hello world',
      react: TestEmail({ firstName }),
    });

    console.log(data)
  } catch (error) {
    console.log(error)
    return error ;
  }
}