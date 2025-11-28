import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

import Artist from "./models/Artist.js";
import Album from "./models/Album.js";
import Song from "./models/Song.js";
import Genre from "./models/Genre.js";
import Playlist from "./models/Playlist.js";

console.log("Musium Seeder Starting…");

const placeholderCovers = [
  "https://images.pexels.com/photos/1649771/pexels-photo-1649771.jpeg",
  "https://images.pexels.com/photos/713498/pexels-photo-713498.jpeg",
  "https://images.pexels.com/photos/365684/pexels-photo-365684.jpeg",
  "https://images.pexels.com/photos/167092/pexels-photo-167092.jpeg",
  "https://images.pexels.com/photos/373945/pexels-photo-373945.jpeg",
];

const placeholderArtists = [
  "https://images.pexels.com/photos/3779115/pexels-photo-3779115.jpeg",
  "https://images.pexels.com/photos/167446/pexels-photo-167446.jpeg",
  "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e",
  "https://images.unsplash.com/photo-1504805572947-34fad45aed93",
];

async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB Connected");
  } catch (err) {
    console.error("DB Connection Failed:", err);
    process.exit(1);
  }
}

// -----------------------------
// 1 — GENRES
// -----------------------------
const genresData = [
  "Pop",
  "R&B",
  "Hip-Hop",
  "K-Pop",
  "Indie",
  "Alternative",
  "Punjabi Pop",
  "Bollywood",
  "Dance/Electronic",
  "Lo-Fi",
  "Chill",
  "Acoustic",
  "Rap",
  "Soul",
  "Trap"
].map(g => ({ name: g }));

// -----------------------------
// 2 — ARTISTS
// -----------------------------
const artistsData = [
  { name: "The Weeknd", genres: ["Pop", "R&B"], images: [] },
  { name: "Ariana Grande", genres: ["Pop", "R&B"], images: [] },
  { name: "SZA", genres: ["R&B", "Soul"], images: [] },
  { name: "BLACKPINK", genres: ["K-Pop"], images: [] },
  { name: "Doja Cat", genres: ["Pop", "Rap"], images: [] },
  { name: "Dua Lipa", genres: ["Pop", "Dance/Electronic"], images: [] },
  { name: "Billie Eilish", genres: ["Indie", "Alternative"], images: [] },
  { name: "Conan Gray", genres: ["Indie", "Pop"], images: [] },
  { name: "Joji", genres: ["Lo-Fi", "Indie"], images: [] },
  { name: "Taylor Swift", genres: ["Pop"], images: [] },
  { name: "Drake", genres: ["Hip-Hop"], images: [] },
  { name: "Post Malone", genres: ["Hip-Hop", "Pop"], images: [] },
  { name: "Justin Bieber", genres: ["Pop"], images: [] },
  { name: "Travis Scott", genres: ["Hip-Hop", "Trap"], images: [] },
  { name: "KALI", genres: ["Indie"], images: [] },
  { name: "The Kid LAROI", genres: ["Pop"], images: [] },
  { name: "Ed Sheeran", genres: ["Acoustic", "Pop"], images: [] },
  { name: "LANY", genres: ["Indie"], images: [] },
  { name: "LISA", genres: ["K-Pop"], images: [] },
  { name: "Sia", genres: ["Pop"], images: [] }
];

// -----------------------------
// 3 — ALBUMS (15 realistic ones)
// -----------------------------
const albumsData = [
  { title: "After Hours", artist: "The Weeknd", coverUrl: "", releaseYear: 2020 },
  { title: "Dawn FM", artist: "The Weeknd", coverUrl: "", releaseYear: 2022 },
  { title: "Positions", artist: "Ariana Grande", coverUrl: "", releaseYear: 2020 },
  { title: "Ctrl", artist: "SZA", releaseYear: 2017 },
  { title: "SOS", artist: "SZA", releaseYear: 2022 },
  { title: "Planet Her", artist: "Doja Cat", releaseYear: 2021 },
  { title: "Future Nostalgia", artist: "Dua Lipa", releaseYear: 2020 },
  { title: "Born Pink", artist: "BLACKPINK", releaseYear: 2022 },
  { title: "Manic", artist: "Halsey", releaseYear: 2020 },
  { title: "Superache", artist: "Conan Gray", releaseYear: 2022 },
  { title: "Eternal Sunshine", artist: "Ariana Grande", releaseYear: 2024 },
  { title: "WHEN WE ALL FALL ASLEEP", artist: "Billie Eilish", releaseYear: 2019 },
  { title: "Beerbongs & Bentleys", artist: "Post Malone", releaseYear: 2018 },
  { title: "Take Care", artist: "Drake", releaseYear: 2011 },
  { title: "Justice", artist: "Justin Bieber", releaseYear: 2021 }
];

// -----------------------------
// 4 — SONGS (auto-generated per album)
// -----------------------------
const albumTracks = {
  "After Hours": ["Blinding Lights", "Save Your Tears", "In Your Eyes", "Too Late"],
  "Dawn FM": ["Take My Breath", "Gasoline", "Out of Time"],
  "Positions": ["Positions", "34+35", "POV"],
  "Ctrl": ["Love Galore", "The Weekend", "Broken Clocks"],
  "SOS": ["Kill Bill", "Nobody Gets Me", "Low"],
  "Planet Her": ["Woman", "Get Into It", "Need To Know"],
  "Future Nostalgia": ["Levitating", "Hallucinate", "Break My Heart"],
  "Born Pink": ["Pink Venom", "Shut Down", "Yeah Yeah Yeah"],
  "Manic": ["Without Me", "Graveyard", "3AM"],
  "Superache": ["Memories", "People Watching", "Telepath"],
  "Eternal Sunshine": ["Yes, And?", "Don't Wanna Break Up Again"],
  "WHEN WE ALL FALL ASLEEP": ["Bad Guy", "Bury A Friend", "When The Party's Over"],
  "Beerbongs & Bentleys": ["Rockstar", "Psycho", "Better Now"],
  "Take Care": ["Marvins Room", "Headlines", "Crew Love"],
  "Justice": ["Peaches", "Anyone", "Ghost"]
};

// -----------------------------
// 5 — PLAYLISTS (10)
// -----------------------------
const playlistsData = [
  { title: "Today's Top Hits" },
  { title: "Mood Booster" },
  { title: "Chill Vibes" },
  { title: "Lo-Fi Drive" },
  { title: "Punjabi Vibes" },
  { title: "K-Pop Mix" },
  { title: "Late Night R&B" },
  { title: "Pop Essentials" },
  { title: "Workout Hits" },
  { title: "Trending Now" }
];

// --------------------------------------------
// SEED EXECUTION
// --------------------------------------------
async function seed() {
  await connectDB();

  console.log("Clearing old data…");
  await Genre.deleteMany({});
  await Artist.deleteMany({});
  await Album.deleteMany({});
  await Song.deleteMany({});
  await Playlist.deleteMany({});

  console.log("Inserting Genres");
  const genres = await Genre.insertMany(genresData);

  console.log("Inserting Artists");
  const artists = await Artist.insertMany(artistsData);

  // map: artistName → artistDoc
  const artistMap = {};
  artists.forEach(a => (artistMap[a.name] = a));

  console.log("Inserting Albums");
  const albumDocs = [];
  for (let alb of albumsData) {
    const artistDoc = artistMap[alb.artist];
    if (!artistDoc) continue;

    const newAlbum = await Album.create({
      ...alb,
      artist: artistDoc._id,
      tracks: []
    });

    albumDocs.push(newAlbum);
  }

  console.log("Creating Songs");
  const songDocs = [];

  for (let album of albumDocs) {
    const trackNames = albumTracks[album.title] || [];

    for (let t of trackNames) {
      const s = await Song.create({
        title: t,
        artists: [album.artist],
        album: album._id,
        coverUrl: album.coverUrl,
        durationMs: 180000,
        isPlayable: true,
        genres: artistMap[album.artist.name]?.genres || []
      });

      album.tracks.push(s._id);
      songDocs.push(s);
    }

    await album.save();
  }

  console.log("Creating Playlists");
  for (let p of playlistsData) {
    await Playlist.create({
      title: p.title,
      owner: artists[0]._id, // fake owner
      tracks: songDocs.slice(0, 8).map(s => ({
        song: s._id,
        addedBy: artists[0]._id
      }))
    });
  }

  console.log("SEEDING COMPLETE!");
  process.exit(0);
}

seed();
