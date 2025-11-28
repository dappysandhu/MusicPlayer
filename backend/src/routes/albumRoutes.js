import express from "express";

import {
  getAllAlbums,
  getAlbumById,
  getSongsByAlbum,
} from "../controllers/albumController.js";

const router = express.Router();

// GET /api/albums
router.get("/", getAllAlbums);

// GET /api/albums/:id
router.get("/:id", getAlbumById);

// GET /api/albums/:id/songs
router.get("/:id/songs", getSongsByAlbum);

export default router;
