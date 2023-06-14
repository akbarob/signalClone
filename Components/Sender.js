import { View, Text, Image, ActivityIndicator } from "react-native";
import React from "react";
import { auth } from "../Firebase";

export default function Sender({ message }) {
  return (
    <View className="items-end mx-2 my-2 relative">
      <Image
        rounded
        source={{
          uri: auth?.currentUser?.photoURL
            ? auth?.currentUser?.photoURL
            : "https://cdn.pixabay.com/photo/2020/09/18/05/58/lights-5580916__340.jpg",
        }}
        className="absolute -bottom-3 -right-1 w-[25px] h-[25px] z-50 rounded-full"
        placeholder={<ActivityIndicator />}
      />
      <View className="text-white bg-slate-200 p-2 rounded-lg rounded-tr-none ">
        <Text className="text-black">{message}</Text>
      </View>

      <Text className="text-black text-[10px] mr-6 ">
        {new Intl.DateTimeFormat("en-GB", {
          timeStyle: "short",
        }).format(message?.timestamp)}
      </Text>
    </View>
  );
}
