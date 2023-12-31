import React, { useContext, useEffect, useState } from "react";

import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import LoginScreen from "./src/screens/Login/Login";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import BottomTabNavigator from "./src/components/BottomTabNavigator/BottomTabNavigator";
import Register from "./src/screens/Register/Register";

import Home from "./src/screens/Home/Home";
import ContextProvider from "./src/Context/Context";
import Quizs from "./src/screens/Quizs/Quizs";
import Quiz from "./src/screens/Quiz/Quiz";
import { Context } from "./src/Context/Context";
import { Provider } from "react-native-paper";
import Words from "./src/screens/Words/Words";
import { LogBox } from "react-native";
import Admin from "./src/screens/Admin/Admin";
LogBox.ignoreLogs([
  "Can't perform a React state update on an unmounted component.",
]);
const Stack = createNativeStackNavigator();
const App = () => {
  useEffect(() => {}, []);
  const [initializing, setInitializing] = useState(true);

  const AuthStack = () => {
    return (
      <Stack.Navigator>
        <Stack.Screen
          name="Login"
          options={{
            headerShown: false,
            presentation: "fullScreenModal",
          }}
          component={LoginScreen}
        />
        <Stack.Screen
          name="Register"
          options={{
            headerShown: false,
            presentation: "fullScreenModal",
          }}
          component={Register}
        />
      </Stack.Navigator>
    );
  };

  const AuthenticatedStack = () => {
    return (
      <Stack.Navigator>
          <Stack.Screen
          name="BottomTabNavigator"
          options={{ headerShown: false }}
          component={BottomTabNavigator}
        />
          <Stack.Screen
            name="Quiz"
            options={{ headerShown: false }}
            component={Quiz}
          />
        <Stack.Screen
          name="Quizs"
          options={{ headerShown: false }}
          component={Quizs}
        />
        
        <Stack.Screen
          name="Words"
          options={{ headerShown: false }}
          component={Words}
        />
        <Stack.Screen
          name="Home"
          options={{ headerShown: false }}
          component={Home}
        />
      
      </Stack.Navigator>
    );
  };

  const AdminStack = () => {
    return (
      <Stack.Navigator>
        
        <Stack.Screen
          name="Admin"
          options={{ headerShown: false }}
          component={Admin}
        />
      
      </Stack.Navigator>
    );
  };

  const Navigation = () => {
    const context = useContext(Context);
    return (
      <NavigationContainer>
        <Provider>
          {context.isAuthenticated ? (context.user.displayName == "admin" ? <AdminStack /> : <AuthenticatedStack />) : <AuthStack />}
        </Provider>
      </NavigationContainer>
    );
  };
  return (
    <ContextProvider>
      <Navigation />
    </ContextProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default App;
