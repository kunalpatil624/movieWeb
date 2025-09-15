import express, { Router } from 'express'
import isAuthenticated from '../middlewares/isAuthenticated.js';
import { createBooking } from '../controllers/bookingController.js';

const router = express.Router();
router.route("/Create").post(isAuthenticated, createBooking);
export default router;