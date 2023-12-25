import * as React from "react";
import Home from "../../screens/Home/Home";
import Quiz from "../../screens/Quiz/Quiz";
import Words from "../../screens/Words/Words";
import Settings from "../../screens/Settings/Settings";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Ionicons from "react-native-vector-icons/Ionicons";
function BottomTabNavigator() {
  const Tab = createBottomTabNavigator();
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: "#FFF",
          width: "100%",
          height: "10%",
          borderRadius: 15,
        },
      }}
    >
      <Tab.Screen
        name="Quiz"
        component={Quiz}
        options={{
          headerShown: false,
          tabBarIcon: () => (
            <FontAwesome color="#b8b4fc" name="check-square-o" size={32} />
          ),
        }}
      />

      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          headerShown: false,
          tabBarIcon: () => (
            <FontAwesome color="#b8b4fc" name="home" size={32} />
          ),
        }}
      />
      <Tab.Screen
        name="Words"
        component={Words}
        options={{
          headerShown: false,
          tabBarIcon: () => (
            <Ionicons color="#b8b4fc" name="file-tray-outline" size={32} />
          ),
        }}
      />

      <Tab.Screen
        name="Settings"
        component={Settings}
        options={{
          headerShown: false,
          tabBarIcon: () => (
            <FontAwesome name="cog" size={32} style={{ color: "#b8b4fc" }} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default BottomTabNavigator;
