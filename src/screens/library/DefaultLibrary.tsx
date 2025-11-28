import React from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const recent = [
  { title: "Conan Gray", subtitle: "", img: "https://images.pexels.com/photos/167446/pexels-photo-167446.jpeg" },
  { title: "3:00am vibes", subtitle: "18 songs", img: "https://images.pexels.com/photos/167092/pexels-photo-167092.jpeg" },
  { title: "Wiped Out!", subtitle: "The Neighbourhood", img: "https://images.pexels.com/photos/164938/pexels-photo-164938.jpeg" },
  { title: "Extra Dynamic", subtitle: "Updated Aug 10 • ur mom ashley", img: "https://images.pexels.com/photos/373945/pexels-photo-373945.jpeg" },
  { title: "Lo-Fi Chill", subtitle: "45 songs", img: "https://images.pexels.com/photos/713498/pexels-photo-713498.jpeg" },
  { title: "Study Beats", subtitle: "24 tracks", img: "https://images.pexels.com/photos/274744/pexels-photo-274744.jpeg" },
  { title: "K-Pop Mix", subtitle: "BLACKPINK, IU, TXT", img: "https://images.pexels.com/photos/3721941/pexels-photo-3721941.jpeg" },
  { title: "Indie Essentials", subtitle: "Tame Impala, Joji", img: "https://images.pexels.com/photos/1763064/pexels-photo-1763064.jpeg" },
  { title: "Synthwave Nights", subtitle: "12 songs", img: "https://images.pexels.com/photos/3408744/pexels-photo-3408744.jpeg" },
  { title: "Acoustic Rain", subtitle: "15 tracks", img: "https://images.pexels.com/photos/167771/pexels-photo-167771.jpeg" },
];


export default function DefaultLibrary() {
    return (
        <>
            {/* Add Playlist */}
            <TouchableOpacity style={styles.actionRow}>
                <View style={styles.actionIcon}>
                    <Ionicons name="add" size={28} color="#0d0d0d" />
                </View>
                <Text style={styles.actionText}>Add New Playlist</Text>
            </TouchableOpacity>

            {/* Liked Songs */}
            <TouchableOpacity style={styles.actionRow}>
                <View style={styles.actionIcon}>
                    <Ionicons name="heart-outline" size={28} color="#0d0d0d" />
                </View>
                <Text style={styles.actionText}>Your Liked Songs</Text>
            </TouchableOpacity>

            <Text style={styles.recentTitle}>Recently played</Text>

            {recent.map((item, i) => (
                <TouchableOpacity key={i} style={styles.recentItem}>
                    <Image source={{ uri: item.img }} style={styles.recentImg} />
                    <View style={{ marginLeft: 12 }}>
                        <Text style={styles.songTitle}>{item.title}</Text>
                        <Text style={styles.songSubtitle}>{item.subtitle}</Text>
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
        marginBottom: 10,
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
