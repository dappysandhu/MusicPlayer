import React, { useEffect } from "react";
import { Dimensions, Image, StyleSheet, useColorScheme, View } from "react-native";
import { Colors } from "../../constants/theme";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { AuthStackParamList } from "../../navigation/AuthStackTypes";

type Props = NativeStackScreenProps<AuthStackParamList, "Launch">;

const { width: SCREEN_WIDTH } = Dimensions.get("window");

const LOGO_RATIO = 337 / 391;

const LaunchScreen: React.FC<Props> = ({ navigation }) => {
  const scheme = useColorScheme() || "dark";
  const C = Colors[scheme];

  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace("Welcome");
    }, 1400);

    return () => clearTimeout(timer);
  }, [navigation]);

  const LOGO_WIDTH = SCREEN_WIDTH * 0.55;
  const LOGO_HEIGHT = LOGO_WIDTH * LOGO_RATIO;

  return (
    <View style={[styles.container, { backgroundColor: C.background }]}>
      <Image
        source={require("../../../assets/images/musium-logo.png")}
        style={{ width: LOGO_WIDTH, height: LOGO_HEIGHT }}
        resizeMode="contain"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default LaunchScreen;
