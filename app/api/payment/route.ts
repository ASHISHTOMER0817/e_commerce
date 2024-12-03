import dbconnection from "@/db/dbconnection";
import { NextResponse } from "next/server";
import Stripe from "stripe";

export async function GET() {

  await dbconnection()
  try {
    console.log(1)
    const stripe = new Stripe(process.env.SECRET_KEY ?? '' )
    console.log('2')
    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          price_data: {
            currency: 'inr',          // Replace 'usd' with your currency (e.g., 'inr')
            product_data: {
              name: 'Your Product Name', // Replace with your product name
            },
            unit_amount: 1000,        // Amount in smallest currency unit (e.g., cents for USD)
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `https://www.bing.com/search?pglt=899&q=heretic+movie&cvid=75ba283702fa4943afa832328580dbec&gs_lcrp=EgRlZGdlKgkIABBFGDsY-QcyCQgAEEUYOxj5BzIGCAEQABhAMgYIAhAAGEAyBggDEC4YQDIGCAQQRRg5MgYIBRAAGEAyBggGEAAYQDIGCAcQABhAMgYICBBFGDzSAQgzNDQ0ajBqMagCCLACAQ&FORM=ANNTA1&PC=W069`,
      cancel_url: `https://www.bing.com/search?pglt=899&q=heretic+movie&cvid=75ba283702fa4943afa832328580dbec&gs_lcrp=EgRlZGdlKgkIABBFGDsY-QcyCQgAEEUYOxj5BzIGCAEQABhAMgYIAhAAGEAyBggDEC4YQDIGCAQQRRg5MgYIBRAAGEAyBggGEAAYQDIGCAcQABhAMgYICBBFGDzSAQgzNDQ0ajBqMagCCLACAQ&FORM=ANNTA1&PC=W069`,
    });


    console.log('3')
    return NextResponse.json({ url: session.url });
  } catch (error) { // Add 'error' parameter
    console.error('Server failed:', error);  // Log the exact error
    return NextResponse.json({ message: "It didn't work" + error });
  }

};

