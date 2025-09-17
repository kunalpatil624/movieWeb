import express from 'express';
import {Movie} from '../models/movie.js';
import Theater from '../models/theater.js';
import { Show } from '../models/show.js';
export const createShow = async(req, res) => {
    try {
        const {movieId, theaterId, date, time,showPrice, totalSeates} = req.body;
        if(!movieId || !theaterId || !date || !time || !totalSeates || !showPrice){ 
            return res.status(400).json({ 
                message:"All fields are required!", 
                success:false 
            }); 
        };
        const movie = await Movie.findById(movieId);
        const theater = await Theater.findById(theaterId);
         
        if (!movie) return res.status(404).json({ success: false, message: "Movie not found" });
        if (!theater) return res.status(404).json({ success: false, message: "Theater not found" });

        const existingShow = await Show.findOne({
      movie: movieId,
      theater: theaterId,
      date,
      time,
    });

    if (existingShow) {
      return res.status(400).json({
        message: "This show already exists!",
        success: false,
      });
    }
   
        const show = new Show({
            movie:movieId,
            theater:theaterId,
            date:date,
            time:time,
            showPrice:showPrice,
            totalSeates:totalSeates
        });

        await show.save();

        if(!show){
            return res.status(400).json({
                message:"Show not created!",
                success:false
            });
        };

        return res.status(200).json({
            message:"Show created successfully!",
            show,
            success:true
        });

    } catch (error) {
        console.log(error);
        return res.status(400).json({
            message:"Internal server error!",
            success:false
        });
    };
}

export const getShow = async(req, res) => {
    try {
        const shows = await Show.find();
        if(!shows){
            return res.status(400).json({
                message:"Shows not found!",
                success:false
            });
        };

        return res.status(200).json({
            message:"Shows found successfully!",
            shows,
            success:true
        });
    } catch (error) {
        console.log(error);
        return res.status(400).json({
            message:"Internal server error!",
            success:false
        });
    }
}

export const getShowById = async(req, res)=> {
    try {
        const showId = req.params.id;

        const show = await Show.findById(showId);
        if(!show){
            return res.status(400).json({
                message:"Show not found!",
                success:false
            });
        };

        return res.status(200).json({
            message:"Show found successfully!",
            show,
            success:true
        });
        
    } catch (error) {
        console.log(error);
        return res.status(400).json({
            message:"Internal server error!",
            success:false
        });
    }
}
export const updateShow = async(req, res)=> {
    try {
        const {date, time, showPrice} = req.body;
        const showId = req.params.id;

        if(!date || !time || !showPrice){
            return res.status(400).json({
                message:"Sumthing is missing!",
                success:true
            });
        };

        const show = await Show.findById(showId);
        if(!show){
            return res.status(400).json({
                message:"Show not found!",
                success:false
            });
        };
        if(date) show.date = date;
        if(time) show.time = time;
        if(showPrice) show.showPrice = showPrice;
        await show.save();
        return res.status(200).json({
            message:"Show updated successfully!",
            show,
            success:true
        })

    } catch (error) {
        console.log(error);
        return res.status(400).json({
            message:"Internal server error!",
            success:false
        });
    }
}