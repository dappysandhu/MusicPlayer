const CLIENT_ID = "ec17c113";

export async function fetchTracks(limit = 50) {
  try {
    const url =
      "https://api.jamendo.com/v3.0/tracks/?" +
      "client_id=" + CLIENT_ID +
      "&format=json" +
      "&limit=" + limit +
      "&audioformat=mp31" +
      "&include=musicinfo" +
      "&order=popularity_total" +
      "&tags=pop,hiphop";  

    const res = await fetch(url);
    const json = await res.json();

    console.log("JAMENDO RAW RESULTS:", json);

    if (!json.results || json.results.length === 0) {
      console.log("Jamendo returned EMPTY results");
      return [];
    }

    // Random shuffle
    const shuffled = json.results.sort(() => Math.random() - 0.5);

    return shuffled.map((item: any) => ({
      id: item.id,
      title: item.name,
      artist: item.artist_name,
      cover: item.image || item.album_image,
      audioUrl: item.audio,
      album: {
        name: item.album_name || "",
        coverUrl: item.album_image || item.image,
      },
      duration: item.duration,
    }));
  } catch (err) {
    console.log("Jamendo fetch error:", err);
    return [];
  }
}
