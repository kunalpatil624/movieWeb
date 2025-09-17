import mongoose from "mongoose";

const theaterSchema = new mongoose.Schema({
  owner: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  name: { type: String, required: true },
  theaterEmail: {type:String, required: true},
  theaterPhone: {type:String, required:true},
  theaterLogo: {type:String, required:true},
  location: { type: String, required: true },
  seats: { type: Number, required: true },
  facilities: [String],
  theaterImages: { type: [String], default: [] },
  priority: { type: String, enum: ["low", "medium", "high"], default: "medium" },
  shows: [{
    type:mongoose.Schema.ObjectId,
    ref:"Show"
  }],
  createdAt: { type: Date, default: Date.now }
});

 const Theater = mongoose.model("Theater", theaterSchema)
export default Theater;