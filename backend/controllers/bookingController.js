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

export const getBookingByUserId = async (req, res) => {
    try {
        const  {userId}  = req.params; 
        const bookings = await Booking.find({ user: userId })
            .populate({path:"show", populate:{path:'movie', model:'Movie', select: "title poster runtime"}})
        if (!bookings || bookings.length === 0) {
            return res.status(404).json({
                message: "Bookings not found!",
                success: false
            });
        }

        return res.status(200).json({
            message: "Bookings found successfully!",
            bookings,
            success: true
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Internal server error!",
            success: false
        });
    }
};

export const getBookings = async (req, res) => {
    try {
        const bookings = await Booking.find()
            .populate({
                path: "show",
                populate: { path: "movie", model: "Movie", select: "title poster runtime" }
            });

        if (!bookings || bookings.length === 0) {
            return res.status(404).json({
                message: "Bookings not found!",
                success: false
            });
        }

        // ✅ Total Bookings
        const totalBookings = bookings.length;

        // ✅ Total Earnings (sirf paid bookings ka)
        const totalEarnings = bookings
            .filter(b => b.isPaid)
            .reduce((acc, b) => acc + b.amount, 0);

        return res.status(200).json({
            message: "Bookings found successfully!",
            bookings,
            totalBookings,
            totalEarnings,
            success: true
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Internal server error!",
            success: false
        });
    }
};
