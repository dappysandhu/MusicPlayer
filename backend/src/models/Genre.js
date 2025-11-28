import mongoose from "mongoose";
const { Schema } = mongoose;

const GenreSchema = new Schema(
  {
    name: { type: String, required: true, unique: true },
    image: { type: String },
    color: { type: String },  
    isTop: { type: Boolean, default: false }
  },
  { timestamps: true }
);

export default mongoose.model("Genre", GenreSchema);
