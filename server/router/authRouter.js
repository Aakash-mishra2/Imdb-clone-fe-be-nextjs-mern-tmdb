import express from "express";
import { register, login, getProfile } from '../controllers/Authentication.js'

import verifyToken from "../middleware/tokenVerify.js";
const router = express.Router();


router.post("/signup", register)
router.post("/login", login)
router.get("/me", verifyToken, getProfile)

export default router;
