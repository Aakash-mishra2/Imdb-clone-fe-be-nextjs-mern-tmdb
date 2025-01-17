import express from "express";
import {register, login, getProfile} from '../controllers/Authentication.js'

//Middleware to very token and add user id to the req object if the user is valid
import verifyToken from "../middleware/tokenVerify.js";
const router = express.Router();


router.post("/signup", register)
router.post("/login", login)
router.get("/me", verifyToken, getProfile)

export default router;
