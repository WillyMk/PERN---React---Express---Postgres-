import express from "express";
const router = express.Router();
import { fetchStudentMarks, saveMarks } from "../../controllers/marksController.js";

router.get("/marks", fetchStudentMarks);
router.post("/marks", saveMarks);

export default router;