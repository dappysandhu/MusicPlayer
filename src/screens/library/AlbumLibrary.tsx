import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import api from "../../services/api";

export default function AlbumLibrary() {
  const [albums, setAlbums] = useState([]);

  useEffect(() => {
    loadAlbums();
  }, []);

  const loadAlbums = async () => {
    try {
      const res = await api.get("/users/me/liked-albums");
      setAlbums(res.data);
    } catch (err) {
      console.log("ALBUM ERROR:", err);
    }
  };

  return (
    <>
      <TouchableOpacity style={styles.actionRow}>
        <View style={styles.actionIcon}>
          <Ionicons name="heart-outline" size={28} color="#0d0d0d" />
        </View>
        <Text style={styles.actionText}>Your Liked Albums</Text>
      </TouchableOpacity>

      <Text style={styles.recentTitle}>Recently added</Text>

      {albums.map((item, i) => (
        <TouchableOpacity key={i} style={styles.recentItem}>
          <Image
            source={{ uri: item.coverUrl }}
            style={styles.recentImg}
          />
          <View style={{ marginLeft: 12 }}>
            <Text style={styles.songTitle}>{item.title}</Text>
            <Text style={styles.songSubtitle}>{item.artist?.name}</Text>
          </View>
        </TouchableOpacity>
      ))}
    </>
  );
}

const styles = StyleSheet.create({
  actionRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 18,
    paddingHorizontal: 20,
  },
  actionIcon: {
    backgroundColor: "#39d1d8",
    padding: 12,
    borderRadius: 50,
  },
  actionText: {
    color: "#fff",
    fontSize: 18,
    marginLeft: 15,
    fontWeight: "600",
  },
  recentTitle: {
    color: "#39d1d8",
    marginTop: 25,
    marginLeft: 20,
    fontSize: 16,
    fontWeight: "600",
  },
  recentItem: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 20,
    marginBottom: 20,
    paddingHorizontal: 20,
  },
  recentImg: { width: 90, height: 90, borderRadius: 8 },
  songTitle: { color: "#fff", fontSize: 17, fontWeight: "700" },
  songSubtitle: { color: "#bfbfbf", marginTop: 3 },
});
