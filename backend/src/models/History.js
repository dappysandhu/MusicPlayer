import mongoose from "mongoose";
const { Schema, model } = mongoose;

const HistorySchema = new Schema(
  {
    // Link to User document (_id), not just raw Firebase UID
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    song: { type: Schema.Types.ObjectId, ref: "Song", required: true },
    playedAt: { type: Date, default: Date.now },
    device: String,
    context: String,
  },
  { timestamps: true }
);

export default model("History", HistorySchema);
