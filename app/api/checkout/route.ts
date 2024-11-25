import dbconnection from "@/db/dbconnection";
import { NextResponse } from "next/server";

export async function GET() {

      await dbconnection()
      try {
            return NextResponse.json({
                  message:'it worked'
            });
      } catch {
            // console.error('server failed', error)
          return NextResponse.json({
            message:"it didn't work"
           })
      }
};

