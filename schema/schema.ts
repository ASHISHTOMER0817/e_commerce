import mongoose, { Schema } from "mongoose";

const ProductSchema = new Schema({
      name: {
        type: String,
        required: true, // Makes the field mandatory
      },
      price: {
        type: Number,
        required: true,
        min: 0, // Ensures price can't be negative
      },
      imgUrl: {
        type: String,
        required: true,
      },
      colors: {
        type: [String], // Array of strings to support multiple colors
      },
      selectedTags: {
        type: [String], // Array of strings
        default: [], // Default to an empty array
      },
    });
    

const userSchema = new Schema({
      name: String,
      email:String,
      password: String,
})
export const Products = mongoose.models.clothes || mongoose.model('clothes', ProductSchema)
export const users = mongoose.models.users || mongoose.model('users', userSchema)

const ordersSchema = new Schema({
      user:{type:mongoose.Schema.Types.ObjectId, ref:'users'},
      product:{type:mongoose.Schema.Types.ObjectId, ref:'clothes'}
})

export const Orders = mongoose.models.orders || mongoose.model('orders', ordersSchema)