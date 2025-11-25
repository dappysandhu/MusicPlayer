import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

import mongoose from "mongoose";
import { connectDB } from "../config/db.js";

import Artist from "../models/Artist.js";
import Album from "../models/Album.js";
import Song from "../models/Song.js";

import { getSpotifyToken } from "./spotifyAuth.js";

let accessToken = null;

const spotifyApi = axios.create({
  baseURL: "https://api.spotify.com/v1",
});

const setAuth = (token) => {
  spotifyApi.defaults.headers.common[
    "Authorization"
  ] = `Bearer ${token}`;
};



// fetch artist info
const fetchArtist = async (artistId) => {
  const res = await spotifyApi.get(`/artists/${artistId}`);
  return res.data;
};


// getch artist albums
const fetchArtistAlbums = async (artistId) => {
  const res = await spotifyApi.get(
    `/artists/${artistId}/albums?include_groups=album,single&limit=50`
  );
  return res.data.items;
};



// fetch album tracks
const fetchAlbumTracks = async (albumId) => {
  const res = await spotifyApi.get(`/albums/${albumId}/tracks?limit=50`);
  return res.data.items;
};



// save artist
const saveArtist = async (info) => {
  const found = await Artist.findOne({ spotifyId: info.id });
  if (found) return found;

  const artist = await Artist.create({
    name: info.name,
    imageUrl: info.images?.[0]?.url || "",
    genres: info.genres || [],
    followersCount: info.followers?.total || 0,
    spotifyId: info.id,
  });

  return artist;
};



// save album
const saveAlbum = async (album, artistObj) => {
  const found = await Album.findOne({ spotifyId: album.id });
  if (found) return found;

  const newAlbum = await Album.create({
    title: album.name,
    artist: artistObj._id,
    releaseDate: album.release_date || null,
    coverUrl: album.images?.[0]?.url || "",
    genres: [],              
    spotifyId: album.id,
  });

  return newAlbum;
};

// save tracjs
const saveTracks = async (tracks, albumObj, artistObj) => {
  for (const t of tracks) {
    const exists = await Song.findOne({ spotifyId: t.id });
    if (exists) continue;

    await Song.create({
      title: t.name,
      album: albumObj._id,
      artist: artistObj._id,
      duration: t.duration_ms ? Math.floor(t.duration_ms / 1000) : null,
      genres: artistObj.genres || [],
      coverUrl: albumObj.coverUrl,
      popularity: 0,
      spotifyId: t.id,
    });
  }
};



// main ingestion function
export const ingestSpotifyArtist = async (artistId) => {
  try {
    console.log(`\n🎧 Fetching artist ${artistId}...`);

    const artistInfo = await fetchArtist(artistId);
    const artistObj = await saveArtist(artistInfo);

    console.log(`→ Saved artist: ${artistObj.name}`);

    const albums = await fetchArtistAlbums(artistId);
    console.log(`→ Found ${albums.length} albums`);

    for (const album of albums) {
      const albumObj = await saveAlbum(album, artistObj);

      console.log(`   🎵 Album: ${albumObj.title}`);

      const tracks = await fetchAlbumTracks(album.id);

      await saveTracks(tracks, albumObj, artistObj);
      console.log(`   → Saved ${tracks.length} tracks`);
    }

    console.log(`\n Done importing Spotify artist: ${artistObj.name}`);
  } catch (err) {
    console.error("Ingestion error:", err.response?.data || err.message);
  }
};


// script entry point
const start = async () => {
  await connectDB();

  accessToken = await getSpotifyToken();
  setAuth(accessToken);

  // Example:
  // Billie Eilish → 6qqNVTkY8uBg9cP3Jd7DAH
  // The Weeknd → 1Xyo4u8uXC1ZmMpatF05PJ

  const artistId = process.argv[2];

  if (!artistId) {
    console.error("Pass an artist ID like:");
    console.error("   node spotifyIngest.js 1Xyo4u8uXC1ZmMpatF05PJ");
    process.exit(1);
  }

  await ingestSpotifyArtist(artistId);
  process.exit();
};

start();
