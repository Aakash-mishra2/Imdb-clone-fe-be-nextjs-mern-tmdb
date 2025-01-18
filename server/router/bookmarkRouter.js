import express from "express";
import { createBookmark, getAllBookmarks, removeBookmark } from '../controllers/Bookmark.js'

import verifyToken from "../middleware/tokenVerify.js";
const router = express.Router();

router.post("/create", verifyToken, createBookmark)
router.get("/get", verifyToken, getAllBookmarks)
router.delete("/delete", removeBookmark)

export default router;