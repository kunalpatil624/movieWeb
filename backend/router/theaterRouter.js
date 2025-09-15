import express from 'express';
import { getTheaterById, getTheaters, updateTheater } from '../controllers/theaterController.js';
import isAuthenticated from '../middlewares/isAuthenticated.js';
import { isUserOrSuperAdmin } from '../middlewares/isUserOrSuperAdmin .js';

const router = express.Router();

router.route("/").get(isUserOrSuperAdmin, getTheaters);
router.route("/:id").post(isUserOrSuperAdmin, getTheaterById);
router.route("/:id/update").post(isAuthenticated, updateTheater)
export default router;