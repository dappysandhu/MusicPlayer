import React from "react";
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TextInput,
    Image,
    TouchableOpacity,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";

const ExploreScreen = () => {
    return (
        <View style={styles.container}>
            {/* HEADER */}
            <LinearGradient
                colors={["#00333D", "#06323E", "#000000"]}
                style={styles.header}
            >

                {/* Logo + Title */}
                <View style={styles.searchRow}>
                    <Image
                        source={require("../../../assets/images/musium-logo.png")}
                        style={{ width: 40, height: 40, marginRight: -8, marginTop: 6 }}
                        resizeMode="contain"
                    />
                    <Text style={styles.searchTitle}>Search</Text>
                </View>

                {/* Search Bar */}
                <View style={styles.searchBox}>
                    <Ionicons name="search-outline" size={20} color="#828282" />
                    <TextInput
                        placeholder="Songs, Artists, Podcasts & More"
                        placeholderTextColor="#bfbfbf"
                        style={styles.searchInput}
                    />
                </View>
            </LinearGradient>


            <ScrollView showsVerticalScrollIndicator={false} style={{ marginTop: -20 }}>
                {/* TOP GENRES */}
                <Text style={styles.sectionTitle}>Your Top Genres</Text>

                <View style={styles.grid}>
                    {topGenres.map((g, i) => (
                        <TouchableOpacity key={i} style={[styles.genreCard, { backgroundColor: g.color }]}>
                            <Text style={styles.genreText}>{g.title}</Text>
                            <Image source={{ uri: g.image }} style={styles.genreImage} />
                        </TouchableOpacity>
                    ))}
                </View>

                {/* BROWSE ALL */}
                <Text style={[styles.sectionTitle, { marginTop: 30 }]}>Browse All</Text>

                <View style={styles.grid}>
                    {browseAll.map((g, i) => (
                        <TouchableOpacity key={i} style={[styles.genreCard, { backgroundColor: g.color }]}>
                            <Text style={styles.genreText}>{g.title}</Text>
                            <Image source={{ uri: g.image }} style={styles.genreImage} />
                        </TouchableOpacity>
                    ))}
                </View>

                <View style={{ height: 40 }} />
            </ScrollView>
        </View>
    );
};

export default ExploreScreen;

const topGenres = [
    { title: "Kpop", color: "#7CFC00", image: "https://images.pexels.com/photos/713149/pexels-photo-713149.jpeg" },
    { title: "Indie", color: "#FF32B1", image: "https://images.pexels.com/photos/1652368/pexels-photo-1652368.jpeg" },
    { title: "R&B", color: "#7585FF", image: "https://images.pexels.com/photos/3944104/pexels-photo-3944104.jpeg" },
    { title: "Pop", color: "#B86722", image: "https://images.pexels.com/photos/1763075/pexels-photo-1763075.jpeg" },
];

const browseAll = [
    { title: "Made for You", color: "#29A2C6", image: "https://images.pexels.com/photos/3182804/pexels-photo-3182804.jpeg" },
    { title: "RELEASED", color: "#9538D3", image: "https://images.pexels.com/photos/1649771/pexels-photo-1649771.jpeg" },
    { title: "Music Charts", color: "#233CFF", image: "https://images.pexels.com/photos/1647150/pexels-photo-1647150.jpeg" },
    { title: "Podcasts", color: "#B02C36", image: "https://images.pexels.com/photos/3779115/pexels-photo-3779115.jpeg" },
    { title: "Bollywood", color: "#C28F17", image: "https://images.pexels.com/photos/11217846/pexels-photo-11217846.jpeg" },
    { title: "Pop Fusion", color: "#369DAB", image: "https://images.pexels.com/photos/167636/pexels-photo-167636.jpeg" },
];

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: "#0D0D0D" },
    header: { paddingTop: 50, paddingBottom: 30, paddingHorizontal: 20 },
    statusRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 10,
    },
    time: { color: "#fff", fontSize: 18 },
    rightIcons: { flexDirection: "row", width: 70, justifyContent: "space-between" },

    searchRow: { flexDirection: "row", alignItems: "center", marginTop: 10 },
    searchTitle: { color: "#39d1d8", fontSize: 28, fontWeight: "700", marginLeft: 8 },

    searchBox: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: 18,
        backgroundColor: "#ECECEC",
        borderRadius: 50,
        paddingHorizontal: 18,
        height: 45,
    },
    searchInput: { marginLeft: 10, flex: 1, color: "#000" },

    sectionTitle: {
        color: "#fff",
        fontSize: 22,
        fontWeight: "700",
        marginLeft: 20,
        marginTop: 20,
    },

    grid: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-between",
        paddingHorizontal: 20,
        marginTop: 15,
    },

    genreCard: {
        width: "48%",
        height: 110,
        borderRadius: 12,
        padding: 12,
        marginBottom: 15,
        overflow: "hidden",
    },

    genreText: {
        color: "#fff",
        fontSize: 18,
        fontWeight: "700",
    },

    genreImage: {
        width: 70,
        height: 70,
        position: "absolute",
        right: -5,
        bottom: -5,
        borderRadius: 10,
    },
});
