import { sql } from '@vercel/postgres';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { NextResponse } from 'next/server';



export async function POST(request){
    const { adminCookie } = await request.json();
    if(!adminCookie){
        return NextResponse.redirect(new URL("/", request.url));
    }
    const { raw } = jwt.verify(adminCookie, process.env.JWT_SECRET);
    const admin = await sql`SELECT password FROM Users WHERE id=1`;
    const authorized = await bcrypt.compare(raw, admin.rows[0].password);
    return NextResponse.json({authorized});
}

export async function GET(request){
    return NextResponse.redirect(new URL("/", request.url));
}