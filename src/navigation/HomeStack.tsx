import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import HomeScreen from "../screens/home/HomeScreen";
import PlaylistScreen from "../screens/player/PlaylistScreen";
import PlayerScreen from "../screens/player/PlayerScreen";
import QueueScreen from "../screens/player/QueueScreen";

const Stack = createNativeStackNavigator();

export default function HomeStack() {
    return (
        <Stack.Navigator id={undefined} screenOptions={{ headerShown: false }}>
            <Stack.Screen name="HomeMain" component={HomeScreen} />
            <Stack.Screen name="Playlist" component={PlaylistScreen} />
            <Stack.Screen name="Player" component={PlayerScreen} />
            <Stack.Screen name="Queue" component={QueueScreen} />
        </Stack.Navigator>
    );
}
