import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

import mongoose from "mongoose";
import { connectDB } from "../config/db.js";

import Song from "../models/Song.js";
import Artist from "../models/Artist.js";
import Album from "../models/Album.js";


// Jamendo API setup
const jamendoApi = axios.create({
  baseURL: "https://api.jamendo.com/v3.0",
  params: {
    client_id: process.env.JAMENDO_CLIENT_ID,
    format: "json",
  },
});


// fetch tracks from Jamendo
const fetchJamendoTracks = async (limit = 200) => {
  const res = await jamendoApi.get("/tracks", {
    params: {
      limit,
      include: "musicinfo+lyrics+stats",
      audioformat: "mp32", // mp3 playback
    },
  });

  return res.data.results;
};


// save artist
const saveArtist = async (name, image) => {
  let artist = await Artist.findOne({ name });

  if (artist) return artist;

  artist = await Artist.create({
    name,
    imageUrl: image || "",
    genres: [],
    followersCount: 0,
    jamendoId: null,
  });

  return artist;
};



const saveAlbum = async (track) => {
  const title = track.album_name || "Unknown Album";
  const artistName = track.artist_name;

  // Ensure artist first
  const artist = await saveArtist(artistName, track.album_image || null);

  let album = await Album.findOne({
    title,
    artist: artist._id,
  });

  if (album) return { album, artist };

  album = await Album.create({
    title,
    artist: artist._id,
    coverUrl: track.album_image,
    genres: track.musicinfo?.tags?.genres || [],
    releaseDate: null,
    jamendoId: track.album_id,
  });

  return { album, artist };
};



const saveSong = async (track, album, artist) => {
  const found = await Song.findOne({
    jamendoId: track.id,
  });

  if (found) return found;

  const song = await Song.create({
    title: track.name,
    artist: artist._id,
    album: album._id,
    duration: track.duration,
    genres: track.musicinfo?.tags?.genres || [],
    audioUrl: track.audio,  // real mp3 url
    coverUrl: track.album_image,
    popularity: track.stats?.rank || 0,
    jamendoId: track.id,
  });

  return song;
};



export const ingestJamendo = async () => {
  try {
    console.log("\n Fetching Jamendo tracks...");

    const tracks = await fetchJamendoTracks(200);

    console.log(`→ Found ${tracks.length} tracks`);

    for (const t of tracks) {
      const { album, artist } = await saveAlbum(t);
      await saveSong(t, album, artist);

      console.log(`Saved: ${t.name}`);
    }

    console.log("Jamendo ingestion completed.");
  } catch (err) {
    console.error("Jamendo ingestion error:", err.response?.data || err.message);
  }
};



const start = async () => {
  await connectDB();
  await ingestJamendo();
  process.exit(0);
};

start();
