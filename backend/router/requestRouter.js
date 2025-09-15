import express from 'express'
import { getAllRequest, getRequestById, sendRequest, updateRequest } from '../controllers/RequestController.js';
import isAuthenticated from '../middlewares/isAuthenticated.js';
import { isSuperAuthenticated } from '../middlewares/isSuperAuthenticated.js';
import { uploadTheater } from '../middlewares/multer.js';

const router = express.Router();
router.route("/send").post(isAuthenticated,uploadTheater, sendRequest);
router.route("/get").get(isSuperAuthenticated, getAllRequest);
router.route("/:id").get(isSuperAuthenticated, getRequestById);
router.route("/:id/update").put(isSuperAuthenticated, updateRequest);

export default router;
