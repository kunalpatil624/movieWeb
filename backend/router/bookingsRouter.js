import express, { Router } from 'express'
import isAuthenticated from '../middlewares/isAuthenticated.js';
import { createBooking, getBookingByUserId } from '../controllers/bookingController.js';

const router = express.Router();
router.route("/Create").post(isAuthenticated, createBooking);
router.route("/user/:userId").get(isAuthenticated, getBookingByUserId);

export default router;