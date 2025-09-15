import express from 'express'
import { addSuperAdmin, loginSuperAdmin, logoutSuperAdmin } from '../controllers/superAdminController.js';
import { addMovie, deleteMovie, getAllMovies, getMovieById, updateMovie } from '../controllers/movieController.js';
import { isSuperAuthenticated } from '../middlewares/isSuperAuthenticated.js';
import { getAllRequest, getRequestById, updateRequest } from '../controllers/RequestController.js';
import { getTheaters } from '../controllers/theaterController.js';

const router = express.Router();
router.route("/register").post(addSuperAdmin);
router.route("/login").post(loginSuperAdmin);
router.route("/logout").get(logoutSuperAdmin);
export default router;