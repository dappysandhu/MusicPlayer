import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { fetchTracks } from "../../services/jamendo";

// Jamendo Song Type
type Song = {
  id: string;
  title: string;
  artist: string;
  cover: string;
  audioUrl: string;
};

const HomeScreen = () => {
  const [songs, setSongs] = useState<Song[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const navigation = useNavigation<any>();

  useEffect(() => {
    const loadSongs = async () => {
      setLoading(true);
      const tracks = await fetchTracks(60);
      setSongs(tracks);
      setLoading(false);
    };

    loadSongs();
  }, []);

  const continueListening = songs.slice(0, 10);
  const topMixes = songs.slice(10, 18);
  const basedOnListening = songs.slice(18, 30);

const getCover = (song: Song) => song.cover;
const formatSubtitle = (song: Song) => song.artist;

if (!loading && songs.length === 0) {
  return (
    <View style={styles.container}>
       <LinearGradient
        colors={["#00333D", "#06323E", "#000000"]}
        style={styles.header}
      >
        <View style={styles.headerRow}>
          <View style={styles.logoRow}>
            <Image
              source={require("../../../assets/images/musium-logo.png")}
              style={{ width: 34, height: 34, marginRight: 6 }}
              resizeMode="contain"
            />
            <Text style={styles.appTitle}>Musium</Text>
          </View>
          </View>
       </LinearGradient>
      <Text style={{ color: "#fff", marginTop: 400, textAlign: "center", alignSelf: "center" }}>
        No music found
      </Text>
      
    </View>
  );
}

return (
  <View style={styles.container}>
    <LinearGradient
        colors={["#00333D", "#06323E", "#000000"]}
        style={styles.header}
      >
        <View style={styles.headerRow}>
          <View style={styles.logoRow}>
            <Image
              source={require("../../../assets/images/musium-logo.png")}
              style={{ width: 34, height: 34, marginRight: 6 }}
              resizeMode="contain"
            />
            <Text style={styles.appTitle}>Musium</Text>
          </View>

          <View style={styles.headerIcons}>
            <Ionicons name="notifications-outline" size={22} color="#fff" />
            <Ionicons
              name="settings-outline"
              size={22}
              color="#fff"
              style={{ marginLeft: 16 }}
            />
          </View>
        </View>

        <Text style={styles.greetingText}>Good evening</Text>
      </LinearGradient>

      {loading && songs.length === 0 ? (
        <View style={styles.loaderWrapper}>
          <ActivityIndicator size="small" color="#39d1d8" />
        </View>
      ) : (
        <ScrollView style={styles.body} showsVerticalScrollIndicator={false}>
          
          {/* CONTINUE LISTENING */}
          {continueListening.length > 0 && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Continue listening</Text>
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {continueListening.map((song) => (
                  <TouchableOpacity
                    key={song.id}
                    style={styles.smallCard}
                    activeOpacity={0.8}
                    onPress={() =>
                      navigation.navigate("Playlist", {
                        playlist: {
                          id: "continue_listening",
                          name: "Continue Listening",
                          description: "Songs you recently played",
                          cover: getCover(song),
                          songs: continueListening,
                        },
                      })
                    }
                  >
                    <Image source={{ uri: getCover(song) }} style={styles.smallCardImg} />
                    <Text style={styles.smallCardTitle} numberOfLines={1}>
                      {song.title}
                    </Text>
                    <Text style={styles.smallCardSubtitle} numberOfLines={1}>
                      {formatSubtitle(song)}
                    </Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>
          )}

          {/* TOP MIXES */}
          {topMixes.length > 0 && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Your Top Mixes</Text>
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {topMixes.map((song) => (
                  <TouchableOpacity
                    key={song.id}
                    style={styles.mixCard}
                    activeOpacity={0.8}
                    onPress={() =>
                      navigation.navigate("Playlist", {
                        playlist: {
                          id: "top_mixes",
                          name: "Your Top Mixes",
                          description: "Your favorite mixes and tracks",
                          cover: getCover(song),
                          songs: topMixes,
                        },
                      })
                    }
                  >
                    <Image source={{ uri: getCover(song) }} style={styles.mixImg} />
                    <Text style={styles.mixTitle} numberOfLines={1}>
                      {song.title}
                    </Text>
                    <Text style={styles.mixSubtitle} numberOfLines={1}>
                      {formatSubtitle(song)}
                    </Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>
          )}

          {/* FEATURED PAIR */}
          {songs.length >= 2 && (
            <View style={[styles.section, { marginTop: 10 }]}>
              <View style={styles.featuredRow}>
                <TouchableOpacity
                  style={styles.featuredCard}
                  activeOpacity={0.85}
                  onPress={() =>
                    navigation.navigate("Playlist", {
                      playlist: {
                        id: "featured_left",
                        name: songs[0].title,
                        description: "Featured Track",
                        cover: getCover(songs[0]),
                        songs: [songs[0], songs[1]],
                      },
                    })
                  }
                >
                  <Image source={{ uri: getCover(songs[0]) }} style={styles.featuredImg} />
                  <View style={styles.featuredTextWrapper}>
                    <Text style={styles.featuredTitle} numberOfLines={1}>
                      {songs[0].title}
                    </Text>
                    <Text style={styles.featuredSubtitle} numberOfLines={1}>
                      {formatSubtitle(songs[0])}
                    </Text>
                  </View>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.featuredCard}
                  activeOpacity={0.85}
                  onPress={() =>
                    navigation.navigate("Playlist", {
                      playlist: {
                        id: "featured_right",
                        name: songs[1].title,
                        description: "Featured Track",
                        cover: getCover(songs[1]),
                        songs: [songs[0], songs[1]],
                      },
                    })
                  }
                >
                  <Image source={{ uri: getCover(songs[1]) }} style={styles.featuredImg} />
                  <View style={styles.featuredTextWrapper}>
                    <Text style={styles.featuredTitle} numberOfLines={1}>
                      {songs[1].title}
                    </Text>
                    <Text style={styles.featuredSubtitle} numberOfLines={1}>
                      {formatSubtitle(songs[1])}
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          )}

          {/* BASED ON LISTENING */}
          {basedOnListening.length > 0 && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Based on your listening</Text>
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {basedOnListening.map((song) => (
                  <TouchableOpacity
                    key={song.id}
                    style={styles.smallCard}
                    activeOpacity={0.8}
                    onPress={() =>
                      navigation.navigate("Playlist", {
                        playlist: {
                          id: "based_on_listening",
                          name: "Based on Your Listening",
                          description: "Recommended picks",
                          cover: getCover(song),
                          songs: basedOnListening,
                        },
                      })
                    }
                  >
                    <Image source={{ uri: getCover(song) }} style={styles.smallCardImg} />
                    <Text style={styles.smallCardTitle} numberOfLines={1}>
                      {song.title}
                    </Text>
                    <Text style={styles.smallCardSubtitle} numberOfLines={1}>
                      {formatSubtitle(song)}
                    </Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>
          )}

          <View style={{ height: 80 }} />
        </ScrollView>
      )}
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#0D0D0D" },
  header: { paddingTop: 50, paddingHorizontal: 20, paddingBottom: 20 },
  headerRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  logoRow: { flexDirection: "row", alignItems: "center" },
  appTitle: { color: "#39d1d8", fontSize: 22, fontWeight: "700" },
  headerIcons: { flexDirection: "row", alignItems: "center" },
  greetingText: { color: "#fff", fontSize: 26, fontWeight: "700", marginTop: 16 },
  body: { flex: 1 },
  loaderWrapper: { flex: 1, justifyContent: "center", alignItems: "center" },
  section: { marginTop: 18 },
  sectionTitle: { color: "#fff", fontSize: 20, fontWeight: "700", marginLeft: 20, marginBottom: 10 },
  smallCard: { width: 130, marginLeft: 20 },
  smallCardImg: { width: 130, height: 130, borderRadius: 10, marginBottom: 8 },
  smallCardTitle: { color: "#fff", fontSize: 14, fontWeight: "600" },
  smallCardSubtitle: { color: "#aaa", fontSize: 12, marginTop: 2 },
  mixCard: { width: 150, marginLeft: 20 },
  mixImg: { width: 150, height: 150, borderRadius: 12, marginBottom: 8 },
  mixTitle: { color: "#fff", fontSize: 14, fontWeight: "600" },
  mixSubtitle: { color: "#aaa", fontSize: 12, marginTop: 2 },
  featuredRow: { flexDirection: "row", justifyContent: "space-between", paddingHorizontal: 20 },
  featuredCard: { flex: 1, marginRight: 10, borderRadius: 12, backgroundColor: "#181818", overflow: "hidden" },
  featuredImg: { width: "100%", height: 120 },
  featuredTextWrapper: { padding: 10 },
  featuredTitle: { color: "#fff", fontSize: 14, fontWeight: "700" },
  featuredSubtitle: { color: "#aaa", fontSize: 12, marginTop: 2 },
});
