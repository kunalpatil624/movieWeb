import mongoose from "mongoose";

const showSchema = new mongoose.Schema({
    movie:{type: mongoose.Schema.Types.ObjectId, ref: "Movie", required:true},
    theater:{type:mongoose.Schema.Types.ObjectId, ref:"Theater", required:true},
    dateTime: { type: Date, required: true },
    showPrice:{type:Number, required:true},
    totalSeates:{type:Number,},
    bookingSeates:[{}]
}, {minimize:false})

export const Show = mongoose.model('Show', showSchema)