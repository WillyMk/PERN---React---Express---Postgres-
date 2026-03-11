import express from "express";
const router = express.Router();
import { fetchStudentMarks, saveMarks } from "../../controllers/marksController.js";
import { authorizeRoles } from "../../middleware/roleBasedMiddleware.js";

router.get("/marks",authorizeRoles("admin", "teacher"), fetchStudentMarks);
router.post("/marks",authorizeRoles("admin", "teacher"), saveMarks);

export default router;