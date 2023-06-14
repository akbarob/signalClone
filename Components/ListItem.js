import { View, Text, StyleSheet, Image } from "react-native";
import React, { useEffect, useState } from "react";
import { Avatar, ListItem } from "@rneui/themed";
import { useNavigation } from "@react-navigation/native";
import {
  collection,
  limit,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import { db } from "../Firebase";

export default function ListItems({ id, chatName }) {
  const [lastMessage, setLastMessage] = useState();
  const navigation = useNavigation();
  function enterChat({ id, chatName }) {
    navigation.navigate("Chat", { id, chatName });
  }
  useEffect(
    () =>
      onSnapshot(
        query(
          collection(db, "chats", id, "messages"),
          orderBy("timestamp", "desc"),
          limit(1)
          // where("usersMatched", "array-contains", userInfo.uid)
        ),
        (snapshot) =>
          setLastMessage(
            snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
          )
      ),
    []
  );

  return (
    <ListItem
      className=""
      onPress={() => enterChat({ id, chatName })}
      bottomDivider
    >
      <Avatar
        rounded
        source={{
          uri: "https://cdn.pixabay.com/photo/2020/09/18/05/58/lights-5580916__340.jpg",
        }}
        className="w-10 h-10 rounded-full"
      />

      <ListItem.Content>
        <ListItem.Title className="text-[#2c6bed]/80 font-bold mb-1">
          {chatName}
        </ListItem.Title>
        {lastMessage?.length < 1 ? (
          <ListItem.Subtitle numberOfLines={1} ellipsizeMode="tail">
            no messages yet
          </ListItem.Subtitle>
        ) : (
          <ListItem.Subtitle>
            {lastMessage?.map((item, i) => (
              <Text key={i}>{item.message}</Text>
            ))}
          </ListItem.Subtitle>
        )}
      </ListItem.Content>
    </ListItem>
  );
}
