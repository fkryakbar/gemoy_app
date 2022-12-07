import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
// import jwt from 'jsonwebtoken'
// This function can be marked `async` if using `await` inside
export function middleware(req:NextRequest, res:NextResponse) {
    if(!req.cookies.get('token')?.value){
        return NextResponse.redirect(new URL('/login', req.url))
    }

}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ['/dashboard/:path*']

}