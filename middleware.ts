import * as jose from "jose"
// import { jwtVerify } from "jose"
import { cookies } from "next/headers"
import { NextRequest, NextResponse } from "next/server"

export async function middleware(request:NextRequest) {
      const path = request.nextUrl.pathname
      const cookie = await cookies()
      const token = cookie.get('token')?.value
      if (!token) return NextResponse.redirect(new URL('/login', request.url));
      const { payload } = await jose.jwtDecrypt(token, jose.base64url.decode(process.env.SECRET_ID ?? ''));
      // console.log(payload)
      if (path == '/login' || path == '/signup' && payload) {
            return NextResponse.redirect(new URL('/', request.url))
      };
      // console.log('this is payload', payload)
      // const requestHeaders = new Headers(request.headers)
      // requestHeaders.set('user',JSON.stringify(payload))
//      return NextResponse.next({
//             request:{
//                   headers:requestHeaders
//             }
//       })

// Set user data in the cookie
const response = NextResponse.next();
response.cookies.set({
  name: 'user',
  value: JSON.stringify(payload),
  httpOnly: true, // Secure the cookie
  path: '/', // Ensure it's available site-wide
});

return response;}

export const config = {
      matcher: ['/checkout', '/',]
}