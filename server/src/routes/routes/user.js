import express from "express";
const router = express.Router();

import { registerUser, login, refreshToken } from "../../controllers/user.js";

router.post("/register", registerUser);
router.post("/login", login);
router.get("/refresh-token", refreshToken)

export default router;