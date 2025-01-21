const router = express.Router();
import express from "express";

import { getAllMovies, getSingleMovie, addNewMovie, getMovieDetails } from '../controllers/Movies.js'
import verifyToken from "../middleware/tokenVerify.js";

router.get("/get", verifyToken, getAllMovies);
router.post("/add", verifyToken, addNewMovie);
router.get("/get/:movieId/info/new", getMovieDetails);
router.get("/get/:movieId/info/", getSingleMovie);

export default router;
