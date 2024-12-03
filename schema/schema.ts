import mongoose, { Schema } from "mongoose";

const clothSchema = new Schema({
      name: String,
      url:String,
      price:Number,
})

const userSchema = new Schema({
      name: String,
      email:String,
      password: String,
})
export const clothes = mongoose.models.clothes || mongoose.model('clothes', clothSchema)
export const users = mongoose.models.users || mongoose.model('users', userSchema)

const ordersSchema = new Schema({
      user:{type:mongoose.Schema.Types.ObjectId, ref:'users'},
      product:{type:mongoose.Schema.Types.ObjectId, ref:'clothes'}
})

export const Orders = mongoose.models.orders || mongoose.model('orders', ordersSchema)