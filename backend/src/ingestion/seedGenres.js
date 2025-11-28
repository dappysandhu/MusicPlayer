import mongoose from "mongoose";
import dotenv from "dotenv";
import Genre from "../models/Genre.js";

dotenv.config();

const genres = [
  {
    name: "Kpop",
    isTop: true,
    color: "#FF6F91",
    image: "https://images.pexels.com/photos/713149/pexels-photo-713149.jpeg"
  },
  {
    name: "Indie",
    isTop: true,
    color: "#845EC2",
    image: "https://images.pexels.com/photos/1652368/pexels-photo-1652368.jpeg"
  },
  {
    name: "R&B",
    isTop: true,
    color: "#0081CF",
    image: "https://images.pexels.com/photos/3944104/pexels-photo-3944104.jpeg"
  },
  {
    name: "Pop",
    isTop: true,
    color: "#FFC75F",
    image: "https://images.pexels.com/photos/1763075/pexels-photo-1763075.jpeg"
  },

  // BROWSE ALL
  {
    name: "Bollywood",
    color: "#D65DB1",
    image: "https://images.pexels.com/photos/11217846/pexels-photo-11217846.jpeg"
  },
  {
    name: "Punjabi",
    color: "#FF9671",
    image: "https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg"
  },
  {
    name: "Hip-Hop",
    color: "#2C73D2",
    image: "https://images.pexels.com/photos/1649771/pexels-photo-1649771.jpeg"
  },
  {
    name: "Lo-Fi",
    color: "#008E9B",
    image: "https://images.pexels.com/photos/713149/pexels-photo-713149.jpeg"
  },
  {
    name: "Rock",
    color: "#C34A36",
    image: "https://images.pexels.com/photos/167636/pexels-photo-167636.jpeg"
  },
  {
    name: "Metal",
    color: "#4D8076",
    image: "https://images.pexels.com/photos/335393/pexels-photo-335393.jpeg"
  },
  {
    name: "EDM",
    color: "#00C9A7",
    image: "https://images.pexels.com/photos/167491/pexels-photo-167491.jpeg"
  }
];

const run = async () => {
  await mongoose.connect(process.env.MONGO_URI);
  console.log("Connected!");

  await Genre.deleteMany({});
  console.log("Wiped old genres!");

  await Genre.insertMany(genres);
  console.log("Inserted new genres!");

  process.exit();
};

run();
