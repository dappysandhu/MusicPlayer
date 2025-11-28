import React, { useState } from "react";
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    StyleSheet,
    ScrollView,
} from "react-native";
import Slider from "@react-native-community/slider";
import { useMusicPlayer } from "../../context/MusicPlayerContext";
import { Ionicons, Feather } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import PlaylistDropdownModal from "../../components/player/PlaylistDropdownModa";

// ADD THIS
type PlayerScreenProps = {
    onCollapse?: () => void;
};

export default function PlayerScreen({ onCollapse }: PlayerScreenProps) {
    const {
        currentSong,
        currentPlaylist,
        isPlaying,
        position,
        duration,
        playPause,
        playNext,
        playPrev,
        seekTo,
    } = useMusicPlayer();

    const navigation = useNavigation<any>();
    const [dropdownVisible, setDropdownVisible] = useState(false);

    if (!currentSong) {
        return (
            <SafeAreaView style={styles.center}>
                <Text style={{ color: "#fff" }}>No song playing</Text>
            </SafeAreaView>
        );
    }

    const cover = currentSong.cover || "https://via.placeholder.com/300";
    const artist = currentSong.artist || "Unknown Artist";

    const formatMillis = (ms: number) => {
        const sec = Math.floor(ms / 1000);
        const m = Math.floor(sec / 60);
        const s = sec % 60;
        return `${m}:${s.toString().padStart(2, "0")}`;
    };

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false}>

                {/* HEADER */}
                <View style={styles.header}>
                    {/* Collapse Button */}
                    <TouchableOpacity onPress={onCollapse}>
                        <Feather name="chevron-down" size={30} color="#fff" />
                    </TouchableOpacity>

                    {/* Playlist Title */}
                    <TouchableOpacity
                        onPress={() => setDropdownVisible(true)}
                        style={{ flexDirection: "row", alignItems: "center" }}
                    >
                        <View>
                            <Text style={styles.playingFromText}>PLAYING FROM PLAYLIST:</Text>
                            <Text style={styles.playlistName}>
                                {currentPlaylist?.name ?? "Unknown Playlist"}
                            </Text>
                        </View>

                        <Feather
                            name="chevron-down"
                            size={20}
                            color="#fff"
                            style={{ marginLeft: 6 }}
                        />
                    </TouchableOpacity>

                    {/* More Options */}
                    <TouchableOpacity>
                        <Feather name="more-vertical" size={22} color="#fff" />
                    </TouchableOpacity>
                </View>

                {/* COVER */}
                <Image source={{ uri: cover }} style={styles.coverImage} />

                {/* TITLE & ARTIST */}
                <Text style={styles.songTitle}>{currentSong.title}</Text>
                <Text style={styles.songSubtitle}>{artist}</Text>

                {/* SHARE + LIKE */}
                <View style={styles.actionRow}>
                    <TouchableOpacity>
                        <Feather name="share-2" size={20} color="#fff" />
                    </TouchableOpacity>

                    <TouchableOpacity>
                        <Ionicons name="heart-outline" size={22} color="#fff" />
                    </TouchableOpacity>
                </View>

                {/* SLIDER */}
                <Slider
                    minimumValue={0}
                    maximumValue={duration}
                    value={position}
                    minimumTrackTintColor="#38BDF8"
                    maximumTrackTintColor="#333"
                    thumbTintColor="#38BDF8"
                    style={styles.slider}
                    onSlidingComplete={seekTo}
                />

                <View style={styles.timeLabels}>
                    <Text style={styles.timeText}>{formatMillis(position)}</Text>
                    <Text style={styles.timeText}>{formatMillis(duration)}</Text>
                </View>

                {/* CONTROLS */}
                <View style={styles.controls}>
                    <TouchableOpacity style={styles.smallControl}>
                        <Ionicons name="shuffle" size={20} color="#fff" />
                    </TouchableOpacity>

                    <TouchableOpacity onPress={playPrev}>
                        <Ionicons name="play-skip-back" size={32} color="#fff" />
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.playButton} onPress={playPause}>
                        <Ionicons
                            name={isPlaying ? "pause" : "play"}
                            size={40}
                            color="#fff"
                        />
                    </TouchableOpacity>

                    <TouchableOpacity onPress={playNext}>
                        <Ionicons name="play-skip-forward" size={32} color="#fff" />
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => navigation.navigate("Queue")}>
                        <Feather name="bar-chart-2" size={22} color="#fff" />
                    </TouchableOpacity>

                </View>

                {/* DOWNLOAD */}
                <View style={{ alignItems: "center", marginTop: 18 }}>
                    <Feather name="download" size={22} color="#fff" />
                </View>

                {/* LYRICS */}
                <Text style={styles.lyricsTitle}>LYRICS</Text>

                <View style={styles.lyricsBox}>
                    <Text style={styles.lyricsText}>
                        You never look at the sky{"\n"}
                        Cause you think it's too high{"\n"}
                        You never look at the stars{"\n"}
                        Cause you think they're too far{"\n"}
                    </Text>
                </View>

                {/* PLAYLIST DROPDOWN */}
                <PlaylistDropdownModal
                    visible={dropdownVisible}
                    onClose={() => setDropdownVisible(false)}
                    playlists={currentPlaylist ? [currentPlaylist] : []}
                    onSelectPlaylist={(p) => {
                        navigation.navigate("Playlist", { playlist: p });
                    }}
                />

            </ScrollView>
        </SafeAreaView>
    );
}

// -------------------- STYLES -------------------------

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#000",
        paddingHorizontal: 16,
    },
    center: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#000",
    },
    header: {
        marginTop: 10,
        marginBottom: 20,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    playingFromText: {
        color: "#bbb",
        fontSize: 12,
    },
    playlistName: {
        color: "#39d1d8",
        fontSize: 14,
        fontWeight: "600",
        marginTop: 2,
    },
    coverImage: {
        width: "100%",
        height: 330,
        borderRadius: 15,
        marginTop: 10,
    },
    songTitle: {
        color: "#fff",
        fontSize: 28,
        fontWeight: "700",
        marginTop: 20,
    },
    songSubtitle: {
        color: "#aaa",
        fontSize: 16,
        marginTop: 4,
        marginBottom: 8,
    },
    actionRow: {
        flexDirection: "row",
        justifyContent: "flex-end",
        width: "100%",
        gap: 20,
    },
    slider: {
        width: "100%",
        marginTop: 16,
    },
    timeLabels: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
    timeText: {
        color: "#aaa",
        fontSize: 12,
    },
    controls: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginTop: 18,
        width: "100%",
    },
    smallControl: {
        padding: 8,
        borderRadius: 20,
        backgroundColor: "#111",
    },
    playButton: {
        backgroundColor: "#38BDF8",
        padding: 22,
        borderRadius: 50,
    },
    lyricsTitle: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "700",
        marginTop: 30,
        marginBottom: 10,
    },
    lyricsBox: {
        backgroundColor: "#38BDF8AA",
        padding: 20,
        borderRadius: 18,
        marginBottom: 60,
    },
    lyricsText: {
        color: "#fff",
        fontSize: 16,
        lineHeight: 24,
    },
});
