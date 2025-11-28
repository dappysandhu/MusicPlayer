import Playlist from "../models/Playlist.js";
import User from "../models/User.js";
import Song from "../models/Song.js";

// POST /api/playlists
export const createPlaylist = async (req, res) => {
  try {
    const { name, description, isPublic, coverUrl } = req.body;

    const playlist = await Playlist.create({
      name,
      description: description || "",
      isPublic: isPublic ?? false,
      coverUrl: coverUrl || "",
      owner: req.userId, // firebaseUid
      songs: [],
    });

    await User.findOneAndUpdate(
      { firebaseUid: req.userId },
      { $push: { playlists: playlist._id } }
    );

    return res.status(201).json(playlist);
  } catch (err) {
    console.error("createPlaylist error:", err);
    return res.status(500).json({ msg: "Failed to create playlist" });
  }
};

// GET /api/playlists
export const getAllPlaylists = async (req, res) => {
  try {
    const playlists = await Playlist.find()
      .populate("songs", "title artistId coverUrl audioUrl duration")
      .populate("owner", "name email");

    res.json(playlists);
  } catch (err) {
    console.error("Error fetching playlists:", err);
    res.status(500).json({ message: "Failed to fetch playlists" });
  }
};

// GET /api/playlists/:id
export const getPlaylistById = async (req, res) => {
  try {
    const playlist = await Playlist.findById(req.params.id)
      .populate({
        path: "songs",
        populate: [{ path: "artist" }, { path: "album" }],
      })
      .populate("owner");

    if (!playlist) return res.status(404).json({ msg: "Playlist not found" });

    return res.json(playlist);
  } catch (err) {
    console.error("getPlaylistById error:", err);
    return res.status(500).json({ msg: "Failed to fetch playlist" });
  }
};

// GET /api/playlists/me
export const getMyPlaylists = async (req, res) => {
  try {
    const playlists = await Playlist.find({ owner: req.userId }).sort({
      createdAt: -1,
    });
    return res.json(playlists);
  } catch (err) {
    console.error("getMyPlaylists error:", err);
    return res.status(500).json({ msg: "Failed to fetch playlists" });
  }
};

// POST /api/playlists/:id/add
export const addSongToPlaylist = async (req, res) => {
  try {
    const { songId } = req.body;
    const playlist = await Playlist.findById(req.params.id);
    if (!playlist) return res.status(404).json({ msg: "Playlist not found" });

    const song = await Song.findById(songId);
    if (!song) return res.status(404).json({ msg: "Song not found" });

    if (!playlist.songs.some((id) => id.toString() === songId)) {
      playlist.songs.push(song._id);
      await playlist.save();
    }

    return res.json({ msg: "Song added to playlist" });
  } catch (err) {
    console.error("addSongToPlaylist error:", err);
    return res.status(500).json({ msg: "Failed to add song" });
  }
};

// POST /api/playlists/:id/remove
export const removeSongFromPlaylist = async (req, res) => {
  try {
    const { songId } = req.body;

    const playlist = await Playlist.findById(req.params.id);
    if (!playlist) return res.status(404).json({ msg: "Playlist not found" });

    playlist.songs = playlist.songs.filter(
      (id) => id.toString() !== songId
    );
    await playlist.save();

    return res.json({ msg: "Song removed from playlist" });
  } catch (err) {
    console.error("removeSongFromPlaylist error:", err);
    return res.status(500).json({ msg: "Failed to remove song" });
  }
};
