import User from "../models/User.js";
import Song from "../models/Song.js";
import Artist from "../models/Artist.js";
import History from "../models/History.js";

// GET /api/users/me
export const getCurrentUser = async (req, res) => {
  try {
    const user = await User.findOne({ firebaseUid: req.userId })
      .populate({
        path: "likedSongs",
        populate: [{ path: "artists" }, { path: "album" }],
      })
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
    const updates = req.body;

    const user = await User.findOneAndUpdate(
      { firebaseUid: req.userId },
      updates,
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
      populate: [{ path: "artists" }, { path: "album" }],
    });

    return res.json(user?.likedSongs || []);
  } catch (err) {
    console.error("getLikedSongs error:", err);
    return res.status(500).json({ msg: "Failed to fetch liked songs" });
  }
};

// GET /api/users/me/followed-artists
export const getFollowedArtists = async (req, res) => {
  try {
    const user = await User.findOne({ firebaseUid: req.userId })
      .populate("followedArtists");

    return res.json(user?.followedArtists || []);
  } catch (err) {
    console.error("getFollowedArtists error:", err);
    return res.status(500).json({ msg: "failed to fetch artists" });
  }
};

// GET /api/users/me/liked-albums
export const getLikedAlbums = async (req, res) => {
  try {
    const user = await User.findOne({ firebaseUid: req.userId })
      .populate("likedAlbums");

    return res.json(user?.likedAlbums || []);
  } catch (err) {
    console.error("getLikedAlbums error:", err);
    return res.status(500).json({ msg: "Failed to fetch liked albums" });
  }
};

// GET /api/users/me/history
export const getListeningHistory = async (req, res) => {
  try {
    const user = await User.findOne({ firebaseUid: req.userId }).populate({
      path: "listeningHistory.song",
      populate: [{ path: "artists" }, { path: "album" }],
    });

    const history =
      user?.listeningHistory?.sort((a, b) => b.playedAt - a.playedAt) || [];

    return res.json(history);
  } catch (err) {
    console.error("getListeningHistory error:", err);
    return res.status(500).json({ msg: "Failed to fetch history" });
  }
};
