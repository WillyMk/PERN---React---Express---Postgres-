import express from "express";
import userRoutes from "./routes/user.js";
import academicTermRoutes from "./routes/academicTerm.js";
import classroomRoutes from "./routes/classroom.js";
import dormitoryRoutes from "./routes/dormitory.js";
import marksRoutes from "./routes/marks.js";
import studentsRoutes from "./routes/students.js";
import subjectRoutes from "./routes/subject.js";
import teacherDutyRoutes from "./routes/teacherDuty.js";
import teachersRoutes from "./routes/teachers.js";
import { authenticate } from "../middleware/authMiddleware.js";

const router = express.Router();

router.use("/", userRoutes);
router.use(authenticate)
router.use("/", academicTermRoutes);
router.use("/", classroomRoutes);
router.use("/", dormitoryRoutes);
router.use("/", marksRoutes);
router.use("/", studentsRoutes);
router.use("/", subjectRoutes);
router.use("/", teacherDutyRoutes);
router.use("/", teachersRoutes);

export default router;