import mongoose from "mongoose";
// import { clothes } from "@/schema/schema";
export async function dbconnection() {
      try {
            await mongoose.connect(process.env.DATABASE_CONNECTION_STRING!)
            // if(dbConnection)console.log('connected successfully')
            


            // await clothes.insertMany([
            //       {name:'shirt-1', url: 'https://m.media-amazon.com/images/I/41BH65pmosL._AC_UL480_FMwebp_QL65_.jpg', price:1000 },
            //       {name:'shirt-2', url: 'https://m.media-amazon.com/images/I/514nTj8YD8L._AC_UL480_FMwebp_QL65_.jpg', price:1000 },
            //       {name:'shirt-3', url: 'https://m.media-amazon.com/images/I/51-pLhPHoBL._AC_UL480_FMwebp_QL65_.jpg', price:1000 },
            //       {name:'shirt-4', url: 'https://m.media-amazon.com/images/I/71HAj5vRNpL._AC_UL480_FMwebp_QL65_.jpg', price:1000 },
            //       {name:'shirt-5', url: 'https://m.media-amazon.com/images/I/41mwvAjYKNL._AC_UL480_FMwebp_QL65_.jpg', price:1000 },
            //       {name:'shirt-6', url: 'https://m.media-amazon.com/images/I/51oLp9oqbOL._AC_UL480_FMwebp_QL65_.jpg', price:1000 },
            //       {name:'shirt-7', url: 'https://m.media-amazon.com/images/I/61ThK8RnMjL._AC_UL480_FMwebp_QL65_.jpg', price:1000 },
            //       {name:'shirt-8', url: 'https://m.media-amazon.com/images/I/61Ws1UdFKxL._AC_UL480_FMwebp_QL65_.jpg', price:1000 },
            //       {name:'shirt-9', url: 'https://m.media-amazon.com/images/I/61JxTwwj-5L._AC_UL480_FMwebp_QL65_.jpg', price:1000 },
            //       {name:'shirt-10', url: 'https://m.media-amazon.com/images/I/51X+qNDanVL._AC_UL480_FMwebp_QL65_.jpg', price:1000 },
            // ])
            // console.log('Data inserted successfully');

      } catch (error) {
            console.error('failed to connect to database', error)
      }
}

// dbconnection()

export default dbconnection;