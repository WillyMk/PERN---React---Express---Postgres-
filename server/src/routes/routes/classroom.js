import express from "express";
const router = express.Router();

import { fetchClassRooms, saveClasses } from "../../controllers/classroomController.js";
import { authorizeRoles } from "../../middleware/roleBasedMiddleware.js";

router.get("/classes", authorizeRoles("admin", "teacher"), fetchClassRooms);
router.post("/class",authorizeRoles("admin", "teacher"), saveClasses);

export default router;