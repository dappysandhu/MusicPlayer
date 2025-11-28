import { Ionicons } from "@expo/vector-icons";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
  Image,
  Dimensions,
} from "react-native";
import { AuthStackParamList } from "../../navigation/AuthStackTypes";
import PrimaryButton from "../../components/buttons/PrimaryButton";
import { Colors } from "../../constants/theme";

type Props = NativeStackScreenProps<AuthStackParamList, "SignIn">;

const { width: SCREEN_WIDTH } = Dimensions.get("window");

const SignInScreen: React.FC<Props> = ({ navigation }) => {
  const scheme = useColorScheme() || "dark";
  const C = Colors[scheme];

  // Logo responsive sizing
  const LOGO_WIDTH = SCREEN_WIDTH * 0.75;
  const LOGO_HEIGHT = LOGO_WIDTH * (254 / 325);

  const SocialButton = ({
    label,
    icon,
    onPress,
  }: {
    label: string;
    icon: keyof typeof Ionicons.glyphMap;
    onPress?: () => void;
  }) => (
    <TouchableOpacity
      onPress={onPress}
      style={[
        styles.socialButton,
        {
          borderColor: C.border,
          backgroundColor: C.backgroundAlt,
        },
      ]}
      activeOpacity={0.85}
    >
      <Ionicons name={icon} size={22} color={C.textPrimary} />
      <Text style={[styles.socialLabel, { color: C.textPrimary }]}>
        {label}
      </Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: C.background }]}>
      <View style={styles.container}>

        {/* Back Arrow */}
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <Ionicons name="arrow-back" size={26} color={C.textPrimary} />
        </TouchableOpacity>

        {/* Logo */}
        <Image
          source={require("../../../assets/images/musium-logo.png")}
          style={{ width: LOGO_WIDTH, height: LOGO_HEIGHT, alignSelf: "center" }}
          resizeMode="contain"
        />

        {/* Heading */}
        <Text style={[styles.heading, { color: C.textPrimary }]}>
          Let’s get you in
        </Text>

        {/* Social Buttons */}
        <View style={styles.socialContainer}>
          <SocialButton
            label="Continue with Google"
            icon="logo-google"
            onPress={() => { }}
          />
          <SocialButton
            label="Continue with Facebook"
            icon="logo-facebook"
            onPress={() => { }}
          />
          <SocialButton
            label="Continue with Apple"
            icon="logo-apple"
            onPress={() => { }}
          />
        </View>

        {/* Divider */}
        <View style={styles.dividerRow}>
          <View style={[styles.divider, { backgroundColor: C.border }]} />
          <Text style={[styles.dividerText, { color: C.textSecondary }]}>
            or
          </Text>
          <View style={[styles.divider, { backgroundColor: C.border }]} />
        </View>

        <PrimaryButton
          title="Log in with a password"
          onPress={() => navigation.navigate("Login")}
        />

        {/* Bottom Sign Up */}
        <View style={styles.bottomRow}>
          <Text style={{ color: C.textSecondary }}>Don’t have an account? </Text>
          <TouchableOpacity onPress={() => navigation.navigate("Signup")}>
            <Text style={{ color: C.primary, fontWeight: "600" }}>Sign Up</Text>
          </TouchableOpacity>
        </View>

      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: { flex: 1 },
  container: {
    flex: 1,
    paddingHorizontal: 24,
  },

  backButton: {
    paddingVertical: 8,
    paddingRight: 8,
    width: 40,
  },

  heading: {
    fontSize: 30,
    fontWeight: "700",
    marginTop: 12,
    marginBottom: 28,
    textAlign: "center",
  },

  socialContainer: {
    marginBottom: 28,
  },

  socialButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 18,
    paddingHorizontal: 16,
    borderRadius: 16,
    borderWidth: 1,
    marginBottom: 16,
  },

  socialLabel: {
    marginLeft: 14,
    fontSize: 16,
    fontWeight: "500",
  },

  dividerRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 22,
  },

  divider: {
    flex: 1,
    height: 1,
  },
  dividerText: {
    marginHorizontal: 12,
    fontSize: 14,
  },

  bottomRow: {
    marginTop: 24,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default SignInScreen;
