import mongoose from "mongoose";

const movieSchema = new mongoose.Schema({
    title: {type:String, required:true},
    description: {type:String, required:true},
    poster: {type:String, required:true},
    trailer: {type:String, required:true},
    trailerId: {type:String,},
    releaseDate: {type:String, required:true},
    originalLanguage: {type:String, required:true},
    tagline: {type:String},
    genres: {type:Array, required:true},
    casts: [{
        name:{type:String, required:true},
        imageUrl:{type:String}
    }],
    vote_average: {type:Number},
    runtime: {type:Number, required:true},
    createdBy:{type:mongoose.Schema.ObjectId, ref:"SuperAdmin"}
}, {timestamps:true})

export const Movie = mongoose.model("Movie", movieSchema)