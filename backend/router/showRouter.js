import express, { Router } from 'express';
import isAuthenticated from '../middlewares/isAuthenticated.js';
import { createShow, getShow, getShowById, updateShow } from '../controllers/showController.js';
import { isUserOrSuperAdmin } from '../middlewares/isUserOrSuperAdmin .js';

const router = express.Router();
router.route("/").get(isUserOrSuperAdmin, getShow);
router.route('/add').post(isAuthenticated, createShow);
router.route("/:id").get(isUserOrSuperAdmin, getShowById);
router.route('/:id/update').put(isAuthenticated, updateShow);

export default router;
