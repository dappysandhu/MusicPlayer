import React from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useMusicPlayer } from "../../context/MusicPlayerContext";

// ADD THIS TYPE
type MiniPlayerProps = {
  onExpand?: () => void;
};

export default function MiniPlayer({ onExpand }: MiniPlayerProps) {
  const { currentSong, isPlaying, playPause } = useMusicPlayer();

  if (!currentSong) return null;

  const cover =
    (currentSong as any).album?.coverUrl ||
    (currentSong as any).cover ||
    (currentSong as any).coverUrl ||
    "https://via.placeholder.com/300";

  const artists =
    currentSong.artist ||
    (currentSong as any).artists?.map((a: any) => a.name).join(", ") ||
    "Unknown Artist";

  return (
    <TouchableOpacity
      style={styles.container}
      activeOpacity={0.9}
      onPress={() => onExpand && onExpand()} // tap opens full player
    >
      {/* COVER */}
      <Image source={{ uri: cover }} style={styles.cover} />

      {/* TITLE + ARTIST */}
      <View style={styles.infoBox}>
        <Text style={styles.title} numberOfLines={1}>
          {currentSong.title}
        </Text>
        <Text style={styles.subtitle} numberOfLines={1}>
          {artists}
        </Text>
      </View>

      {/* PLAY / PAUSE BUTTON */}
      <TouchableOpacity
        onPress={(e) => {
          e.stopPropagation();
          playPause();
        }}
        style={styles.controlButton}
      >
        {isPlaying ? (
          <Ionicons name="pause" size={28} color="#fff" />
        ) : (
          <Ionicons name="play" size={28} color="#fff" />
        )}
      </TouchableOpacity>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 70,
    backgroundColor: "#0B0B0B",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 14,
    borderTopWidth: 1,
    borderTopColor: "#1A1A1A",
  },

  cover: {
    width: 52,
    height: 52,
    borderRadius: 6,
    marginRight: 12,
    backgroundColor: "#222",
  },

  infoBox: {
    flex: 1,
    justifyContent: "center",
  },

  title: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "600",
  },

  subtitle: {
    color: "#b5b5b5",
    fontSize: 12,
    marginTop: 2,
  },

  controlButton: {
    paddingVertical: 4,
    paddingHorizontal: 12,
  },
});
