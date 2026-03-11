import express from "express";
import { fetchSubjects, saveSubject } from "../../controllers/subjectController.js";
import { authorizeRoles } from "../../middleware/roleBasedMiddleware.js";
const router = express.Router();


router.get("/subjects",authorizeRoles("admin", "teacher"), fetchSubjects);
router.post("/subject",authorizeRoles("admin"), saveSubject);

export default router;