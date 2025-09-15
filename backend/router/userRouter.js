import express from "express";
import { getProfile, login, logout, profileUpdate, sendSignupOTP, verifySignupOTP } from "../controllers/userController.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";
// import { upload } from "../middlewares/multer.js";

const router = express.Router();

router.post("/send-otp", sendSignupOTP);
router.post("/verify-otp", verifySignupOTP);
router.route("/login").post(login);
router.route("/logout").get(logout);
router.route("/profile").get(isAuthenticated,getProfile);
router.route("/profile/update").post(isAuthenticated,profileUpdate)


export default router;
