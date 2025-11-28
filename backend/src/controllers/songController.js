import Song from "../models/Song.js";
import User from "../models/User.js";

// GET /api/songs
export const getAllSongs = async (req, res) => {
  try {
    const { limit = 50, page = 1, genre, q } = req.query;

    const filter = {};
    if (genre) filter.genres = genre;
    if (q) filter.title = { $regex: q, $options: "i" };

    const songs = await Song.find(filter)
      .populate("artists")  // FIXED
      .populate("album")    // FIXED
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(Number(limit));

    return res.json(songs);
  } catch (err) {
    console.error("getAllSongs error:", err);
    return res.status(500).json({ msg: "Failed to fetch songs" });
  }
};

// GET /api/songs/:id
export const getSongById = async (req, res) => {
  try {
    const song = await Song.findById(req.params.id)
      .populate("artists")
      .populate("album");

    if (!song) return res.status(404).json({ msg: "Song not found" });

    return res.json(song);
  } catch (err) {
    console.error("getSongById error:", err);
    return res.status(500).json({ msg: "Failed to fetch song" });
  }
};

// POST /api/songs/:id/like
export const likeSong = async (req, res) => {
  try {
    const user = await User.findOne({ firebaseUid: req.userId });
    if (!user) return res.status(404).json({ msg: "User not found" });

    const songId = req.params.id;

    if (!user.likedSongs.includes(songId)) {
      user.likedSongs.push(songId);
      await user.save();
    }

    res.json({ msg: "Song liked" });
  } catch (err) {
    console.error("likeSong error:", err);
    res.status(500).json({ msg: "Failed to like song" });
  }
};

// POST /api/songs/:id/unlike
export const unlikeSong = async (req, res) => {
  try {
    const user = await User.findOne({ firebaseUid: req.userId });
    if (!user) return res.status(404).json({ msg: "User not found" });

    user.likedSongs = user.likedSongs.filter(
      (id) => id.toString() !== req.params.id
    );
    await user.save();

    res.json({ msg: "Song unliked" });
  } catch (err) {
    console.error("unlikeSong error:", err);
    res.status(500).json({ msg: "Failed to unlike song" });
  }
};

// GET /api/songs/recommend/me
export const recommendSongs = async (req, res) => {
  try {
    const user = await User.findOne({ firebaseUid: req.userId })
      .populate({
        path: "likedSongs",
        populate: [{ path: "artists" }, { path: "album" }],
      });

    if (!user) return res.status(404).json({ msg: "User not found" });

    const liked = user.likedSongs;

    if (!liked.length) {
      const fallback = await Song.find({})
        .sort({ popularity: -1 })
        .limit(20)
        .populate("artists")
        .populate("album");
      return res.json(fallback);
    }

    const likedGenres = liked.flatMap((s) => s.genres);
    const topGenres = [...new Set(likedGenres)].slice(0, 5);

    const recommended = await Song.find({
      genres: { $in: topGenres },
      _id: { $nin: liked.map((s) => s._id) },
    })
      .sort({ popularity: -1 })
      .limit(30)
      .populate("artists")
      .populate("album");

    return res.json(recommended);

  } catch (err) {
    console.error("recommendSongs error:", err);
    res.status(500).json({ msg: "Failed to fetch recommendations" });
  }
};
