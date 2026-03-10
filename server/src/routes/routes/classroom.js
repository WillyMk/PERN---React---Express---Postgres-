import express from "express";
const router = express.Router();

import { fetchClassRooms, saveClasses } from "../../controllers/classroomController.js";

router.get("/classes", fetchClassRooms);
router.post("/class", saveClasses);

export default router;