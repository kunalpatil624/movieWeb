import express, { Router } from 'express'
import isAuthenticated from '../middlewares/isAuthenticated.js';
import { createBooking, getBookingByUserId, getBookings } from '../controllers/bookingController.js';

const router = express.Router();
router.route("/Create").post(isAuthenticated, createBooking);
router.route("/user/:userId").get(isAuthenticated, getBookingByUserId);
router.route("/get").get(isAuthenticated, getBookings);


export default router;