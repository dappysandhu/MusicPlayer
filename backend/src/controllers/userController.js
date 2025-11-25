import User from "../models/User.js";
import Song from "../models/Song.js";
import Artist from "../models/Artist.js";
import History from "../models/History.js";

// GET /api/users/me
export const getCurrentUser = async (req, res) => {
  try {
    const user = await User.findOne({ firebaseUid: req.userId })
      .populate("likedSongs")
      .populate("likedPlaylists")
      .populate("likedAlbums")
      .populate("followedArtists");

    if (!user) return res.status(404).json({ msg: "User not found" });

    return res.json(user);
  } catch (err) {
    console.error("getCurrentUser error:", err);
    return res.status(500).json({ msg: "Failed to fetch user" });
  }
};

// PATCH /api/users/me
export const updateProfile = async (req, res) => {
  try {
    const { name, avatarUrl, preferredLanguages, preferredGenres } = req.body;

    const user = await User.findOneAndUpdate(
      { firebaseUid: req.userId },
      {
        ...(name && { name }),
        ...(avatarUrl && { avatarUrl }),
        ...(preferredLanguages && { preferredLanguages }),
        ...(preferredGenres && { preferredGenres }),
      },
      { new: true }
    );

    if (!user) return res.status(404).json({ msg: "User not found" });

    return res.json(user);
  } catch (err) {
    console.error("updateProfile error:", err);
    return res.status(500).json({ msg: "Failed to update profile" });
  }
};

// GET /api/users/me/liked-songs
export const getLikedSongs = async (req, res) => {
  try {
    const user = await User.findOne({ firebaseUid: req.userId }).populate({
      path: "likedSongs",
      populate: [{ path: "artist" }, { path: "album" }],
    });

    if (!user) return res.status(404).json({ msg: "User not found" });

    return res.json(user.likedSongs || []);
  } catch (err) {
    console.error("getLikedSongs error:", err);
    return res.status(500).json({ msg: "Failed to fetch liked songs" });
  }
};

// GET /api/users/me/followed-artists
export const getFollowedArtists = async (req, res) => {
  try {
    const user = await User.findOne({ firebaseUid: req.userId }).populate(
      "followedArtists"
    );

    if (!user) return res.status(404).json({ msg: "User not found" });

    return res.json(user.followedArtists || []);
  } catch (err) {
    console.error("getFollowedArtists error:", err);
    return res.status(500).json({ msg: "Failed to fetch artists" });
  }
};

// GET /api/users/me/history
export const getListeningHistory = async (req, res) => {
  try {
    const user = await User.findOne({ firebaseUid: req.userId }).populate({
      path: "listeningHistory.song",
      populate: [{ path: "artist" }, { path: "album" }],
    });

    if (!user) return res.status(404).json({ msg: "User not found" });

    // sort by playedAt desc
    const history = [...(user.listeningHistory || [])].sort(
      (a, b) => b.playedAt - a.playedAt
    );

    return res.json(history);
  } catch (err) {
    console.error("getListeningHistory error:", err);
    return res.status(500).json({ msg: "Failed to fetch history" });
  }
};
