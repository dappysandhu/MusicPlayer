import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { useMusicPlayer } from "../../context/MusicPlayerContext";
import { Ionicons, Feather } from "@expo/vector-icons";

export default function QueueScreen() {
  const {
    currentSong,
    currentPlaylist,
    queue,
    playSong,
    removeFromQueue,
    clearQueue,
    addToQueue,
  } = useMusicPlayer();

  const [selectedId, setSelectedId] = useState<string | null>(null);

  if (!currentSong) return null;

  const upcomingFromPlaylist = currentPlaylist?.songs.filter(
    (s) => s.id !== currentSong.id
  );

  return (
    <ScrollView
      style={styles.container}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ paddingBottom: 120 }}
    >
      {/* HEADER */}
      <View style={styles.header}>
        <View>
          <Text style={styles.playingFromText}>PLAYING FROM PLAYLIST:</Text>
          <Text style={styles.playlistName}>{currentPlaylist?.name}</Text>
        </View>
        <Feather name="more-vertical" size={22} color="#fff" />
      </View>

      {/* NOW PLAYING */}
      <Text style={styles.sectionTitle}>now playing :</Text>

      <View style={styles.nowPlayingRow}>
        <Image source={{ uri: currentSong.cover }} style={styles.cover} />
        <View>
          <Text style={styles.nowSong}>{currentSong.title}</Text>
          <Text style={styles.artist}>{currentSong.artist}</Text>
        </View>
      </View>

      {/* NEXT IN QUEUE */}
      <View style={styles.sectionRow}>
        <Text style={styles.sectionTitle}>next in queue :</Text>

        {queue.length > 0 && (
          <TouchableOpacity style={styles.clearBtn} onPress={clearQueue}>
            <Text style={styles.clearText}>CLEAR QUEUE</Text>
          </TouchableOpacity>
        )}
      </View>

      {queue.map((song) => {
        const isSelected = song.id === selectedId;

        return (
          <View key={song.id} style={styles.queueRow}>
            {/* SELECT / ACTIVE DOT */}
            <TouchableOpacity onPress={() => setSelectedId(song.id)}>
              {isSelected ? (
                <Ionicons
                  name="radio-button-on"
                  size={20}
                  color="#39d1d8"
                />
              ) : (
                <Feather name="circle" size={20} color="#bbb" />
              )}
            </TouchableOpacity>

            {/* TITLE + ARTIST */}
            <TouchableOpacity
              style={{ marginLeft: 12, flex: 1 }}
              activeOpacity={0.8}
              onPress={() => playSong(song, currentPlaylist)}
            >
              <Text style={styles.songTitle} numberOfLines={1}>
                {song.title}
              </Text>
              <Text style={styles.artist} numberOfLines={1}>
                {song.artist}
              </Text>
            </TouchableOpacity>

            {/* DRAG HANDLE (visual only for now) */}
            <Feather
              name="menu"
              size={22}
              color="#bbb"
              style={{ marginRight: 10 }}
            />
          </View>
        );
      })}

      {/* NEXT IN PLAYLIST */}
      <Text style={[styles.sectionTitle, { marginTop: 30 }]}>
        next in "{currentPlaylist?.name}" :
      </Text>

      {upcomingFromPlaylist?.map((song) => (
        <View key={song.id} style={styles.queueRow}>
          <Feather name="circle" size={20} color="#555" />

          <TouchableOpacity
            style={{ marginLeft: 12, flex: 1 }}
            activeOpacity={0.8}
            onPress={() => playSong(song, currentPlaylist)}
          >
            <Text style={styles.songTitle} numberOfLines={1}>
              {song.title}
            </Text>
            <Text style={styles.artist} numberOfLines={1}>
              {song.artist}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => addToQueue(song)}>
            <Text style={styles.addToQueue}>ADD</Text>
          </TouchableOpacity>
        </View>
      ))}

      {/* FOOTER ACTIONS (REMOVE / ADD TO QUEUE) */}
      {queue.length > 0 && (
        <View style={styles.footerRow}>
          <TouchableOpacity
            disabled={!selectedId}
            onPress={() => {
              if (selectedId) {
                removeFromQueue(selectedId);
                setSelectedId(null);
              }
            }}
          >
            <Text
              style={[
                styles.footerText,
                { textAlign: "left" },
                !selectedId && { opacity: 0.4 },
              ]}
            >
              REMOVE
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              // optional global "add to queue" action
              // you can extend this later with a picker
            }}
          >
            <Text style={[styles.footerText, { textAlign: "right" }]}>
              ADD TO QUEUE
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#000" },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
  },

  playingFromText: { color: "#bbb", fontSize: 12 },
  playlistName: { color: "#39d1d8", fontSize: 14, fontWeight: "600" },

  sectionTitle: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "700",
    marginTop: 10,
    marginBottom: 10,
  },

  nowPlayingRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 22,
  },

  cover: { width: 60, height: 60, borderRadius: 8, marginRight: 12 },

  nowSong: { color: "#fff", fontSize: 16, fontWeight: "600" },
  artist: { color: "#888", fontSize: 13 },

  queueRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: "#111",
  },

  songTitle: { color: "white", fontSize: 15 },

  clearBtn: {
    paddingVertical: 4,
    paddingHorizontal: 14,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#39d1d8",
  },

  clearText: { color: "#39d1d8", fontSize: 12, fontWeight: "600" },

  sectionRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  addToQueue: {
    color: "#39d1d8",
    fontWeight: "600",
    marginRight: 10,
    fontSize: 13,
  },

  footerRow: {
    position: "absolute",
    left: 20,
    right: 20,
    bottom: 30,
    flexDirection: "row",
    justifyContent: "space-between",
  },

  footerText: {
    color: "#39d1d8",
    fontSize: 13,
    fontWeight: "700",
  },
});
