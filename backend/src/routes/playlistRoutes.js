import express from "express";
import { firebaseAuth } from "../middleware/firebaseAuth.js";
import { ensureUser } from "../middleware/ensureUser.js";

import {
  createPlaylist,
  getPlaylistById,
  getMyPlaylists,
  addSongToPlaylist,
  removeSongFromPlaylist,
} from "../controllers/playlistController.js";

const router = express.Router();

// POST /api/playlists
router.post("/", firebaseAuth, ensureUser, createPlaylist);

// GET /api/playlists/me
router.get("/me", firebaseAuth, ensureUser, getMyPlaylists);

// GET /api/playlists/:id
router.get("/:id", firebaseAuth, ensureUser, getPlaylistById);

// POST /api/playlists/:id/add
router.post("/:id/add", firebaseAuth, ensureUser, addSongToPlaylist);

// POST /api/playlists/:id/remove
router.post("/:id/remove", firebaseAuth, ensureUser, removeSongFromPlaylist);

export default router;
