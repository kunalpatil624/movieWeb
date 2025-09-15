import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    imageUrl: { type: String},
    location:{type:String},
    phoneNumber:{type:Number,},
    password: { type: String, required: true },
    role: { type: String, enum: ["user", "admin"], default: "user" },
    isTheaterRequestPending:{type:Boolean, default:false},
    theaterRequestDetails:[{type:mongoose.Schema.ObjectId, ref:"AdminRequest"}],
    theater:{type:mongoose.Schema.ObjectId, ref:"Theater"},
    createdAt: {
        type: Date,
        default: Date.now
    }
  },
  { timestamps: true }
);

export const User = mongoose.model("User", userSchema);
