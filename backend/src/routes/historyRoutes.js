import express from "express";
import { firebaseAuth } from "../middleware/firebaseAuth.js";
import { ensureUser } from "../middleware/ensureUser.js";

import { addHistoryEntry } from "../controllers/historyController.js";

const router = express.Router();

// POST /api/history/track-play
router.post("/track-play", firebaseAuth, ensureUser, addHistoryEntry);

export default router;
