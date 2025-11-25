import mongoose, { model } from "mongoose";
const { Schema } = mongoose;

const SongSchema = new Schema(
  {
    title: { type: String, required: true, index: true },

    // Relations
    artists: [{ type: Schema.Types.ObjectId, ref: "Artist", index: true }],
    album: { type: Schema.Types.ObjectId, ref: "Album" },

    // External IDs
    spotifyId: { type: String, index: true, unique: true, sparse: true },
    jamendoTrackId: { type: String, index: true, sparse: true },

    // Audio & media
    audioUrl: { type: String },      // mp3 from Jamendo
    previewUrl: { type: String },
    coverUrl: { type: String },      // use album cover if missing

    durationMs: Number,
    explicit: { type: Boolean, default: false },

    genres: [String],                 // computed from artists/album

    audioUrl: String,
    isPlayable: { type: Boolean, default: false },

    spotifyId: String,
    jamendoId: String,


    // Analytics / recs
    popularity: { type: Number, default: 0 },   // from Spotify
    playCount: { type: Number, default: 0 },
    skipCount: { type: Number, default: 0 },
    likeCount: { type: Number, default: 0 },

    releaseYear: Number,

    // audio features (from Spotify)
    audioFeatures: {
      danceability: Number,
      energy: Number,
      valence: Number,
      tempo: Number,
      key: Number,
      mode: Number,
    },
  },
  { timestamps: true }
);

// Simple text index for search
SongSchema.index({ title: "text" });

export default model("Song", SongSchema);
