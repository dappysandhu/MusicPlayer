import mongoose from "mongoose";
const { Schema, model } = mongoose;

const HistorySchema = new Schema(
  {
    user: { type: String, ref: "User", required: true }, // Firebase UID
    song: { type: Schema.Types.ObjectId, ref: "Song", required: true },
    playedAt: { type: Date, default: Date.now },
    device: String,
    context: String,
  },
  { timestamps: true }
);

export default model("History", HistorySchema);
