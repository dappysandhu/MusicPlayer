import React from "react";
import {
  View,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { useRoute, useNavigation, RouteProp } from "@react-navigation/native";
import { useMusicPlayer } from "../../context/MusicPlayerContext";
import { Playlist, Song } from "../../context/MusicPlayerContext";

type PlaylistScreenRouteProp = RouteProp<
  { Playlist: { playlist: Playlist } },
  "Playlist"
>;

export default function PlaylistScreen() {
  const route = useRoute<PlaylistScreenRouteProp>();
  const navigation = useNavigation<any>();
  const { playlist } = route.params;
  const { playSong } = useMusicPlayer();

  const renderItem = ({ item }: { item: Song }) => (
    <TouchableOpacity
      style={styles.songRow}
      onPress={() => {
        playSong(item, playlist);
        navigation.navigate("Player");
      }}
    >
      <Image source={{ uri: item.cover }} style={styles.songImage} />
      <View style={{ flex: 1 }}>
        <Text style={styles.songName} numberOfLines={1}>
          {item.title}
        </Text>
        <Text style={styles.songArtist} numberOfLines={1}>
          {item.artist}
        </Text>
      </View>
      <Text style={{ color: "#888" }}>⋮</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Image source={{ uri: playlist.cover }} style={styles.cover} />

      <Text style={styles.title}>{playlist.name}</Text>
      <Text style={styles.subtitle}>{playlist.description}</Text>

      <FlatList
        data={playlist.songs}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#000" },
  cover: { width: "100%", height: 260, borderRadius: 12 },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginTop: 16,
    color: "white",
  },
  subtitle: { color: "#9CA3AF", marginBottom: 16 },
  songRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 14,
  },
  songImage: { width: 52, height: 52, borderRadius: 8, marginRight: 14 },
  songName: { color: "white", fontSize: 16 },
  songArtist: { color: "#9CA3AF", fontSize: 14 },
});
