import React, { useState } from "react";
import { View, Text, StyleSheet, Image, ImageBackground } from "react-native";
import { useNavigation } from "@react-navigation/native";
import logo from "../../assets/icons/foodielogo.png";
import backgroundImage from "../../assets/images/background_image.png";
import { colors, textStyles } from "../styles.js";
import { PrimaryButton, SecondaryButton } from "../components/button.js";
import { CustomTextInput } from "../components/formField.js";
import { scaleWidth, scaleHeight } from "../components/dimensionScaling.js";

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    alert("User Logged In");
  };

  //styles that change based on device dimension
  const oldStyle = StyleSheet.create({
    // container: { flex: 1, justifyContent: "center" },
    backgroundImage: {
      width: "100%",
      height: "100%",
    },
    backgroundContainer: {
      width: "100%",
      height: "100%",
    },

    container: {
      alignSelf: "center",
      alignItems: "center",
      marginTop: scaleHeight(167),
    },
    logo: {
      width: scaleWidth(124),
      height: scaleHeight(124),
    },
    title: {
      marginTop: scaleHeight(10),
    },
    inputEmail: {
      marginTop: scaleHeight(18),
    },
    inputPassword: {
      marginTop: scaleHeight(20),
    },
  });

  return (
    <View style={oldStyle.backgroundContainer}>
      <ImageBackground
        source={backgroundImage}
        style={oldStyle.backgroundImage}
      >
        <View style={oldStyle.container}>
          <Image source={logo} style={oldStyle.logo} />

          <Text style={[oldStyle.title, textStyles.h2, { color: colors.w0 }]}>
            Foodie
          </Text>

          <CustomTextInput
            marginTop={18}
            placeholderText="Enter your email"
            labelText="Email"
            labelTextColor={colors.w0}
            value={email}
            onChangeText={setEmail}
            width={295}
          />

          <CustomTextInput
            marginTop={20}
            placeholderText="Enter your password"
            labelText="Password"
            labelTextColor={colors.w0}
            value={password}
            onChangeText={setPassword}
            width={295}
          />

          <PrimaryButton
            onPress={handleLogin}
            title="Login"
            marginTop={110}
            paddingHorizontal={37.5}
          />

          <SecondaryButton
            onPress={() => {
              navigation.navigate("SignUp");
              console.log("It ran");
            }}
            title="Sign Up"
            marginTop={18}
          />
        </View>
      </ImageBackground>
    </View>
  );
};

export default LoginScreen;
