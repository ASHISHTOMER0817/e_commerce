import { NextResponse, NextRequest } from "next/server";
import dbconnection from "@/db/dbconnection";
import { users } from "@/schema/schema";
import { cookies } from "next/headers";
// import crypto from "crypto"
import jose from "jose"
// import { redirect } from "next/navigation";
export async function POST(request: NextRequest) {
      dbconnection()
      try {

            const { name, email, password } = await request.json()
            const user = await users.findOne({ email })
            if (!user) {
                  await users.create({
                        name,
                        email,
                        password
                  });
                  const currentUser = await users.findOne({ email })
                  // const encryptedData = `${currentUser.email},${currentUser._id}`
                  const secretKey = jose.base64url.decode(process.env.SECRET_ID ?? '');
          
                  const tokenValue = await new jose.EncryptJWT({ email, _id:currentUser._id }).setExpirationTime('24hr').encrypt(secretKey)
            
                  // const secret_key = crypto.createHmac('sha256', process.env.SECRET_ID ?? '').update(currentUser._id).digest('hex')
                  const cookie = await cookies()
                  cookie.set('token', tokenValue, { httpOnly: true, maxAge: 60 * 60 * 24 });
                 
                  return NextResponse.json({
                        message: 'user created successfully', status:200
                  })
            } else if (user) return NextResponse.json({ message: 'user already exist' })
      } catch (error) {
            return NextResponse.json({
                  message: 'server failed' + error, status:400
            })
      }
      // redirect('/checkout')
      
}