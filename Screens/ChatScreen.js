import {
  View,
  Text,
  SafeAreaView,
  ActivityIndicator,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Keyboard,
  FlatList,
  TouchableWithoutFeedback,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useLayoutEffect } from "react";
import { Avatar } from "@rneui/base";
import { auth, db } from "../Firebase";
import { AntDesign, FontAwesome, Ionicons } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
import {
  addDoc,
  collection,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
} from "firebase/firestore";
import Sender from "../Components/Sender";
import Reciever from "../Components/Reciever";

export default function ChatScreen({ route, navigation }) {
  const [input, setinput] = useState("");
  const [messages, setmessages] = useState([]);
  const { id, chatName } = route.params;


  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerBackVisible: false,
      //   headerBackTitle: "",
      headerLeft: () => (
        <TouchableOpacity className="mr-6" onPress={navigation.goBack}>
          <AntDesign name="arrowleft" size={24} color="white" />
        </TouchableOpacity>
      ),
      headerRight: () => (
        <View className="flex-row justify-between items-center w-[80px]">
          <TouchableOpacity className="mr-6" onPress={navigation.goBack}>
            <FontAwesome name="video-camera" size={24} color="white" />
          </TouchableOpacity>
          <TouchableOpacity className="mr-6" onPress={navigation.goBack}>
            <Ionicons name="call" size={24} color="white" />
          </TouchableOpacity>
        </View>
      ),
      headerTitle: () => (
        <View className="flex-row justify-center items-center space-x-2">
          <Avatar
            rounded
            source={{
              uri: auth?.currentUser?.photoURL
                ? auth?.currentUser?.photoURL
                : "https://cdn.pixabay.com/photo/2020/09/18/05/58/lights-5580916__340.jpg",
            }}
            placeholderStyle={<ActivityIndicator />}
          />
          <Text className="text-white font-semibold">{chatName}</Text>
        </View>
      ),
    });
  }, []);

  async function sendMessage() {
    try {
      const docRef = await addDoc(collection(db, "chats", id, "messages"), {
        timestamp: serverTimestamp(),
        message: input,
        displayName: auth.currentUser.displayName,
        email: auth.currentUser.email,
        senderId: auth.currentUser.uid,
        photoURL: auth?.currentUser?.photoURL
          ? auth?.currentUser?.photoURL
          : "https://cdn.pixabay.com/photo/2020/09/18/05/58/lights-5580916__340.jpg",
      });
     
      setinput("");
      Keyboard.dismiss();
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(
    () =>
      onSnapshot(
        query(
          collection(db, "chats", id, "messages"),
          orderBy("timestamp", "asc")
          // where("usersMatched", "array-contains", userInfo.uid)
        ),
        (snapshot) =>
          setmessages(
            snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
          )
      ),
    []


  return (
    <SafeAreaView className="flex-1 ">
      <StatusBar style="light" />
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <FlatList
          data={messages}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) =>
            auth.currentUser.uid === item.senderId ? (
              <Sender message={item.message} displayName={item.displayName} />
            ) : (
              <Reciever message={item.message} displayName={item.displayName} />
            )
          }
        />
      </TouchableWithoutFeedback>

      <View className="flex-row justify-between space-x-2 items-center px-2 mb-1">
        <TextInput
          className="flex-1 bg-gray-300 h-[50px] rounded-[30px] indent-3 pl-4"
          placeholder="signal message"
          value={input}
          onChangeText={(text) => setinput(text)}
          onSubmitEditing={() => sendMessage()}
        />
        <TouchableOpacity activeOpacity={0.6} onPress={() => sendMessage()}>
          <Ionicons name="send" size={24} color="#2b68e6" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
