import express from "express";
import { createOrder, saveBooking } from "../controllers/paymentController.js";

const router = express.Router();

router.post("/create-order", createOrder);
router.post("/save-booking", saveBooking); // Payment success call

export default router;
