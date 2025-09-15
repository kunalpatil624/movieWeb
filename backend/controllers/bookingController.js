import express from 'express';
import { Show } from '../models/show.js';
import Booking from '../models/bookings.js'

export const createBooking = async(req, res) => {
    try {
        const {showId, amount, bookedSeats} = req.body;
        const userId = req.id;
        if(!showId || !amount || !bookedSeats || !bookedSeats.length === 0){
            return res.status(400).json({
                message:"Sumthing is missing!",
                success:false
            });
        };
        
        const show = await Show.findById(showId);
        if(!show){
            return res.status(400).json({
                message:"Show not found!",
                success:false
            });
        };

        const alreadyBooked = show.bookingSeates.filter((seat) => bookedSeats.includes(seat));
        if(alreadyBooked.length > 0){
            return res.status(400).json({
                message:`Seats already booked: ${alreadyBooked.join(", ")}`,
                success:false
            });
        };

        const booking = new Booking({
            user:userId,
            show:showId,
            amount,
            bookedSeats
        });

        await booking.save();

        show.bookingSeates.push(...bookedSeats);
        await show.save();

        return res.status(200).json({
            message:"Booking created successfully!",
            booking,
            success:true
        })
    } catch (error) {
        console.log(error);
        return res.status(400).json({
            message:"Internal server error!",
            success:false
        });
    };
}

export const getBookings = async(req, res) => {
    try {
        
    } catch (error) {
        console.log(error);
        return res.status(400).json({
            message:"Internal server error!",
            success:false
        });
    }
}