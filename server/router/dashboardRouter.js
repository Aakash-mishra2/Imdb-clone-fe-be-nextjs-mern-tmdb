import express from "express";
import {getAllTrendingVideos, getRecommendedations, addFavouriteGenres, getAllGenres} from '../controllers/Dashboard.js'

//Middleware to very token and add user id to the req object if the user is valid
import verifyToken from "../middleware/tokenVerify.js";
const router = express.Router();

router.get("/trendings", getAllTrendingVideos)
router.get("/recommended", verifyToken, getRecommendedations)
router.post("/add/genres", verifyToken, addFavouriteGenres)

router.get('/get/genres', verifyToken, getAllGenres);

export default router;