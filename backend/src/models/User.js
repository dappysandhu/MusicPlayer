import mongoose from "mongoose";
const { Schema, model } = mongoose;

const ListeningEntrySchema = new Schema(
  {
    song: { type: Schema.Types.ObjectId, ref: "Song", required: true },
    playedAt: { type: Date, default: Date.now },
    device: String,           // "mobile", "web"
    context: String,          // "playlist:xyz", "album:abc"
  },
  { _id: false }
);

const UserSchema = new Schema(
  {
    // Firebase Authentication UID
    firebaseUid: { type: String, required: true, unique: true },

    // Basic profile
    name: { type: String },
    email: { type: String, index: true, sparse: true },
    avatarUrl: String,

    // Social / Taste Data
    likedSongs: [{ type: Schema.Types.ObjectId, ref: "Song" }],
    likedPlaylists: [{ type: Schema.Types.ObjectId, ref: "Playlist" }],
    likedAlbums: [{ type: Schema.Types.ObjectId, ref: "Album" }],

    followedArtists: [{ type: Schema.Types.ObjectId, ref: "Artist" }],

    // User-created playlists
    playlists: [{ type: Schema.Types.ObjectId, ref: "Playlist" }],

    // Playlists saved but not created by user
    savedPlaylists: [{ type: Schema.Types.ObjectId, ref: "Playlist" }],

    // Listening history
    listeningHistory: [ListeningEntrySchema],

    // Preferences for recommendations
    preferredLanguages: [String],   // e.g., ["en", "hi", "pa"]
    preferredGenres: [String],
  },
  { timestamps: true }
);


export default model("User", UserSchema);
