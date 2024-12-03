//nav
import { useNavigation } from "@react-navigation/native";

//react
import { useState } from "react";

//styles
import { textStyles, colors } from "../styles";

//components
import { Button, StyleSheet, View, Text, Platform, Alert } from "react-native";
import { PrimaryButton, IconButton } from "../components/button";
import { CustomTextInput } from "../components/formField";
import { scaleHeight, scaleWidth } from "../components/dimensionScaling";

//firebase
import { auth } from "../../firebaseConfig";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { signInWithEmailAndPassword } from "firebase/auth";

export default SignUpScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSignUp = () => {
    if (password !== confirmPassword) {
      Alert.Alert("Error", "Passwords do not match!");
      return;
    }

    createUserWithEmailAndPassword(auth, email, password)
      .then(() => {
        Alert.alert("Success", "Account created!");
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
    dynamicContainer: {
      marginTop: Platform.OS === "ios" ? scaleHeight(46) : scaleHeight(26),
      marginLeft: scaleWidth(20),
    },
    header: {
      marginTop: scaleHeight(8),
    },
  });

  return (
    <View style={styles.backgroundContainer}>
      <View style={[styles.container, dynamicStyles.dynamicContainer]}>
        <IconButton
          onPress={() => navigation.goBack()}
          name="back"
          color={colors.w10}
        />
        <Text style={[dynamicStyles.header, textStyles.h4]}>Sign up</Text>
      </View>

      <CustomTextInput
        marginTop={18}
        placeholderText="Enter your email"
        labelText="Email"
        value={email}
        onChangeText={setEmail}
        width={353}
      />

      <CustomTextInput
        marginTop={20}
        placeholderText="Enter your password"
        labelText="Password"
        value={password}
        onChangeText={setPassword}
        width={353}
        secureTextEntry={true}
      />

      <CustomTextInput
        marginTop={20}
        placeholderText="Enter your password"
        labelText="Confirm Password"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        width={353}
        secureTextEntry={true}
      />

      <PrimaryButton
        onPress={handleSignUp}
        title="Create Account"
        marginTop={278}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  backgroundContainer: {
    alignSelf: "left",
  },
  container: {
    alignSelf: "left",
    alignItems: "left",
  },
});
