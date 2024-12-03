import { NextResponse } from "next/server";
import dbconnection from "@/db/dbconnection";
import { cookies } from "next/headers";
import { Orders } from "@/schema/schema";
export async function GET(){

      dbconnection()
      try{
            const cookie = await cookies()
            const user = cookie.get('user')?.value
            if(!user) return NextResponse.json({
                  message:'token missing'
            })
            const parsedData = JSON.parse(user)
            console.log(parsedData)
            const userOrders = await Orders.find({user:parsedData._id}).populate('user').populate('product').exec()
            console.log(userOrders)

            return NextResponse.json({
                  message:'showing orders', data:userOrders,
            })

      }catch(error){
            return NextResponse.json({
                  message:'server error' + error
            })
      }
}