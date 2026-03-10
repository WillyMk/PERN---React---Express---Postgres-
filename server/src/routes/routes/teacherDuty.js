import express from "express";
import {
  fetchTeacherDuties,
  saveTeacherDuty,
} from "../../controllers/teacherDutyController.js";

const router = express.Router();

router.get("/teacher/duties", saveTeacherDuty);
router.post("/teacher/duty", fetchTeacherDuties);

export default router;
