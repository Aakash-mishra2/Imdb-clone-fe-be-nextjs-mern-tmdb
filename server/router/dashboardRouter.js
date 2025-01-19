import express from "express";
const router = express.Router();

import { getAllTrendingVideos, getRecommendedations, addFavouriteGenres, getAllGenres } from '../controllers/Dashboard.js'
import verifyToken from "../middleware/tokenVerify.js";

router.get("/trendings", getAllTrendingVideos)
router.get("/recommended", verifyToken, getRecommendedations)
router.post("/add/genres", verifyToken, addFavouriteGenres);

router.get('/get/genres', verifyToken, getAllGenres);

export default router;