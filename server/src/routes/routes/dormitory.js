import express from "express";
import { fetchDomitories, saveDormitory } from "../../controllers/domitoryController.js";
const router = express.Router();


router.get("/dormitory", fetchDomitories);
router.post("/dormitory", saveDormitory);

export default router;