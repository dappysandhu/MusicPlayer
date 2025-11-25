import mongoose, { model } from "mongoose";
const { Schema } = mongoose;

const PlaylistTrackSchema = new Schema(
  {
    song: { type: Schema.Types.ObjectId, ref: "Song", required: true },
    addedBy: { type: Schema.Types.ObjectId, ref: "User" },
    addedAt: { type: Date, default: Date.now },
    position: { type: Number }, // order
  },
  { _id: false }
);

const PlaylistSchema = new Schema(
  {
    owner: { type: Schema.Types.ObjectId, ref: "User", required: true },

    title: { type: String, required: true },
    description: String,
    coverUrl: String,

    isPublic: { type: Boolean, default: false },

    tracks: [PlaylistTrackSchema],

    followersCount: { type: Number, default: 0 }, // how many saved it
  },
  { timestamps: true }
);

export default model("Playlist", PlaylistSchema);
    