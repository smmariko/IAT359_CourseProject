import React, { useState } from "react";
import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  Image,
  Alert,
} from "react-native";

//styles
import { colors, textStyles } from "../styles.js";
import { PrimaryButton, SecondaryButton } from "../components/button.js";
import { CustomTextInput } from "../components/formField.js";
import { scaleWidth, scaleHeight } from "../components/dimensionScaling.js";

//firebase
import { auth } from "../../firebaseConfig";
import { signInWithEmailAndPassword } from "firebase/auth";

//images
import logo from "../../assets/icons/foodielogo.png";
import backgroundImage from "../../assets/images/background_image.png";

export default LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        Alert.alert("Success", "User logged in!");
        navigation.reset({
          index: 0,
          routes: [{ name: "Home" }],
        });
      })
      .catch((error) => {
        Alert.alert("Error", error.message);
      });
  };

  //dynamic styles
  const dynamicStyles = StyleSheet.create({
    containerDynamic: {
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
    <View style={styles.backgroundContainer}>
      <ImageBackground source={backgroundImage} style={styles.backgroundImage}>
        <View style={[styles.container, dynamicStyles.containerDynamic]}>
          <Image source={logo} style={dynamicStyles.logo} />
          <Text
            style={[dynamicStyles.title, textStyles.h2, { color: colors.w0 }]}
          >
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
            secureTextEntry={true}
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
            }}
            title="Sign Up"
            marginTop={18}
          />
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
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
  },
});
