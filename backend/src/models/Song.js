import mongoose from "mongoose";
const { Schema, model } = mongoose;

const SongSchema = new Schema(
  {
    title: { type: String, required: true },

    artists: [{ type: Schema.Types.ObjectId, ref: "Artist" }],
    album: { type: Schema.Types.ObjectId, ref: "Album" },

    spotifyId: { type: String, index: true, sparse: true },
    jamendoTrackId: { type: String, index: true, sparse: true },

    coverUrl: String,
    audioUrl: String,
    previewUrl: String,

    durationMs: Number,
    explicit: { type: Boolean, default: false },

    genres: [String],

    popularity: Number,
    playCount: Number,

    releaseYear: Number,

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

export default model("Song", SongSchema);
