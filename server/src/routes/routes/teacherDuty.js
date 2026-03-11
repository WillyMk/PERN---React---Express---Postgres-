import express from "express";
import {
  fetchTeacherDuties,
  saveTeacherDuty,
} from "../../controllers/teacherDutyController.js";
import { authorizeRoles } from "../../middleware/roleBasedMiddleware.js";

const router = express.Router();

router.get("/teacher/duties",authorizeRoles("admin", "teacher"), saveTeacherDuty);
router.post("/teacher/duty",authorizeRoles("admin"), fetchTeacherDuties);

export default router;
