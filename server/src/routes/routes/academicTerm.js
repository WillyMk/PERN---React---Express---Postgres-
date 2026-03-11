import express from "express";
import { fetchTerms, saveTerms } from "../../controllers/academicTermController.js";
import { authorizeRoles } from "../../middleware/roleBasedMiddleware.js";
const router = express.Router();


router.get("/terms", authorizeRoles("admin"), fetchTerms);
router.post("/term", authorizeRoles("admin"), saveTerms);

export default router;