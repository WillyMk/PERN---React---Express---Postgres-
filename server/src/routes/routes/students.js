import express from "express";
import { fetchStudents, saveStudents } from "../../controllers/studentController.js";
import { authorizeRoles } from "../../middleware/roleBasedMiddleware.js";
const router = express.Router();


router.get("/students",authorizeRoles("admin", "teacher"), fetchStudents);
router.post("/student",authorizeRoles("admin"), saveStudents);

export default router;