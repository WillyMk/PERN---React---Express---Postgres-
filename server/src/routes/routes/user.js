import express from "express";
const router = express.Router();

import { registerUser, login } from "../../controllers/user.js";

router.post("/register", registerUser);
router.post("/login", login);

export default router;