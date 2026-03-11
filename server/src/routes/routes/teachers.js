import express from "express";
import { fetchTeachers, saveTeacher } from "../../controllers/teacherController.js";
const router = express.Router();


router.get("/teachers",authorizeRoles("admin", "teacher"), fetchTeachers);
router.post("/teacher",authorizeRoles("admin"), saveTeacher);

export default router;