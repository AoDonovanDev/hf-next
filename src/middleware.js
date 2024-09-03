import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { redirectToJotForm } from './lib/actions';

export async function middleware(req) {
  //redirect all traffic to jotform for now

  const token = cookies().get("hfa");
  if(!token){
    return NextResponse.redirect(`${process.env.BASE_URL}/`);
  }
  try {
    const response = await fetch(`${process.env.BASE_URL}/admin/auth`, {
      method: "POST",
      cache: 'no-cache',
      body: JSON.stringify({token: token.value})
    })
    const { admin } = await response.json();
    if(!admin){
      return NextResponse.redirect(`${process.env.BASE_URL}/`);
    } else {
      return NextResponse.next();
    }
  } catch(e){
    return NextResponse.redirect(`${process.env.BASE_URL}/`);
  }
}
 
export const config = {
  matcher: ['/dashboard/:path*', '/confirm/:path*']
}