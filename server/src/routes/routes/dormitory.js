import express from "express";
import { fetchDomitories, saveDormitory } from "../../controllers/domitoryController.js";
import { authorizeRoles } from "../../middleware/roleBasedMiddleware.js";
const router = express.Router();


router.get("/dormitory",authorizeRoles("admin"), fetchDomitories);
router.post("/dormitory",authorizeRoles("admin"), saveDormitory);

export default router;