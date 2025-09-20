import Razorpay from "razorpay";
import dotenv from "dotenv";
import Booking from "../models/bookings.js";
dotenv.config();

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// Create Razorpay Order
export const createOrder = async (req, res) => {
  try {
    const { amount } = req.body; // amount in rupees

    const options = {
      amount: amount * 100,
      currency: "INR",
      receipt: `receipt_order_${Date.now()}`,
    };

    const order = await razorpay.orders.create(options);
    res.status(200).json(order);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

// Save Booking after Payment Success
export const saveBooking = async (req, res) => {
  try {
    const { user, show, amount, bookedSeats, paymentLink } = req.body;

    if (!user || !show || !amount || !bookedSeats) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const booking = await Booking.create({
      user,
      show,
      amount,
      bookedSeats,
      paymentLink,
      isPaid: true
    });

    res.status(201).json({
      message: "Booking saved successfully",
      booking
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
