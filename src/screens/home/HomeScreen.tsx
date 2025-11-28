import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";

const HomeScreen = () => {
  return (
    <View style={styles.container}>
      {/* header */}
      <LinearGradient
        colors={["#00333D", "#06323E", "#000000"]}
        style={styles.headerContainer}
      >

        <View style={styles.userRow}>
          <Image
            source={{
              uri: "https://i.pravatar.cc/300",
            }}
            style={styles.avatar}
          />

          <View>
            <Text style={styles.welcomeText}>Welcome back!</Text>
            <Text style={styles.username}>Dappysandhu</Text>
          </View>

          <View style={styles.iconsRight}>
            <Ionicons name="stats-chart" size={22} color="#fff" />
            <Ionicons name="notifications-outline" size={22} color="#fff" />
            <Ionicons name="settings-outline" size={22} color="#fff" />
          </View>
        </View>
      </LinearGradient>

      {/* main content */}
      <ScrollView showsVerticalScrollIndicator={false} style={{ marginTop: -20 }}>
        <Text style={styles.sectionTitle}>Continue Listening</Text>

        <View style={styles.gridWrapper}>
          {continueListening.map((item, index) => (
            <TouchableOpacity key={index} style={styles.card}>
              <Image source={{ uri: item.img }} style={styles.cardImage} />
              <Text style={styles.cardText}>{item.title}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* top mixes */}
        <Text style={styles.sectionTitle}>Your Top Mixes</Text>

        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {topMixes.map((item, index) => (
            <TouchableOpacity key={index} style={styles.mixCard}>
              <Image source={{ uri: item.img }} style={styles.mixImage} />
              <Text style={styles.mixTitle}>{item.title}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* recent listening */}
        <Text style={styles.sectionTitle}>Based on your recent listening</Text>

        <View style={styles.gridWrapper}>
          {recentListening.map((item, index) => (
            <TouchableOpacity key={index} style={styles.bigCard}>
              <Image source={{ uri: item.img }} style={styles.bigCardImage} />
            </TouchableOpacity>
          ))}
        </View>

        <View style={{ height: 40 }} />
      </ScrollView>
    </View>
  );
};

export default HomeScreen;

// data
const continueListening = [
  {
    img: "https://images.pexels.com/photos/302899/pexels-photo-302899.jpeg",
    title: "Coffee & Jazz",
  },
  {
    img: "https://images.pexels.com/photos/1649771/pexels-photo-1649771.jpeg",
    title: "RELEASED",
  },
  {
    img: "https://images.pexels.com/photos/374870/pexels-photo-374870.jpeg",
    title: "Anything Goes",
  },
  {
    img: "https://images.pexels.com/photos/154147/pexels-photo-154147.jpeg",
    title: "Anime OSTs",
  },
  {
    img: "https://images.pexels.com/photos/3937179/pexels-photo-3937179.jpeg",
    title: "Harry's House",
  },
  {
    img: "https://images.pexels.com/photos/4476376/pexels-photo-4476376.jpeg",
    title: "Lo-Fi Beats",
  },
];

const topMixes = [
  {
    img: "https://images.pexels.com/photos/698907/pexels-photo-698907.jpeg",
    title: "Pop Mix",
  },
  {
    img: "https://images.pexels.com/photos/1183266/pexels-photo-1183266.jpeg",
    title: "Chill Mix",
  },
];

const recentListening = [
  {
    img: "https://images.pexels.com/photos/532558/pexels-photo-532558.jpeg",
  },
  {
    img: "https://images.pexels.com/photos/243988/pexels-photo-243988.jpeg",
  },
];


// styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0D0D0D",
  },

  headerContainer: {
    paddingTop: 50,
    paddingHorizontal: 20,
    paddingBottom: 40,
    width: "100%",
  },

  statusRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },

  time: {
    color: "#fff",
    fontSize: 18,
  },

  headerIconsRight: {
    flexDirection: "row",
    width: 70,
    justifyContent: "space-between",
  },

  userRow: {
    flexDirection: "row",
    alignItems: "center",
  },

  avatar: {
    width: 55,
    height: 55,
    borderRadius: 50,
    marginRight: 15,
  },

  welcomeText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
  },

  username: {
    color: "#cfcfcf",
    fontSize: 13,
    marginTop: 3,
  },

  iconsRight: {
    flexDirection: "row",
    marginLeft: "auto",
    width: 100,
    justifyContent: "space-between",
  },

  sectionTitle: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "700",
    marginLeft: 20,
    marginTop: 30,
  },

  gridWrapper: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    marginTop: 15,
  },

  card: {
    width: "48%",
    backgroundColor: "#1A1A1A",
    borderRadius: 15,
    padding: 10,
    marginBottom: 15,
  },

  cardImage: {
    width: "100%",
    height: 70,
    borderRadius: 10,
  },

  cardText: {
    color: "#fff",
    marginTop: 10,
  },

  mixCard: {
    width: 180,
    marginLeft: 20,
    marginRight: 5,
    marginTop: 15,
  },

  mixImage: {
    width: "100%",
    height: 160,
    borderRadius: 15,
  },

  mixTitle: {
    color: "#fff",
    marginTop: 10,
    fontSize: 16,
    fontWeight: "600",
  },

  bigCard: {
    width: "48%",
    marginBottom: 15,
    backgroundColor: "#1A1A1A",
    borderRadius: 15,
  },

  bigCardImage: {
    width: "100%",
    height: 180,
    borderRadius: 15,
  },
});
