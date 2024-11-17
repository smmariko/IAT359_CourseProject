import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import logo from "../../assets/icons/foodielogo.png";

const SignUpScreen = ({ route, navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSignUp = () => {
    alert("Account Created");
  };

  return (
    <View style={styles.signUpContainer}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Text style={styles.backButton}>{"\u2190"}</Text>
      </TouchableOpacity>
      <Text style={styles.signupTitle}>Sign up</Text>
      <Text style={styles.signUpLabel}>Email</Text>
      <TextInput
        style={styles.input}
        placeholder="Email Address"
        placeholderTextColor="grey"
        value={email}
        onChangeText={setEmail}
      />
      <Text style={styles.signUpLabel}>Password</Text>
      <TextInput
        style={styles.input}
        placeholder="Password"
        placeholderTextColor="grey"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <Text style={styles.signUpLabel}>Confirm Password</Text>
      <TextInput
        style={styles.input}
        placeholder="Confirm Password"
        placeholderTextColor="grey"
        secureTextEntry
        value={confirmPassword}
        onChangeText={setConfirmPassword}
      />
      <TouchableOpacity style={styles.signupButton} onPress={handleSignUp}>
        <Text style={styles.createAccountText}>Create Account</Text>
      </TouchableOpacity>
    </View>
  );
};

export default SignUpScreen;

const styles = StyleSheet.create({
  input: {
    backgroundColor: "white",
    borderRadius: 10,
    paddingHorizontal: 15,
    marginTop: 5,
    height: 40,
  },
  loginButton: {
    backgroundColor: "#FF3D00",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 80,
  },
  loginText: {
    fontSize: 16,
    color: "white",
    fontWeight: "bold",
  },
  createAccountText: {
    fontSize: 16,
    color: "white",
    fontWeight: "bold",
  },
  signUpText: {
    color: "white",
    textAlign: "center",
    marginTop: 15,
    fontWeight: "bold",
  },
  backButton: {
    fontSize: 32,
    color: "black",
    marginBottom: 20,
  },
  signupButton: {
    backgroundColor: "#FF3D00",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 20,
  },
});
