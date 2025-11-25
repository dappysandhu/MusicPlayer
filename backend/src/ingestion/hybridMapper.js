import Song from "../models/Song.js";
import Artist from "../models/Artist.js";
import Album from "../models/Album.js";

// string cleaning
const clean = (s = "") =>
  s
    .toLowerCase()
    .replace(/\(.*?\)/g, "")     // remove "(cover)" or "(remix)"
    .replace(/[^a-z0-9 ]/g, "")  // remove symbols
    .trim();


// similarity score between two strings
const similarity = (a, b) => {
  const A = clean(a).split(" ");
  const B = clean(b).split(" ");

  let matches = 0;

  A.forEach((word) => {
    if (B.includes(word)) matches++;
  });

  return matches / Math.max(A.length, B.length);
};



export const mergeJamendoIntoSpotify = async () => {
  console.log("\n🔄 Hybrid Merge Started...");

  const jamendoSongs = await Song.find({
    jamendoId: { $exists: true },
  });

  const spotifySongs = await Song.find({
    spotifyId: { $exists: true },
  }).populate("artist");

  let attached = 0;

  for (const jam of jamendoSongs) {
    const jTitle = clean(jam.title);

    // find a Spotify match
    const match = spotifySongs.find((sp) => {
      const score = similarity(sp.title, jam.title);
      return score >= 0.6; // threshold
    });

    if (!match) continue;

    console.log(
      `🎵 Match Found: ${match.title}  <=  ${jam.title}`
    );

    // attach audio
    match.audioUrl = jam.audioUrl;
    match.isPlayable = true;
    await match.save();

    attached++;
  }

  console.log(`\n Hybrid Merge Complete`);
  console.log(`Audio attached to ${attached} Spotify tracks`);
};
