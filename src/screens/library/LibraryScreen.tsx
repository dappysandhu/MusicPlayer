import React, { useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    Image,
    TouchableOpacity,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import DefaultLibrary from "./DefaultLibrary";
import FolderLibrary from "./FolderLibrary";
import PlaylistLibrary from "./PlaylistLibrary";
import ArtistLibrary from "./ArtistLibrary";
import AlbumLibrary from "./AlbumLibrary";
import PodcastLibrary from "./PodcastLibrary";

//    DATA (will be replaced later)

const chips = ["Folders", "Playlists", "Artists", "Albums", "Podcasts"];


const LibraryScreen = () => {
    const [activeTab, setActiveTab] = useState<string | null>(null);

    return (
        <View style={styles.container}>
            {/* HEADER */}
            <LinearGradient
                colors={["#00333D", "#06323E", "#000000"]}
                style={styles.header}
            >
                <View style={styles.titleRow}>
                    <Image
                        source={require("../../../assets/images/musium-logo.png")}
                        style={{ width: 40, height: 40, marginRight: -8, marginTop: 6 }}
                        resizeMode="contain"
                    />
                    <Text style={styles.title}>Your Library</Text>

                    <Ionicons
                        name="search-outline"
                        size={26}
                        color="#fff"
                        style={{ marginLeft: "auto" }}
                    />
                </View>

                {/* Chips */}
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                    {chips.map((c, i) => (
                        <TouchableOpacity
                            key={i}
                            style={[
                                styles.chip,
                                activeTab === c && styles.activeChip,
                            ]}
                            onPress={() => setActiveTab(c)}
                        >
                            <Text
                                style={[
                                    styles.chipText,
                                    activeTab === c && styles.activeChipText,
                                ]}
                            >
                                {c}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </ScrollView>
            </LinearGradient>

            {/* BODY */}
            <ScrollView showsVerticalScrollIndicator={false}>
                {activeTab === null && <DefaultLibrary />}
                {activeTab === "Folders" && <FolderLibrary />}
                {activeTab === "Playlists" && <PlaylistLibrary />}
                {activeTab === "Artists" && <ArtistLibrary />}
                {activeTab === "Albums" && <AlbumLibrary />}
                {activeTab === "Podcasts" && <PodcastLibrary />}

                <View style={{ height: 60 }} />
            </ScrollView>
        </View>
    );
};

export default LibraryScreen;


const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: "#0D0D0D" },

    header: { paddingTop: 50, paddingHorizontal: 20, paddingBottom: 20 },

    titleRow: { flexDirection: "row", alignItems: "center", marginTop: 15 },

    title: {
        color: "#39d1d8",
        fontSize: 28,
        fontWeight: "700",
        marginLeft: 8,
    },

    chip: {
        borderWidth: 1,
        borderColor: "#39d1d8",
        paddingVertical: 6,
        paddingHorizontal: 16,
        borderRadius: 30,
        marginRight: 10,
        marginTop: 12,
    },

    activeChip: {
        backgroundColor: "#39d1d8",
    },

    chipText: {
        color: "#39d1d8",
        fontWeight: "600",
    },

    activeChipText: {
        color: "#000",
        fontWeight: "700",
    },

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

    artistRow: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: 18,
        marginBottom: 20,
        paddingHorizontal: 20,
    },

    artistImg: { width: 60, height: 60, borderRadius: 50, marginRight: 15 },

    emptyText: {
        color: "#888",
        textAlign: "center",
        marginTop: 20,
        fontSize: 16,
    },
});
