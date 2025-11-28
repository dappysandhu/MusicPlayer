import React, { useEffect, useState } from "react";
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
import api from "../../services/api";

const ExploreScreen = () => {
  const [topGenres, setTopGenres] = useState([]);
  const [allGenres, setAllGenres] = useState([]);

  useEffect(() => {
    loadGenres();
  }, []);

  const loadGenres = async () => {
    try {
      const res1 = await api.get("/genres/top");
      const res2 = await api.get("/genres");

      setTopGenres(res1.data || []);
      setAllGenres(res2.data || []);
    } catch (err) {
      console.log("GENRE FETCH ERROR:", err);
    }
  };

  return (
    <View style={styles.container}>
      {/* HEADER */}
      <LinearGradient
        colors={["#00333D", "#06323E", "#000000"]}
        style={styles.header}
      >

        <View style={styles.searchRow}>
          <Image
            source={require("../../../assets/images/musium-logo.png")}
            style={{ width: 40, height: 40, marginRight: -8, marginTop: 6 }}
            resizeMode="contain"
          />
          <Text style={styles.searchTitle}>Search</Text>
        </View>

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
            <TouchableOpacity
              key={i}
              style={[styles.genreCard, { backgroundColor: g.color || "#39d1d8" }]}
            >
              <Text style={styles.genreText}>{g.name}</Text>

              <Image
                source={{ uri: g.image || "https://via.placeholder.com/150" }}
                style={styles.genreImage}
              />
            </TouchableOpacity>
          ))}
        </View>

        {/* BROWSE ALL */}
        <Text style={[styles.sectionTitle, { marginTop: 30 }]}>Browse All</Text>

        <View style={styles.grid}>
          {allGenres.map((g, i) => (
            <TouchableOpacity
              key={i}
              style={[styles.genreCard, { backgroundColor: g.color || "#39d1d8" }]}
            >
              <Text style={styles.genreText}>{g.name}</Text>

              <Image
                source={{ uri: g.image || "https://via.placeholder.com/150" }}
                style={styles.genreImage}
              />
            </TouchableOpacity>
          ))}
        </View>

        <View style={{ height: 40 }} />
      </ScrollView>
    </View>
  );
};

export default ExploreScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#0D0D0D" },
  header: { paddingTop: 50, paddingBottom: 30, paddingHorizontal: 20 },

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
