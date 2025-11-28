import mongoose, { model } from "mongoose";
const { Schema } = mongoose;

const AlbumSchema = new Schema(
  {
    title: { type: String, required: true },
    artist: { type: Schema.Types.ObjectId, ref: "Artist", required: true },

    spotifyId: { type: String, index: true, unique: true, sparse: true },

    coverUrl: String,
    releaseYear: Number,
    totalTracks: Number,

    //denormalized tracks list
    tracks: [{ type: Schema.Types.ObjectId, ref: "Song" }],
  },
  { timestamps: true }
);

export default model("Album", AlbumSchema);
