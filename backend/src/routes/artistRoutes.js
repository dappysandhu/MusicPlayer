import express from "express";
import { firebaseAuth } from "../middleware/firebaseAuth.js";
import { ensureUser } from "../middleware/ensureUser.js";

import {
  getAllArtists,
  getArtistById,
  getSongsByArtist,
  followArtist,
  unfollowArtist,
} from "../controllers/artistController.js";

const router = express.Router();

// GET /api/artists
router.get("/", getAllArtists);

// GET /api/artists/:id
router.get("/:id", getArtistById);

// GET /api/artists/:id/songs
router.get("/:id/songs", getSongsByArtist);

// POST /api/artists/:id/follow
router.post("/:id/follow", firebaseAuth, ensureUser, followArtist);

// POST /api/artists/:id/unfollow
router.post("/:id/unfollow", firebaseAuth, ensureUser, unfollowArtist);

export default router;
