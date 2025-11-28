import Artist from "../models/Artist.js";
import Song from "../models/Song.js";
import User from "../models/User.js";

// GET /api/artists
export const getAllArtists = async (req, res) => {
  try {
    const { q, limit = 40, page = 1 } = req.query;

    const filter = {};
    if (q) filter.name = { $regex: q, $options: "i" };

    const artists = await Artist.find(filter)
      .sort({ followersCount: -1 })
      .skip((page - 1) * limit)
      .limit(Number(limit));

    return res.json(artists);
  } catch (err) {
    console.error("getAllArtists error:", err);
    return res.status(500).json({ msg: "Failed to fetch artists" });
  }
};

// GET /api/artists/:id
export const getArtistById = async (req, res) => {
  try {
    const artist = await Artist.findById(req.params.id);
    if (!artist) return res.status(404).json({ msg: "Artist not found" });

    return res.json(artist);
  } catch (err) {
    console.error("getArtistById error:", err);
    return res.status(500).json({ msg: "Failed to fetch artist" });
  }
};

// GET /api/artists/:id/songs
export const getSongsByArtist = async (req, res) => {
  try {
    const songs = await Song.find({ artist: req.params.id }).populate(
      "album artist"
    );
    return res.json(songs);
  } catch (err) {
    console.error("getSongsByArtist error:", err);
    return res.status(500).json({ msg: "Failed to fetch songs" });
  }
};

// POST /api/artists/:id/follow
export const followArtist = async (req, res) => {
  try {
    const user = await User.findOne({ firebaseUid: req.userId });
    if (!user) return res.status(404).json({ msg: "User not found" });

    const artist = await Artist.findById(req.params.id);
    if (!artist) return res.status(404).json({ msg: "Artist not found" });

    if (!user.followedArtists.some((id) => id.toString() === artist.id)) {
      user.followedArtists.push(artist._id);
      await user.save();

      artist.followersCount += 1;
      await artist.save();
    }

    return res.json({ msg: "Artist followed" });
  } catch (err) {
    console.error("followArtist error:", err);
    return res.status(500).json({ msg: "Failed to follow artist" });
  }
};

// POST /api/artists/:id/unfollow
export const unfollowArtist = async (req, res) => {
  try {
    const user = await User.findOne({ firebaseUid: req.userId });
    if (!user) return res.status(404).json({ msg: "User not found" });

    const artist = await Artist.findById(req.params.id);
    if (!artist) return res.status(404).json({ msg: "Artist not found" });

    const before = user.followedArtists.length;
    user.followedArtists = user.followedArtists.filter(
      (id) => id.toString() !== artist.id
    );
    const after = user.followedArtists.length;

    if (after < before && artist.followersCount > 0) {
      artist.followersCount -= 1;
      await artist.save();
    }

    await user.save();

    return res.json({ msg: "Artist unfollowed" });
  } catch (err) {
    console.error("unfollowArtist error:", err);
    return res.status(500).json({ msg: "Failed to unfollow artist" });
  }
};
