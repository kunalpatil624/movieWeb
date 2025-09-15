import express from "express";
import {
  addMovie,
  deleteMovie,
  getAllMovies,
  getMovieById,
  updateMovie,
} from "../controllers/movieController.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import { isSuperAuthenticated } from "../middlewares/isSuperAuthenticated.js";
import {isUserOrSuperAdmin} from "../middlewares/isUserOrSuperAdmin .js"
const router = express.Router();

router.route("/").get(isUserOrSuperAdmin, getAllMovies);
router.route("/add").post(isSuperAuthenticated, updateMovie, addMovie);
router.route("/:id").get(isUserOrSuperAdmin, getMovieById);
router.route("/:id/update").put(isSuperAuthenticated, updateMovie);
router.route("/:id/delete").delete(isSuperAuthenticated, deleteMovie);

export default router;


// import express from 'express'
// import { addMovie, deleteMovie, getAllMovies, getMovieById, updateMovie } from '../controllers/movieController.js';
// import isAuthenticated from '../middlewares/isAuthenticated.js';
// import { isSuperAuthenticated } from '../middlewares/isSuperAuthenticated.js';
// import { isUserOrSuperAdmin } from '../middlewares/isUserOrSuperAdmin .js';
// import { uploadMultiple } from '../middlewares/multer.js';

// const router = express.Router();
// router.route("/").get(isUserOrSuperAdmin,getAllMovies);
// router.route("/add").post(isSuperAuthenticated,uploadMultiple, addMovie);
// router.route("/:id").post(isUserOrSuperAdmin,getMovieById);
// router.route("/:id/update").put(isSuperAuthenticated, updateMovie);
// router.route("/:id/delete").post(isSuperAuthenticated, deleteMovie);
// export default router;


// import express from 'express'
// import { addMovie, deleteMovie, getAllMovies, getMovieById, updateMovie } from '../controllers/movieController.js';
// import isAuthenticated from '../middlewares/isAuthenticated.js';
// import { isSuperAuthenticated } from '../middlewares/isSuperAuthenticated.js';
// import { isUserOrSuperAdmin } from '../middlewares/isUserOrSuperAdmin .js';
// import multer from 'multer';
// const storage = multer.memoryStorage();
// const upload = multer({ storage });

// const router = express.Router();
// router.route("/").get(isUserOrSuperAdmin,getAllMovies);
// router.route("/add").post(isSuperAuthenticated,upload.single("poster"), addMovie);
// router.route("/:id").post(isUserOrSuperAdmin,getMovieById);
// router.route("/:id/update").put(isSuperAuthenticated, updateMovie);
// router.route("/:id/delete").post(isSuperAuthenticated, deleteMovie);
// export default router;
