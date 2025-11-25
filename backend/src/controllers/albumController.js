import Album from "../models/Album.js";
import Song from "../models/Song.js";

// GET /api/albums
export const getAllAlbums = async (req, res) => {
  try {
    const { q, limit = 40, page = 1 } = req.query;

    const filter = {};
    if (q) filter.title = { $regex: q, $options: "i" };

    const albums = await Album.find(filter)
      .populate("artist")
      .sort({ releaseDate: -1 })
      .skip((page - 1) * limit)
      .limit(Number(limit));

    return res.json(albums);
  } catch (err) {
    console.error("getAllAlbums error:", err);
    return res.status(500).json({ msg: "Failed to fetch albums" });
  }
};

// GET /api/albums/:id
export const getAlbumById = async (req, res) => {
  try {
    const album = await Album.findById(req.params.id).populate("artist");
    if (!album) return res.status(404).json({ msg: "Album not found" });

    return res.json(album);
  } catch (err) {
    console.error("getAlbumById error:", err);
    return res.status(500).json({ msg: "Failed to fetch album" });
  }
};

// GET /api/albums/:id/songs
export const getSongsByAlbum = async (req, res) => {
  try {
    const songs = await Song.find({ album: req.params.id }).populate(
      "artist album"
    );
    return res.json(songs);
  } catch (err) {
    console.error("getSongsByAlbum error:", err);
    return res.status(500).json({ msg: "Failed to fetch songs" });
  }
};
