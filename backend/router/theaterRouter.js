import express from 'express';
import { getTheaterById, getTheaters, updateTheater } from '../controllers/theaterController.js';
import isAuthenticated from '../middlewares/isAuthenticated.js';
import { isUserOrSuperAdmin } from '../middlewares/isUserOrSuperAdmin .js';

const router = express.Router();

router.route("/").get(getTheaters);
router.route("/:id").get(getTheaterById);
router.route("/:id/update").put(isAuthenticated, updateTheater)
export default router;