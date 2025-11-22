import { NavigationContainer, DefaultTheme, Theme } from "@react-navigation/native";
import React from "react";
import { useColorScheme } from "react-native";
import { Colors } from "./src/constants/theme";

import AuthStacks from "./src/navigation/AuthStacks";

export default function App() {
  const scheme = useColorScheme() || "dark";
  const C = Colors[scheme];

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

  return (
    <NavigationContainer theme={navTheme}>
      <AuthStacks />
    </NavigationContainer>
  );
}
