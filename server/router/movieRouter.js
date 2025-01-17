import express from "express";
import {getAllMovies, getSingleMovie} from '../controllers/Movies.js'

//Middleware to very token and add user id to the req object if the user is valid
const router = express.Router();

router.get("/get", getAllMovies)
router.get("/get/:movieId/info", getSingleMovie)

export default router;