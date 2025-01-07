import dbconnection from "@/db/dbconnection";
import { Products } from "@/schema/schema";
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

export async function POST(request: NextRequest) {
  await dbconnection()
  try {
    console.log(1)
    const stripe = new Stripe("sk_test_51OximYSBnrUlVANBWuJnkEQqgzzybtNBnPuC3v8vtcEj475dmBLMULuRxMhb8ObPAEoweilqaQw7b5vkQlk1Hu2R00OydQNaTd")
    console.log('2')
    const products: { objectId: string, option: boolean }[] = await request.json()
    const objectIdArr = products.map(product => product.objectId)
    const CartProducts = await Products.find({ _id: { $in: objectIdArr } })
    const items = CartProducts.map(({ name, price, url }: { name: string, price: number, url:string }) => {
      return {
        price_data: {
          currency: 'inr',
          product_data: {
            name: name,
            images: [url],
          },
          unit_amount: price *100
        },
        quantity: 1
      }
    })
    const session = await stripe.checkout.sessions.create({
      line_items: items,
      
      mode: 'payment',
      success_url: `https://www.bing.com/search?pglt=899&q=stripe&cvid=84b97efb72c74deeb007ea096da8a33e&gs_lcrp=EgRlZGdlKgYIABBFGDsyBggAEEUYOzIGCAEQABhAMgYIAhAAGEAyBggDEAAYQDIGCAQQABhAMgYIBRAAGEAyBggGEAAYQDIGCAcQRRg8MgYICBBFGDzSAQkxMjcwMmowajGoAgiwAgE&FORM=ANNTA1&PC=W069`,
      cancel_url: `https://www.bing.com/search?pglt=899&q=stripe&cvid=84b97efb72c74deeb007ea096da8a33e&gs_lcrp=EgRlZGdlKgYIABBFGDsyBggAEEUYOzIGCAEQABhAMgYIAhAAGEAyBggDEAAYQDIGCAQQABhAMgYIBRAAGEAyBggGEAAYQDIGCAcQRRg8MgYICBBFGDzSAQkxMjcwMmowajGoAgiwAgE&FORM=ANNTA1&PC=W069`,
    });

    console.log('3')
    return NextResponse.json({ url: session.url });
  } catch (error) { // Add 'error' parameter
    console.error('Server failed:', error);  // Log the exact error
    return NextResponse.json({ message: "It didn't work" + error });
  }

};

