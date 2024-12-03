
import { NextRequest, NextResponse } from "next/server";
import dbconnection from "@/db/dbconnection";
import { clothes, Orders } from "@/schema/schema";
import mongoose from "mongoose";
import { cookies } from "next/headers";

export async function GET(request: NextRequest) {
      dbconnection()

      try {
            const productId = request.nextUrl.searchParams.get('productId')
            console.log(productId)
            let allClothes;
            if (!productId) {
                  allClothes = await clothes.find({})
                  return NextResponse.json({
                        message: 'u r being shown clothes', data: allClothes
                  })
            } else {
                  const cookie = await cookies()
                  const userData = cookie.get('user')?.value;
                  if (!userData) {
                        return NextResponse.json({ message: 'User not authenticated' });
                  }

                  const parsedData = JSON.parse(userData);
                  console.log(parsedData, 'this is user data');
                  await Orders.create({
                        user: new mongoose.Types.ObjectId(parsedData._id),
                        product: new mongoose.Types.ObjectId(productId),
                  })
                  console.log('product has been added to the cart')

                  return NextResponse.json({
                        message: 'product has been added to the cart'
                  })
            }

      } catch (error) {
            return NextResponse.json({
                  message: 'server failed' + error,
            })
      }
}

