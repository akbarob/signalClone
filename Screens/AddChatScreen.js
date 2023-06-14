import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { useLayoutEffect } from "react";
import { useState } from "react";
import { Icon, Input } from "@rneui/base";
import { addDoc, collection, doc, serverTimestamp } from "firebase/firestore";
import { db } from "../Firebase";

export default function AddChatScreen({ navigation }) {
  const [input, setinput] = useState("");
  useLayoutEffect(() => {
    navigation.setOptions({
      title: "Add a new chat",
      headerBackTitle: "Chats",
      headerBackTitleVisible: false,
      headerBackTitleStyle: { color: "black" },
    });
  }, [navigation]);

  async function createChat() {
    // Add a new document with a generated id.
    try {
      const docRef = await addDoc(collection(db, "chats"), {
        chatname: input,
        timestamp: serverTimestamp(),
      });
      console.log("Document written with ID: ", docRef.id);
      navigation.replace("Home");
    } catch (error) {}
  }

  return (
    <View className="flex-1 my-2 mx-4">
      <Input
        placeholder="Enter a Chat name"
        value={input}
        onChangeText={(text) => setinput(text)}
        onSubmitEditing={createChat}
        leftIcon={
          <Icon name="wechat" type="antdesign" size={24} color="black" />
        }
      />

      <TouchableOpacity
        activeOpacity={0.5}
        onPress={createChat}
        className="bg-[#2c6bed] py-4 w-full "
      >
        {/* <SimpleLineIcons name="pencil" size={21} color="black" /> */}
        <Text className="text-center text-white font-semibold text-lg">
          Create new Chat
        </Text>
      </TouchableOpacity>
    </View>
  );
}
