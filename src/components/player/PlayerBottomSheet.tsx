import React, { useRef, useMemo } from "react";
import { View, StyleSheet } from "react-native";
import BottomSheet from "@gorhom/bottom-sheet";
import MiniPlayer from "./MiniPlayer";
import PlayerScreen from "../../screens/player/PlayerScreen";

export default function PlayerBottomSheet() {
  const sheetRef = useRef<BottomSheet>(null);

  const snapPoints = useMemo(() => ["12%", "92%"], []);

  const openFull = () => sheetRef.current?.snapToIndex(1);
  const closeFull = () => sheetRef.current?.snapToIndex(0);

  return (
    <View style={styles.wrapper} pointerEvents="box-none">
      <BottomSheet
        ref={sheetRef}
        index={0}
        snapPoints={snapPoints}
        enablePanDownToClose={false}
        backgroundStyle={{ backgroundColor: "#000" }}
        handleIndicatorStyle={{ backgroundColor: "#555" }}
      >
        <MiniPlayer onExpand={openFull} />

        <View style={{ flex: 1 }}>
          <PlayerScreen onCollapse={closeFull} />
        </View>
      </BottomSheet>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    top: 0,
    zIndex: 999,
    pointerEvents: "box-none",
  },
});
