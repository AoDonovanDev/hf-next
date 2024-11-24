import { NextResponse } from 'next/server';

export async function GET(request){
    await new Promise(r => setTimeout(r, 3000));
    return NextResponse.json( { doesThisSleep: false } );
}
