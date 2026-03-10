import express from "express";
import { fetchSubjects, saveSubject } from "../../controllers/subjectController.js";
const router = express.Router();


router.get("/subjects", fetchSubjects);
router.post("/subject", saveSubject);

export default router;