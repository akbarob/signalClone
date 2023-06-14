import {
  View,
  Text,
  ActivityIndicator,
  StyleSheet,
  Button,
  TouchableOpacity,
} from "react-native";
import React, { useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { Image, Input, Icon } from "@rneui/themed";
import { useState } from "react";
import { auth } from "../Firebase";
import { onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function signIn() {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        // ...
        alert("signIn success");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        alert(errorMessage);
      });
  }

  //check for user

  useEffect(
    () =>
      onAuthStateChanged(auth, (user) => {
        if (user) {
          // User is signed in, see docs for a list of available properties
          // https://firebase.google.com/docs/reference/js/auth.user
          const uid = user.uid;
          console.log(uid);
          // ...
          navigation.replace("Home");
        } else {
          // User is signed out
          // ...
          console.log("no user");
        }
      }),
    []
  );
  const disabled = !email || !password;
  return (
    <View className="flex-1  items-center justify-center p-10 bg-white">
      <StatusBar style="auto" />

      <Image
        source={{
          uri: "https://play-lh.googleusercontent.com/jCln_XT8Ruzp7loH1S6yM-ZzzpLP1kZ3CCdXVEo0tP2w5HNtWQds6lo6aLxLIjiW_X8=w240-h480-rw",
        }}
        style={{ width: 200, height: 200, borderRadius: 10, marginBottom: 60 }}
        PlaceholderContent={<ActivityIndicator />}
      />
      <View className="w-[100%]">
        <Input
          value={email}
          onChangeText={(text) => setEmail(text)}
          placeholder="Email"
          // autoFocus
          type="email"
          leftIcon={<Icon name="person" size={24} color="black" />}
        />
        <Input
          value={password}
          onChangeText={(text) => setPassword(text)}
          secureTextEntry
          placeholder="password"
          leftIcon={
            <Icon name="lock" size={24} color="black" type="password" />
          }
          onSubmitEditing={() => signIn()}
          // onEndEditing={() => signIn()}
        />
      </View>
      <TouchableOpacity
        disabled={!email || !password}
        title="Login"
        onPress={() => signIn()}
        className={`${
          !disabled ? "border-[#2c6bed]" : "border-gray-200"
        } my-6 px-8 py-2 rounded-lg border-2  w-[150px]`}
      >
        <Text
          className={` ${
            !disabled ? "text-[#2c6bed]" : "text-gray-200"
          } text-center font-semibold text-xl`}
        >
          Login
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        title="Register"
        type="outline"
        onPress={() => navigation.navigate("Register")}
        className="bg-[#2c6bed] px-8 py-3 rounded-lg w-[150px]"
      >
        <Text className="text-center font-semibold text-xl text-white">
          Register
        </Text>
      </TouchableOpacity>
    </View>
  );
}

// const styles = StyleSheet.create({
//   inputContainer: { width: 300, marginTop: 30 },
// });
