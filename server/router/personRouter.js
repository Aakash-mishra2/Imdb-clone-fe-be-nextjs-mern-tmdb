import express from "express";
import {getPersonBySearch, getSinglePerson} from '../controllers/Person.js'

const router = express.Router();

router.get("/get", getPersonBySearch)
router.get("/get/:personId", getSinglePerson)


export default router;
