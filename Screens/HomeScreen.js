import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  FlatList,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { signOut } from "firebase/auth";
import { auth, db } from "../Firebase";
import ListItems from "../Components/ListItem";
import { Avatar, Icon } from "@rneui/base";
import { AntDesign, SimpleLineIcons } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";

export default function HomeScreen({ navigation }) {
  const [chats, setchats] = useState([]);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: "Signal",
      headerStyle: { backgroundColor: "white" },
      headerTitleStyle: { color: "black" },
      headerLeft: () => (
        <TouchableOpacity className="mr-1" activeOpacity={0.5} onPress={LogOut}>
          <Avatar
            rounded
            source={{
              uri: auth?.currentUser?.photoURL
                ? auth?.currentUser?.photoURL
                : "https://cdn.pixabay.com/photo/2020/09/18/05/58/lights-5580916__340.jpg",
            }}
            placeholderStyle={<ActivityIndicator />}
          />
        </TouchableOpacity>
      ),
      headerRight: () => (
        <View className="flex flex-row justify-between w-[80px] mr-2">
          <TouchableOpacity activeOpacity={0.5}>
            <AntDesign name="camerao" size={24} color="black" />
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.5}
            onPress={() => navigation.navigate("AddChat")}
          >
            <SimpleLineIcons name="pencil" size={21} color="black" />
          </TouchableOpacity>
        </View>
      ),
    });
  }, [navigation]);

  useEffect(
    () =>
      onSnapshot(
        query(
          collection(db, "chats"),
          orderBy("timestamp", "desc")
          // where("usersMatched", "array-contains", userInfo.uid)
        ),
        (snapshot) =>
          setchats(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })))
      ),
    []
  );

  function LogOut() {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        alert("signed out");
        navigation.replace("Login");
      })
      .catch((error) => {
        // An error happened.
        console.log("error", error);
      });
  }

  return (
    <SafeAreaView className="flex-1 ">
      <StatusBar style="auto" />

      <FlatList
        className=" bg-white"
        data={chats}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <ListItems id={item.id} chatName={item.chatname} />
        )}
      />
    </SafeAreaView>
  );
}
