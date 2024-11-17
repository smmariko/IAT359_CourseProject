import React from "react";
import { Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import LoginScreen from "./src/screens/LoginScreen";
import SignUpScreen from "./src/screens/SignUpScreen";
import { useFonts } from "expo-font";

const Stack = createStackNavigator();

export default function App() {
  const [fontsLoaded] = useFonts({
    "GT-Walsheim-Bold": require("./assets/fonts/GT-Walsheim-Bold-Trial.otf"),
    "GT-Walsheim-Medium": require("./assets/fonts/GT-Walsheim-Medium-Trial.otf"),
    "GT-Walsheim-Regular": require("./assets/fonts/GT-Walsheim-Regular-Trial.otf"),
  });
  // Wait for the fonts to be loaded before rendering the component
  if (!fontsLoaded) {
    return <Text>Loading...</Text>; // Or a loading screen
  }

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Login"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="SignUp" component={SignUpScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
