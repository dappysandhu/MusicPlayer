import React from "react";
import {
  View,
  TextInput,
  StyleSheet,
  TextInputProps,
  Text,
} from "react-native";
import { useColorScheme } from "react-native";
import { Colors } from "../../constants/theme";
import { Ionicons } from "@expo/vector-icons";

type Props = TextInputProps & {
  label?: string;
  icon?: keyof typeof Ionicons.glyphMap;
  rightIcon?: keyof typeof Ionicons.glyphMap;
  onRightIconPress?: () => void;
};

const TextField: React.FC<Props> = ({
  label,
  icon,
  rightIcon,
  onRightIconPress,
  style,
  ...rest
}) => {
  const scheme = useColorScheme() || "dark";
  const C = Colors[scheme];

  return (
    <View style={styles.container}>
      {label && <Text style={[styles.label, { color: C.textSecondary }]}>{label}</Text>}
      <View
        style={[
          styles.inputWrapper,
          { backgroundColor: C.inputBackground, borderColor: C.border },
        ]}
      >
        {icon && (
          <Ionicons
            name={icon}
            size={20}
            color={C.textSecondary}
            style={styles.leftIcon}
          />
        )}
        <TextInput
          placeholderTextColor={C.textSecondary}
          style={[
            styles.input,
            { color: C.textPrimary },
            icon && { paddingLeft: 8 },
            style,
          ]}
          {...rest}
        />
        {rightIcon && (
          <Ionicons
            name={rightIcon}
            size={20}
            color={C.textSecondary}
            style={styles.rightIcon}
            onPress={onRightIconPress}
          />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 14,
  },
  label: {
    fontSize: 13,
    marginBottom: 6,
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 14,
    borderWidth: 1,
    paddingHorizontal: 14,
    height: 52,
  },
  leftIcon: {
    marginRight: 4,
  },
  rightIcon: {
    marginLeft: 6,
  },
  input: {
    flex: 1,
    fontSize: 15,
  },
});

export default TextField;
