import express from "express";
import { getTopGenres, getAllGenres, createGenre } from "../controllers/genreController.js";

const router = express.Router();

// GET /api/genres/top
router.get("/top", getTopGenres);

// GET /api/genres
router.get("/", getAllGenres);

// POST /api/genres
router.post("/", createGenre);

export default router;
