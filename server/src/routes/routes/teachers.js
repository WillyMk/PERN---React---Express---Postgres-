import express from "express";
import { fetchTeachers, saveTeacher } from "../../controllers/teacherController.js";
const router = express.Router();


router.get("/teachers", fetchTeachers);
router.post("/teacher", saveTeacher);

export default router;