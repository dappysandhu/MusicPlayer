import Genre from "../models/Genre.js";

// GET /api/genres/top
export const getTopGenres = async (req, res) => {
  try {
    const genres = await Genre.find({ isTop: true }).limit(10);
    res.json(genres);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch top genres" });
  }
};

// GET /api/genres/all
export const getAllGenres = async (req, res) => {
  try {
    const genres = await Genre.find().sort({ name: 1 });
    res.json(genres);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch genres" });
  }
};

// POST /api/genres (admin only, for adding new genres)
export const createGenre = async (req, res) => {
  try {
    const genre = await Genre.create(req.body);
    res.json(genre);
  } catch (err) {
    res.status(500).json({ error: "Failed to create genre" });
  }
};
