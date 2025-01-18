import express from "express";
import { getAllMovies, getSingleMovie, addNewMovie, getMovieDetails } from '../controllers/Movies.js'
import verifyToken from "../middleware/tokenVerify.js";

//Middleware to very token and add user id to the req object if the user is valid
const router = express.Router();

router.get("/get", verifyToken, getAllMovies);
router.post("/add", verifyToken, addNewMovie);
router.get("/get/:movieId/info/new", getMovieDetails);
router.get("/get/:movieId/info/", getSingleMovie);

export default router;