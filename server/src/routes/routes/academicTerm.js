import express from "express";
import { fetchTerms, saveTerms } from "../../controllers/academicTermController.js";
const router = express.Router();


router.get("/terms", fetchTerms);
router.post("/term", saveTerms);

export default router;