import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { Image, Button, Input, Icon } from "@rneui/themed";
import { useState } from "react";
import { useLayoutEffect } from "react";
import { auth } from "../Firebase";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";

export default function RegisterScreen({ navigation }) {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const [imageURL, setImageURL] = useState("");

  function Register() {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredentials) => {
        //sign in
        const user = userCredentials.user;
        updateProfile(auth.currentUser, {
          displayName: fullName,
        })
          .then(() => {
            alert("Profile Updated");
          })
          .catch((error) => {
            // An error occurred
            // ...
            alert("while updateing", error.message);
          });
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        alert("while creating", errorMessage);
        // ..
      });

    console.log("registerd", fullName);
  }

  useLayoutEffect(() => {
    navigation.setOptions({
      headerBackTitle: "Login",
    });
  }, [navigation]);

  return (
    <View className="flex-1 justify-center items-center bg-white">
      <Text className="font-bold text-3xl mb-20">Create an account </Text>
      <View className="w-[300px]">
        <Input
          value={fullName}
          onChangeText={(text) => setFullName(text)}
          placeholder="Full Name"
          // autoFocus
          type="text"
          leftIcon={<Icon name="person" size={24} color="black" />}
        />
        <Input
          value={email}
          onChangeText={(text) => setEmail(text)}
          placeholder="Email"
          type="email"
          leftIcon={<Icon name="person" size={24} color="black" />}
        />
        <Input
          value={password}
          secureTextEntry
          onChangeText={(text) => setPassword(text)}
          placeholder="password"
          type="password"
          leftIcon={<Icon name="person" size={24} color="black" />}
        />

        <Button raised title="Register" onPress={() => Register()} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  inputContainer: { width: 300, marginTop: 30 },
  button: { width: 200, marginTop: 10 },
});
