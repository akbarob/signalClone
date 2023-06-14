import { View, Text, ActivityIndicator, Image } from "react-native";
import React from "react";
import { Avatar } from "@rneui/base";
import { auth } from "../Firebase";

export default function Reciever({ message, displayName }) {
  return (
    <View className="flex-col space-x-2 items-start mx-2 my-2 relative px-2">
      <Image
        rounded
        source={{
          uri: auth?.currentUser?.photoURL
            ? auth?.currentUser?.photoURL
            : "https://cdn.pixabay.com/photo/2020/09/18/05/58/lights-5580916__340.jpg",
        }}
        className="absolute bottom-3 -left-1 w-[25px] h-[25px] z-50 rounded-full"
        placeholder={<ActivityIndicator />}
      />
      <View className="text-white bg-[#2c6bed] p-2 rounded-lg rounded-tl-none ">
        <Text className="text-white">{message}</Text>
      </View>
      <View className="pl-3">
        <Text className="text-[10px] mb-1">{displayName}</Text>
        <Text className="text-black text-[10px] -mt-1  ">
          {new Intl.DateTimeFormat("en-GB", {
            timeStyle: "short",
          }).format(message?.timestamp)}
        </Text>
      </View>
    </View>
  );
}
