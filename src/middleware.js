import { NextResponse } from 'next/server';
import { isAuthorized } from "@/lib/actions";

export async function middleware(req) {
  const { authorized } = await isAuthorized();
  if(!authorized){
    return NextResponse.redirect(`${process.env.BASE_URL}`);
  } else {
    return NextResponse.next();
  } 
}
 
export const config = {
  matcher: '/dashboard/:path*',
}