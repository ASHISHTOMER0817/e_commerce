import mongoose from "mongoose";
export async function dbconnection() {
      try {
          const connect =  await mongoose.connect(process.env.DATABASE_CONNECTION_STRING!)
            if(connect)console.log('connected successfully')

      } catch (error) {
            console.error('failed to connect to database', error)
      }
}
export default dbconnection;