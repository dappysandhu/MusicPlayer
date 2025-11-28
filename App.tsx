import { NavigationContainer, DefaultTheme, Theme } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { useColorScheme } from "react-native";
import { Colors } from "./src/constants/theme";
import AuthStacks from "./src/navigation/AuthStacks";
import BottomTabs from "./src/navigation/BottomTabs";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./src/services/firebase";

export default function App() {
  const scheme = useColorScheme() || "dark";
  const C = Colors[scheme];

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const navTheme: Theme = {
    ...DefaultTheme,
    dark: scheme === "dark",
    colors: {
      ...DefaultTheme.colors,
      background: C.background,
      primary: C.primary,
      card: C.background,
      text: C.textPrimary,
      border: C.border,
      notification: C.primary,
    },
  };

  // Listen for login / logout changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (usr) => {
      setUser(usr);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  if (loading) return null; // splash screen placeholder

  return (
    <NavigationContainer theme={navTheme}>
      {user ? <BottomTabs /> : <AuthStacks />}
    </NavigationContainer>
  );
}
