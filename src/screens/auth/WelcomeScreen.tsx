// src/screens/WelcomeScreen.tsx
import React from "react";
import { View, Text, StyleSheet, ImageBackground, Dimensions } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { AuthStackParamList } from "../../navigation/AuthStackTypes";
import { useColorScheme } from "react-native";
import { Colors } from "../../constants/theme";
import PrimaryButton from "../../components/buttons/PrimaryButton";

type Props = NativeStackScreenProps<AuthStackParamList, "Welcome">;

const { height } = Dimensions.get("window");

const WelcomeScreen: React.FC<Props> = ({ navigation }) => {
  const scheme = useColorScheme() || "dark";
  const C = Colors[scheme];

  return (
    <View style={[styles.container, { backgroundColor: C.background }]}>
      <ImageBackground
        source={require("../../../assets/images/welcome-hero.png")}
        style={styles.hero}
        resizeMode="cover"
      >
        <View style={[styles.overlay]} />
      </ImageBackground>

      <View style={[styles.bottomCard, { backgroundColor: C.backgroundAlt }]}>
        <Text style={[styles.heading, { color: C.textPrimary }]}>
          From the <Text style={styles.emphasis}>latest</Text> to the{" "}
          <Text style={styles.emphasis}>greatest</Text> hits, play your{" "}
          favorite tracks on <Text style={styles.emphasis}>musium</Text> now!
        </Text>

        <View style={styles.progressBar}>
          <View
            style={[
              styles.progressDot,
              { backgroundColor: C.primarySoft, flex: 1 },
            ]}
          />
          <View style={[styles.progressDot, { flex: 1 }]} />
        </View>

        <PrimaryButton
          title="Get Started"
          onPress={() => navigation.navigate("SignIn")}
        />
      </View>
    </View>
  );
};

const CARD_HEIGHT = height * 0.32;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  hero: {
  width: "100%",
  height: height * 0.80,
  resizeMode: "cover",
  justifyContent: "flex-end",
  overflow: "hidden",   
},
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.18)",
  },
  bottomCard: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    height: CARD_HEIGHT,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 26,
    paddingTop: 24,
    paddingBottom: 28,
  },
  heading: {
    fontSize: 18,
    lineHeight: 26,
    textAlign: "center",
    marginBottom: 22,
  },
  emphasis: {
    fontWeight: "700",
  },
  progressBar: {
    width: "50%",
    alignSelf: "center",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderRadius: 4,
    borderColor: "rgba(8, 8, 8, 0.14)",
    marginBottom: 22,
  },
  progressDot: {
    height: 5,
    borderRadius: 4,
    backgroundColor: "rgba(255,255,255,0.14)",
  },
});

export default WelcomeScreen;
