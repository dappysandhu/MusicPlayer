import express from "express";
import { firebaseAuth } from "../middleware/firebaseAuth.js";
import { ensureUser } from "../middleware/ensureUser.js";

import { getMe } from "../controllers/authController.js";

const router = express.Router();

// GET /api/auth/me
router.get("/me", firebaseAuth, ensureUser, getMe);

export default router;
