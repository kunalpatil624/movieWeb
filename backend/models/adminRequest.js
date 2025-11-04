import mongoose from "mongoose";

const adminRequestSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  theaterEmail: { type: String, required: true },
  theaterPhone: { type: String, required: true },
  theaterName: { type: String, required: true },
  location: { type: String, required: true },
  seats: { type: Number, required: true },
  theaterLogo: {type:String, required:true},
  facilities: [String],
  documents: { type: [String], default: [] },   // ✅ Array with default []
  theaterImages: { type: [String], default: [] },
  status: { type: String, enum: ["pending", "approved", "rejected"], default: "pending" },
  rejectionReason: { type: String }, // filled only if rejected
  approvedBy: { type: mongoose.Schema.Types.ObjectId, ref: "SuperAdmin" },
  reviewedAt: { type: Date },
  notes: { type: String }, // internal notes for admin
  priority: { type: String, enum: ["low", "medium", "high"], default: "medium" },
  verified: { type: Boolean, default: false }, // true if initial verification complete
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("AdminRequest", adminRequestSchema);



