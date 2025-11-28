import { Ionicons } from "@expo/vector-icons";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { sendPasswordResetEmail } from "firebase/auth";
import React, { useState } from "react";
import {
    Dimensions,
    Image,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    useColorScheme,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { AuthStackParamList } from "../../navigation/AuthStackTypes";
import PrimaryButton from "../../components/buttons/PrimaryButton";
import { Colors } from "../../constants/theme";
import { auth } from "../../services/firebase";

type Props = NativeStackScreenProps<AuthStackParamList, "ForgotPassword">;

const { width: SCREEN_WIDTH } = Dimensions.get("window");

const ForgotPasswordScreen: React.FC<Props> = ({ navigation }) => {
  const scheme = useColorScheme() || "dark";
  const C = Colors[scheme];

  const LOGO_WIDTH = SCREEN_WIDTH * 0.5;
  const LOGO_HEIGHT = LOGO_WIDTH * (254 / 325);

  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleReset = async () => {
    if (!email) {
      alert("Please enter your email.");
      return;
    }

    try {
      setLoading(true);
      await sendPasswordResetEmail(auth, email.trim());
      alert(
        "If this email is registered, you’ll receive a password reset link. Please check your inbox."
      );
      navigation.goBack();
    } catch (err: any) {
      console.log("Reset error:", err);
      alert(err.message || "Failed to send reset email.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: C.background }]}>
      <View style={styles.container}>
        {/* Back */}
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <Ionicons name="arrow-back" size={26} color={C.textPrimary} />
        </TouchableOpacity>

        {/* Logo (smaller) */}
        <Image
          source={require("../../../assets/images/musium-logo.png")}
          style={{ width: LOGO_WIDTH, height: LOGO_HEIGHT, alignSelf: "center" }}
          resizeMode="contain"
        />

        {/* Heading */}
        <Text style={[styles.heading, { color: C.textPrimary }]}>
          Forgot your password?
        </Text>
        <Text style={[styles.subText, { color: C.textSecondary }]}>
          Enter the email associated with your account and we’ll send you a
          link to reset your password.
        </Text>

        {/* Email */}
        <TextInput
          placeholder="Email"
          placeholderTextColor={C.textSecondary}
          style={[
            styles.input,
            { borderColor: C.border, color: C.textPrimary },
          ]}
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />

        {/* Reset button */}
        <PrimaryButton
          title={loading ? "Sending..." : "Send reset link"}
          onPress={() => {
            if (loading) return;
            void handleReset();
          }}
        />
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
    width: 40,
  },
  heading: {
    fontSize: 26,
    fontWeight: "700",
    marginTop: 12,
    marginBottom: 12,
    textAlign: "center",
  },
  subText: {
    fontSize: 14,
    textAlign: "center",
    marginBottom: 24,
  },
  input: {
    borderWidth: 1,
    borderRadius: 16,
    paddingVertical: 16,
    paddingHorizontal: 16,
    fontSize: 16,
    marginBottom: 16,
  },
});

export default ForgotPasswordScreen;
