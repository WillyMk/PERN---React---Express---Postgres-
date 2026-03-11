import express from "express";
const router = express.Router();

import { registerUser, login, refreshToken } from "../../controllers/user.js";
import rateLimit from "express-rate-limit";


const loginLimiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 10 minutes
  max: 5, // only 5 login attempts
  message: "Too many login attempts. Try again later."
});

router.post("/register", registerUser);
router.post("/login", loginLimiter,  login);
router.get("/refresh-token", refreshToken)

export default router;