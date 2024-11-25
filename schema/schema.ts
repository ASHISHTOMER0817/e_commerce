import mongoose from "mongoose";

const clothesName = new mongoose.Schema({
      name: String,
      url:String,
      price:Number,
})

const user = new mongoose.Schema({
      name: String,
      password: String,
})

export const clothes = mongoose.models.clothes || mongoose.model('clothes', clothesName)
export const users = mongoose.models.users || mongoose.model('users', user)