import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../screens/home/HomeScreen";
import ExploreScreen from "../screens/explore/ExploreScreen";
import LibraryScreen from "../screens/library/LibraryScreen";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";


type IoniconName = React.ComponentProps<typeof Ionicons>["name"];


type RootTabParamList = {
    Home: undefined;
    Explore: undefined;
    Library: undefined;
};

const Tab = createBottomTabNavigator<RootTabParamList>();

export default function BottomTabs() {
    return (
       <Tab.Navigator
  id={undefined}
  screenOptions={({ route }) => ({
    headerShown: false,

    tabBarStyle: {
      backgroundColor: "transparent",
      borderTopWidth: 0,
      height: 60,
      position: "absolute",
      elevation: 0,
    },

    tabBarBackground: () => (
      <LinearGradient
        colors={["transparent", "rgba(0,0,0,0.85)", "rgba(0,0,0,1)"]}
        style={{ flex: 1 }}
      />
    ),

    tabBarActiveTintColor: "#1ed760",
    tabBarInactiveTintColor: "#888",

    tabBarIcon: ({ color }) => {
      let iconName: IoniconName;

      switch (route.name) {
        case "Home":
          iconName = "home-outline";
          break;
        case "Explore":
          iconName = "search-outline";
          break;
        case "Library":
          iconName = "library-outline";
          break;
        default:
          iconName = "home-outline";
      }

      return <Ionicons name={iconName} size={22} color={color} />;
    },
  })}
>
  <Tab.Screen name="Home" component={HomeScreen} />
  <Tab.Screen name="Explore" component={ExploreScreen} />
  <Tab.Screen name="Library" component={LibraryScreen} />
</Tab.Navigator>

    );
}
