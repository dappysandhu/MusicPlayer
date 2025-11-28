import express from "express";
import { firebaseAuth } from "../middleware/firebaseAuth.js";
import { ensureUser } from "../middleware/ensureUser.js";

import {
  getAllSongs,
  getSongById,
  likeSong,
  unlikeSong,
  recommendSongs,
} from "../controllers/songController.js";

const router = express.Router();

// GET /api/songs
router.get("/", getAllSongs);

// GET /api/songs/:id
router.get("/:id", getSongById);

// POST /api/songs/:id/like
router.post("/:id/like", firebaseAuth, ensureUser, likeSong);

// POST /api/songs/:id/unlike
router.post("/:id/unlike", firebaseAuth, ensureUser, unlikeSong);

// GET /api/songs/recommend
router.get("/recommend/me", firebaseAuth, ensureUser, recommendSongs);

export default router;
