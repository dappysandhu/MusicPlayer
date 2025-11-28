import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import { connectDB } from "./config/db.js";

import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import songRoutes from "./routes/songRoutes.js";
import artistRoutes from "./routes/artistRoutes.js";
import albumRoutes from "./routes/albumRoutes.js";
import playlistRoutes from "./routes/playlistRoutes.js";
import historyRoutes from "./routes/historyRoutes.js";
import genreRoutes from "./routes/genreRoutes.js";


import { errorHandler } from "./middleware/errorHandler.js";

const app = express();

// connect react naative app 
app.use(
  cors({
    origin: "*", 
    methods: ["GET", "POST", "PATCH", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// JSON parser
app.use(express.json());

// Connect database
connectDB();

// --- API ROUTES ---
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/songs", songRoutes);
app.use("/api/artists", artistRoutes);
app.use("/api/albums", albumRoutes);
app.use("/api/playlists", playlistRoutes);
app.use("/api/history", historyRoutes);
app.use("/api/genres", genreRoutes);


// Health check
app.get("/", (req, res) => {
  res.json({ message: "Musium API is running 🎵" });
});

// 404 Handler
app.use((req, res, next) => {
  res.status(404).json({ error: "Endpoint not found" });
});

// Global Error Handler
app.use(errorHandler);

export default app;
