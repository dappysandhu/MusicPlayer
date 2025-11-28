import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Image,
  TextInput,
  Dimensions,
  useColorScheme,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { AuthStackParamList } from "../../navigation/AuthStackTypes";
import { Colors } from "../../constants/theme";
import PrimaryButton from "../../components/buttons/PrimaryButton";
import { auth } from "../../services/firebase";
import { sendEmailVerification, signInWithEmailAndPassword } from "firebase/auth";

type Props = NativeStackScreenProps<AuthStackParamList, "Login">;

const { width: SCREEN_WIDTH } = Dimensions.get("window");

const LOGO_RATIO = 215 / 275;

const LoginScreen: React.FC<Props> = ({ navigation }) => {
  const scheme = useColorScheme() || "dark";
  const C = Colors[scheme];

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const LOGO_WIDTH = SCREEN_WIDTH * 0.68;
  const LOGO_HEIGHT = LOGO_WIDTH * LOGO_RATIO;

const handleLogin = async () => {
    if (!email || !password) {
      alert("Please enter email and password.");
      return;
    }

    try {
      setLoading(true);
      const cred = await signInWithEmailAndPassword(auth, email.trim(), password);

      if (!cred.user.emailVerified) {
        await sendEmailVerification(cred.user);
        alert(
          "Your email is not verified yet. We’ve sent you another verification email. Please verify and then log in again."
        );
        await auth.signOut();
        return;
      }

      // Email verified → proceed 
      navigation.navigate("Welcome");
    } catch (err: any) {
      console.log("Login error:", err);
      alert(err.message || "Failed to log in.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: C.background }]}>
      <View style={styles.container}>

        {/* Back arrow */}
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
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
          Login to your account
        </Text>

        {/* Email Field */}
        <View style={[styles.inputWrapper, { borderColor: C.border, backgroundColor: C.inputBackground }]}>
          <Ionicons name="mail-outline" size={20} color={C.textSecondary} style={styles.leftIcon} />
          <TextInput
            placeholder="Email"
            placeholderTextColor={C.textSecondary}
            style={[styles.input, { color: C.textPrimary }]}
            autoCapitalize="none"
            value={email}
            onChangeText={setEmail}
          />
        </View>

        {/* Password Field */}
        <View style={[styles.inputWrapper, { borderColor: C.border, backgroundColor: C.inputBackground }]}>
          <Ionicons name="lock-closed-outline" size={20} color={C.textSecondary} style={styles.leftIcon} />
          <TextInput
            placeholder="Password"
            placeholderTextColor={C.textSecondary}
            style={[styles.input, { color: C.textPrimary }]}
            secureTextEntry={!showPassword}
            value={password}
            onChangeText={setPassword}
          />
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <Ionicons
              name={showPassword ? "eye-off-outline" : "eye-outline"}
              size={20}
              color={C.textSecondary}
            />
          </TouchableOpacity>
        </View>

        {/* Remember me */}
        <View style={styles.rememberRow}>
          <TouchableOpacity
            onPress={() => setRemember(!remember)}
            style={[
              styles.checkbox,
              {
                borderColor: remember ? C.primary : C.border,
                backgroundColor: remember ? C.primarySoft : "transparent",
              },
            ]}
          >
            {remember && <Ionicons name="checkmark" size={14} color={C.primary} />}
          </TouchableOpacity>
          <Text style={{ color: C.textSecondary, fontSize: 14 }}>Remember me</Text>
        </View>

        {/* Log in button */}
        <PrimaryButton
          title={loading ? "Logging in..." : "Log In"}
          onPress={handleLogin}
        />

        {/* Forgot password */}
        <TouchableOpacity
          style={styles.forgotRow}
          onPress={() => navigation.navigate("ForgotPassword")}
        >
          <Text style={{ color: C.primary, fontWeight: "500" }}>
            Forgot password?
          </Text>
        </TouchableOpacity>

        {/* Divider */}
        <View style={styles.dividerRow}>
          <View style={[styles.divider, { backgroundColor: C.border }]} />
          <Text style={[styles.dividerText, { color: C.textSecondary }]}>or continue with</Text>
          <View style={[styles.divider, { backgroundColor: C.border }]} />
        </View>

        {/* Social icons row */}
        <View style={styles.socialRow}>
          {["logo-google", "logo-facebook", "logo-apple"].map((icon) => (
            <TouchableOpacity
              key={icon}
              style={[styles.socialCircle, { borderColor: C.border }]}
            >
              <Ionicons name={icon as any} size={24} color={C.textPrimary} />
            </TouchableOpacity>
          ))}
        </View>

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
  container: { flex: 1, paddingHorizontal: 24 },

  backButton: {
    paddingVertical: 8,
    width: 40,
  },

  heading: {
    fontSize: 28,
    fontWeight: "700",
    textAlign: "center",
    marginTop: 14,
    marginBottom: 28,
  },

  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderRadius: 16,
    height: 58,
    paddingHorizontal: 16,
    marginBottom: 16,
  },

  leftIcon: { marginRight: 8 },

  input: {
    flex: 1,
    fontSize: 15,
  },

  rememberRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 18,
  },

  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 4,
    borderWidth: 1,
    marginRight: 10,
    alignItems: "center",
    justifyContent: "center",
  },

  forgotContainer: {
    marginTop: 6,
    alignItems: "center",
  },

  forgotText: {
    fontSize: 14,
    fontWeight: "500",
  },

   forgotRow: {
    alignSelf: "flex-end",
    marginBottom: 16,
  },

  dividerRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 32,
    marginBottom: 24,
  },

  divider: { flex: 1, height: 1 },

  dividerText: { marginHorizontal: 12, fontSize: 14 },

  socialRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 28,
    gap: 18,
  },

  socialCircle: {
    width: 54,
    height: 54,
    borderRadius: 27,
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  bottomRow: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 18,
  },
});

export default LoginScreen;
