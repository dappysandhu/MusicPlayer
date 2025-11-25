import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";

const artists = [
  { title: "Conan Gray", img: "https://images.pexels.com/photos/167446/pexels-photo-167446.jpeg" },
  { title: "Chase Atlantic", img: "https://images.pexels.com/photos/3779115/pexels-photo-3779115.jpeg" },
  { title: "beabadoobee", img: "https://images.pexels.com/photos/11217846/pexels-photo-11217846.jpeg" },
  { title: "The Weeknd", img: "https://images.unsplash.com/photo-1504805572947-34fad45aed93" },
  { title: "Doja Cat", img: "https://images.unsplash.com/photo-1487412912498-0447578fcca8" },
  { title: "Ariana Grande", img: "https://images.unsplash.com/photo-1542144612-1b61ff1a42e5" },
  { title: "Joji", img: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e" },
  { title: "Billie Eilish", img: "https://images.unsplash.com/photo-1529626455594-4ff0802b1234" },
  { title: "Tame Impala", img: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4" },
  { title: "BLACKPINK", img: "https://images.pexels.com/photos/3721941/pexels-photo-3721941.jpeg" },
  { title: "Taylor Swift", img: "https://images.unsplash.com/photo-1529626455594-4ff0802bbbbb" },
  { title: "KALI", img: "https://images.pexels.com/photos/3779115/pexels-photo-3779115.jpeg" },
];


export default function ArtistLibrary() {
    return (
        <>
            <Text style={styles.title}>Recently Played Artists</Text>

            {artists.map((item, i) => (
                <View key={i} style={styles.artistRow}>
                    <Image source={{ uri: item.img }} style={styles.artistImg} />
                    <Text style={styles.artistText}>{item.title}</Text>
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
    artistImg: {
        width: 90,
        height: 90,
        borderRadius: 100,
        marginRight: 15,
    },
    artistText: {
        color: "#fff",
        fontSize: 18,
        fontWeight: "600",
    },
});
