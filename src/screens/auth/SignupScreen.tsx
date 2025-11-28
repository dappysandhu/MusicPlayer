import { Ionicons } from "@expo/vector-icons";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { createUserWithEmailAndPassword, sendEmailVerification } from "firebase/auth";
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
import PrimaryButton from "../../components/buttons/PrimaryButton";
import { Colors } from "../../constants/theme";
import { AuthStackParamList } from "../../navigation/AuthStackTypes";
import { auth } from "../../services/firebase";

type Props = NativeStackScreenProps<AuthStackParamList, "Signup">;

const { width: SCREEN_WIDTH } = Dimensions.get("window");

const SignupScreen: React.FC<Props> = ({ navigation }) => {
  const scheme = useColorScheme() || "dark";
  const C = Colors[scheme];

  const LOGO_WIDTH = SCREEN_WIDTH * 0.75;
  const LOGO_HEIGHT = LOGO_WIDTH * (254 / 325);

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
   const [loading, setLoading] = useState(false);

  const handleSignup = async () => {
    if (!email || !username || !password || !confirmPass) {
      return alert("Please fill all fields.");
    }
    if (password !== confirmPass) {
      return alert("Passwords do not match.");
    }
    if (password.length < 8) {
      alert("Password should be at least 8 characters.");
      return;
    }

   try {
      setLoading(true);
      const cred = await createUserWithEmailAndPassword(auth, email.trim(), password);

      if (cred.user) {
        await sendEmailVerification(cred.user);
      }

      alert("Account created! We've sent a verification email. Please verify before logging in.");
      navigation.navigate("Login");
    } catch (err: any) {
      console.log("Signup error:", err);
      alert(err.message || "Failed to sign up.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: C.background }]}>
      <View style={styles.container}>
        
        {/* Back Button */}
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
          Create your account
        </Text>

        <TextInput
          placeholder="Username"
          placeholderTextColor={C.textSecondary}
          style={[
            styles.input,
            { borderColor: C.border, color: C.textPrimary },
          ]}
          autoCapitalize="none"
          keyboardType="default"
          value={username}
          onChangeText={setUsername}
        />

        {/* Email Input */}
        <TextInput
          placeholder="Email"
          placeholderTextColor={C.textSecondary}
          style={[
            styles.input,
            { borderColor: C.border, color: C.textPrimary },
          ]}
          autoCapitalize="none"
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
        />

        {/* Password Input */}
        <TextInput
          placeholder="Password"
          placeholderTextColor={C.textSecondary}
          style={[
            styles.input,
            { borderColor: C.border, color: C.textPrimary },
          ]}
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />

        {/* Confirm Password Input */}
        <TextInput
          placeholder="Confirm Password"
          placeholderTextColor={C.textSecondary}
          style={[
            styles.input,
            { borderColor: C.border, color: C.textPrimary },
          ]}
          secureTextEntry
          value={confirmPass}
          onChangeText={setConfirmPass}
        />

        {/* Signup Button */}
        <PrimaryButton title="Sign Up" onPress={handleSignup} />

        {/* Footer */}
        <View style={styles.bottomRow}>
          <Text style={{ color: C.textSecondary }}>Already have an account? </Text>
          <TouchableOpacity onPress={() => navigation.navigate("Login")}>
            <Text style={{ color: C.primary, fontWeight: "600" }}>Log in</Text>
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
    width: 40,
  },
  heading: {
    fontSize: 30,
    fontWeight: "700",
    marginTop: 12,
    marginBottom: 28,
    textAlign: "center",
  },
  input: {
    borderWidth: 1,
    borderRadius: 16,
    paddingVertical: 16,
    paddingHorizontal: 16,
    fontSize: 16,
    marginBottom: 16,
  },
  bottomRow: {
    marginTop: 24,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default SignupScreen;
