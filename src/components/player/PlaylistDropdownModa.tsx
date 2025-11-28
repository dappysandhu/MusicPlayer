import React from "react";
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  Image,
  StyleSheet,
  ScrollView,
} from "react-native";
import { Playlist } from "../../context/MusicPlayerContext";

export default function PlaylistDropdownModal({
  visible,
  onClose,
  playlists,
  onSelectPlaylist,
}) {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.modalBox}>
          <Text style={styles.title}>Select Playlist</Text>

          <ScrollView>
            {playlists.map((p: Playlist) => (
              <TouchableOpacity
                key={p.id}
                style={styles.row}
                onPress={() => {
                  onSelectPlaylist(p);
                  onClose();
                }}
              >
                <Image source={{ uri: p.cover }} style={styles.cover} />
                <View style={{ flex: 1 }}>
                  <Text style={styles.name}>{p.name}</Text>
                  <Text style={styles.desc}>{p.description}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>

          <TouchableOpacity style={styles.closeBtn} onPress={onClose}>
            <Text style={styles.closeText}>Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.6)",
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  modalBox: {
    backgroundColor: "#111",
    borderRadius: 14,
    padding: 16,
    maxHeight: "80%",
  },
  title: {
    color: "white",
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 14,
  },
  row: {
    flexDirection: "row",
    paddingVertical: 10,
    alignItems: "center",
  },
  cover: {
    width: 52,
    height: 52,
    borderRadius: 6,
    marginRight: 12,
  },
  name: { color: "white", fontSize: 16 },
  desc: { color: "#aaa", fontSize: 12 },
  closeBtn: {
    marginTop: 14,
    padding: 10,
    backgroundColor: "#222",
    borderRadius: 8,
    alignItems: "center",
  },
  closeText: { color: "#fff" },
});
