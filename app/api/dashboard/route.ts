import { NextResponse } from "next/server";
import dbconnection from "@/db/dbconnection";
import { clothes } from "@/schema/schema";
// import { Stripe } from "stripe";

export async function GET(){
      dbconnection()
      try{
           const allClothes = await clothes.find({}) 

           
           return NextResponse.json({
            message:'u r being shown clothes', data:allClothes, 
           })
      }catch(error){
            return NextResponse.json({
                  message: 'server failed' + error,
            })
      }
}

