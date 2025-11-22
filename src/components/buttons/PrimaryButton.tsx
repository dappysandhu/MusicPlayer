import React from "react";
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ActivityIndicator,
  GestureResponderEvent,
} from "react-native";
import { useColorScheme } from "react-native";
import { Colors } from "../../constants/theme";

type Props = {
  title: string;
  onPress?: (event: GestureResponderEvent) => void;
  fullWidth?: boolean;
  outline?: boolean;
  loading?: boolean;
};

const PrimaryButton: React.FC<Props> = ({
  title,
  onPress,
  fullWidth = true,
  outline = false,
  loading = false,
}) => {
  const scheme = useColorScheme() || "dark";
  const C = Colors[scheme];

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.85}
      style={[
        styles.button,
        { width: fullWidth ? "100%" : undefined },
        outline
          ? {
              backgroundColor: "transparent",
              borderColor: C.primary,
              borderWidth: 1,
            }
          : { backgroundColor: C.primary },
      ]}
      disabled={loading}
    >
      {loading ? (
        <ActivityIndicator color="#000" />
      ) : (
        <Text
          style={[
            styles.title,
            { color: outline ? C.primary : "#000", fontFamily: "System" },
          ]}
        >
          {title}
        </Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingVertical: 16,
    borderRadius: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 16,
    fontWeight: "600",
    letterSpacing: 0.4,
  },
});

export default PrimaryButton;
