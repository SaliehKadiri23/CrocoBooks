import { View, Text, SafeAreaView, TouchableOpacity } from "react-native";
import { StatusBar } from "expo-status-bar";
import Entypo from "@expo/vector-icons/Entypo";
import React from "react";
import "../../global.css";
import { Link } from "expo-router";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import AntDesign from "@expo/vector-icons/AntDesign";
import { useDispatch, useSelector } from "react-redux";

const account = () => {
  const {
    searchBookText,
    bookCategories,
    editBookDetails,
    activeBookCategory,
    bookList,
    favoriteBookList,
    cartBookList,
  } = useSelector((state) => state.book);

  const { newBookScreen, editBookScreen, loadingScreen } = useSelector(
    (state) => state.screen
  );
  const dispatch = useDispatch();

  return (
    <SafeAreaView className="flex-1 bg-black">
      <StatusBar style="auto" />
      <View className="w-full flex-1  bg-white">
        <View className="mt-7 border-b-2 border-b-gray-400"><Text className="text-center my-10 text-3xl font-bold">
          Hello There, User
        </Text></View>

        <View className="w-full">
          <Link href="/home" asChild>
            <TouchableOpacity className="flex pl-3 flex-row justify-start items-center mt-5 pb-3 border-b-2 border-b-gray-300">
              <MaterialCommunityIcons
                name="book-open-blank-variant"
                size={45}
                color="blue"
              />
              <Text className="text-2xl ml-1 text-blue-800 font-bold ">
                {" "}
                All Books <Entypo name="arrow-long-right" size={24} className="px-1"  /> {bookList.length}
              </Text>
            </TouchableOpacity>
          </Link>
          <Link href="/favorites" asChild>
            <TouchableOpacity className="flex pl-3 mt-5 flex-row justify-start items-center pb-3 border-b-2 border-b-gray-300">
              <MaterialCommunityIcons
                name="heart-circle"
                size={45}
                color={"red"}
              />
              <Text className="text-2xl ml-1 text-red-600 font-bold ">
                {" "}
                Favorite Books <Entypo name="arrow-long-right" size={24} className="px-1"  /> {favoriteBookList.length}
              </Text>
            </TouchableOpacity>
          </Link>
          <Link href="/cart" asChild>
            <TouchableOpacity className="flex pl-3 flex-row justify-start items-center mt-5 pb-3 border-b-2 border-b-gray-300">
              <AntDesign name="shoppingcart" size={40} color="green" />
              <Text className="text-2xl ml-1 text-green-600 font-bold ">
                {" "}
                Books in Cart <Entypo name="arrow-long-right" size={24} className="px-1"  /> {cartBookList.length}
              </Text>
            </TouchableOpacity>
          </Link>
          <TouchableOpacity className="relative ml-2 mt-10">
            <Text className="font-bold text-xl">For Support Contact : </Text>
            <View className="pl-7 text-lg gap-3 mt-2">
              <Text className="text-lg font-semibold">Email:  saliehkadiri79@gmail.com </Text>
              <Text className="text-lg font-semibold">Phone:  +234 90 3778 6418 </Text>
              </View>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default account;
