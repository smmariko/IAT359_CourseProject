import "react-native-get-random-values";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import LoginScreen from "./src/screens/LoginScreen.js";
import SignUpScreen from "./src/screens/SignUpScreen.js";
import HomeScreen from "./src/screens/HomeScreen.js";
import AddRestaurantScreen from "./src/screens/AddRestaurantScreen.js";
import RestaurantListScreen from "./src/screens/RestaurantListScreen.js";
import EditRestaurantScreen from "./src/screens/EditRestaurantScreen.js";
import { useFonts } from "expo-font";
import { Text } from "react-native";

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
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="AddRestaurant" component={AddRestaurantScreen} />
        <Stack.Screen name="RestaurantList" component={RestaurantListScreen} />
        <Stack.Screen name="EditRestaurant" component={EditRestaurantScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
