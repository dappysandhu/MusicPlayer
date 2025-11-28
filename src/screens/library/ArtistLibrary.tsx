import React, { useEffect, useState } from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import api from "../../services/api";

export default function ArtistLibrary() {
  const [artists, setArtists] = useState([]);

  useEffect(() => {
    loadArtists();
  }, []);

  const loadArtists = async () => {
    try {
      const res = await api.get("/users/me/followed-artists");
      setArtists(res.data);
    } catch (err) {
      console.log("ARTIST ERROR:", err);
    }
  };

  return (
    <>
      <Text style={styles.title}>Recently Followed</Text>

      {artists.map((item, i) => (
        <View key={i} style={styles.artistRow}>
          <Image
            source={{ uri: item.images[0] || "https://via.placeholder.com/150" }}
            style={styles.artistImg}
          />
          <Text style={styles.artistText}>{item.name}</Text>
        </View>
      ))}
    </>
  );
}

const styles = StyleSheet.create({
  title: {
    color: "#39d1d8",
    marginTop: 20,
    marginLeft: 20,
    fontSize: 16,
    fontWeight: "600",
  },
  artistRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 20,
    marginBottom: 20,
    paddingHorizontal: 20,
  },
  artistImg: { width: 90, height: 90, borderRadius: 100, marginRight: 15 },
  artistText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
  },
});
