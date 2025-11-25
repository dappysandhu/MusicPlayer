import mongoose, { model } from "mongoose";
const { Schema } = mongoose;

const ArtistSchema = new Schema(
  {
    name: { type: String, required: true, index: true },

    spotifyId: { type: String, index: true, unique: true, sparse: true },
    jamendoArtistId: { type: String, index: true, sparse: true },

    images: [String],          // urls
    genres: [String],          // ["pop", "indie", "punjabi pop"]

    followersCount: {
      type: Number,
      default: 0,   
    },

    popularity: {
      type: Number,          
      default: 0,
    },
  },
  { timestamps: true }
);

export default model("Artist", ArtistSchema);
