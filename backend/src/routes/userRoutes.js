import express from "express";
import { firebaseAuth } from "../middleware/firebaseAuth.js";
import { ensureUser } from "../middleware/ensureUser.js";

import {
  getCurrentUser,
  updateProfile,
  getLikedSongs,
  getFollowedArtists,
  getListeningHistory,
} from "../controllers/userController.js";

const router = express.Router();

// GET /api/users/me
router.get("/me", firebaseAuth, ensureUser, getCurrentUser);

// PATCH /api/users/me
router.patch("/me", firebaseAuth, ensureUser, updateProfile);

// GET /api/users/me/liked-songs
router.get("/me/liked-songs", firebaseAuth, ensureUser, getLikedSongs);

// GET /api/users/me/followed-artists
router.get("/me/followed-artists", firebaseAuth, ensureUser, getFollowedArtists);

// GET /api/users/me/history
router.get("/me/history", firebaseAuth, ensureUser, getListeningHistory);

export default router;
