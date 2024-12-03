import { NextResponse, NextRequest } from "next/server";
import * as jose from 'jose'
import dbconnection from "@/db/dbconnection";
import { users } from "@/schema/schema";
import { cookies } from "next/headers";
// import { base64url } from "jose";
export async function POST(req:NextRequest){
      const {email, password} = await req.json()
      console.log('1st', email, password)
      dbconnection()
      try{
      const user = await users.findOne({email})
      if(password === user.password){
          const cookie = await cookies()
          const secretKey = jose.base64url.decode(process.env.SECRET_ID ?? '--')
          const tokenData = {email, _id:user._id}
      const tokenValue = await new jose.EncryptJWT(tokenData).setProtectedHeader({ alg: 'dir', enc: 'A128CBC-HS256' }).setExpirationTime('24hr').encrypt(secretKey)
          cookie.set({name:'token', value: tokenValue, maxAge: 60 *60 * 24, httpOnly:true})
          return NextResponse.json({
            message: 'token has been created', status:200
          })
      }
      }catch(error){
            return NextResponse.json({
                  message:'server failed' + error, 
            })
      }
}