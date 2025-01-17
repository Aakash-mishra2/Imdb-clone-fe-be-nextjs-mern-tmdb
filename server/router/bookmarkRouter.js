import express from "express";
import {createBookmark, getAllBookmarks, removeBookmark} from '../controllers/Bookmark.js'

//Middleware to very token and add user id to the req object if the user is valid
import verifyToken from "../middleware/tokenVerify.js";
const router = express.Router();

router.post("/create", verifyToken, createBookmark)
router.get("/get", verifyToken, getAllBookmarks)
router.delete("/delete", removeBookmark)

export default router;