import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";

export default function PlaylistsScreen() {
  const playlists = [
  { title: "Superache", sub: "Conan Gray", img: "https://images.pexels.com/photos/1649771/pexels-photo-1649771.jpeg" },
  { title: "DAWN FM", sub: "The Weeknd", img: "https://images.pexels.com/photos/167092/pexels-photo-167092.jpeg" },
  { title: "Planet Her", sub: "Doja Cat", img: "https://images.pexels.com/photos/373945/pexels-photo-373945.jpeg" },
  { title: "Midnight Drive", sub: "Lo-Fi Beats", img: "https://images.pexels.com/photos/935985/pexels-photo-935985.jpeg" },
  { title: "Chill Vibes", sub: "Various Artists", img: "https://images.pexels.com/photos/713498/pexels-photo-713498.jpeg" },
  { title: "Eternal Sunshine", sub: "Ariana Grande", img: "https://images.pexels.com/photos/826349/pexels-photo-826349.jpeg" },
  { title: "After Hours", sub: "The Weeknd", img: "https://images.pexels.com/photos/365684/pexels-photo-365684.jpeg" },
  { title: "Born Pink", sub: "BLACKPINK", img: "https://images.pexels.com/photos/3721941/pexels-photo-3721941.jpeg" },
  { title: "Positions", sub: "Ariana Grande", img: "https://images.pexels.com/photos/1674756/pexels-photo-1674756.jpeg" },
  { title: "When We All Fall Asleep", sub: "Billie Eilish", img: "https://images.pexels.com/photos/3971985/pexels-photo-3971985.jpeg" },
];

  return (
    <View style={styles.container}>

            <Text style={styles.recentTitle}>Recently added</Text>
      {playlists.map((item, i) => (
        <TouchableOpacity key={i} style={styles.item}>
          <Image source={{ uri: item.img }} style={styles.img} />
          <View style={{ marginLeft: 14 }}>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.sub}>{item.sub}</Text>
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { paddingHorizontal: 20, marginTop: 20 },

  item: { flexDirection: "row", alignItems: "center", marginBottom: 25, marginTop: 20 },

  img: { width: 90, height: 90, borderRadius: 8 },

  title: { color: "#fff", fontSize: 18, fontWeight: "600" },

  sub: { color: "#aaa", marginTop: 3 },
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
        // marginTop: 20,
        fontSize: 16,
        fontWeight: "600",
    },
});
