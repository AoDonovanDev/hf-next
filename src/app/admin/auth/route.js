import jwt from 'jsonwebtoken';
import { NextResponse } from 'next/server';

export async function POST(request){
    const { token } = await request.json();
    const { admin } = jwt.verify(token, process.env.JWT_SECRET);
    if(admin){
        return NextResponse.json( { admin } );
    }
    return NextResponse.redirect(new URL("/", request.url));
}
