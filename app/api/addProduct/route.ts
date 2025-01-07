import dbconnection from "@/db/dbconnection";
import { Products } from "@/schema/schema";
import { NextRequest, NextResponse } from "next/server";
export async function POST(req: NextRequest) {
      await dbconnection()
      try {
            const body = await req.json();
            console.log(body)
            const { name, price, description, imgUrl, colors, tags } = body;

            // Do something with the data
            await Products.create({
                  name,
                  price,
                  description,
                  imgUrl,
                  colors:[colors],
                  selectedTags:[...tags]
            })
            console.log('product created successfully')
            return NextResponse.json({
                  message: 'Product added successfully'
            })
      } catch (err) {
            console.log(err)
            return NextResponse.json({
                  message: 'Error adding product'
            })
      }
}

