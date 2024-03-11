import { NextResponse } from 'next/server';
import { isAuthorized } from "@/lib/actions";

export async function middleware(req) {
  const { authorized } = await isAuthorized();
  if(!authorized){
    return NextResponse.redirect("http://localhost:3000/");
  } else {
    return NextResponse.next();
  } 
}
 
export const config = {
  matcher: '/dashboard/:path*',
}