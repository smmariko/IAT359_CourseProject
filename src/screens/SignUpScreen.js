import { createUserWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
//styles
import { textStyles } from "../styles";
//components
import { StyleSheet, View, Text } from "react-native";
import { PrimaryButton, IconButton } from "../components/button";
import { CustomTextInput } from "../components/formField";
import { scaleHeight, scaleWidth } from "../components/dimensionScaling";

export default SignUpScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSignUp = () => {
    if (password !== confirmPassword) {
      Alert.alert("Error", "Passwords do not match!");
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
      marginTop: scaleHeight(26),
      marginLeft: scaleWidth(20),
    },
    header: {
      marginTop: scaleHeight(30),
    },
  });

  const styles = StyleSheet.create({
    backgroundContainer: {
      alignSelf: "left",
    },
    container: {
      borderWidth: 2, // Width of the border
      borderColor: "red", // Color of the border
      alignSelf: "left",
      alignItems: "left",
    },
  });

  return (
    <View style={styles.backgroundContainer}>
      <View style={[styles.container, dynamicStyles.dynamicContainer]}>
        <IconButton
          onPress={() => navigation.goBack()}
          iconImage="./assets/icons/app-icons/Type=Back,Checked=False.svg"
        />
        <Text style={[dynamicStyles.header, textStyles.h4]}>Sign up</Text>
      </View>
      <CustomTextInput
        placeholderText="Enter your email"
        labelText="Email"
        value={email}
        onChangeText={setEmail}
        width={353}
      />

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
