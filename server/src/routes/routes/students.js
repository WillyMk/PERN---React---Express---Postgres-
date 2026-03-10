import express from "express";
import { fetchStudents, saveStudents } from "../../controllers/studentController.js";
const router = express.Router();


router.get("/students", fetchStudents);
router.post("/student", saveStudents);

export default router;