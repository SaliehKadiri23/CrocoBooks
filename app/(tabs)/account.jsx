import { View, Text, SafeAreaView, TouchableOpacity } from "react-native";
import { StatusBar } from "expo-status-bar";
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
        <Text className="text-center mt-7 my-2 pb-3 text-3xl font-bold border-b-2 border-b-gray-400">
          Hello There, User
        </Text>

        <View className="w-full">
          <Link href="/home" asChild>
            <TouchableOpacity className="flex flex-row justify-center items-center mt-10 pb-3 border-b-2 border-b-gray-300">
              <MaterialCommunityIcons
                name="book-open-blank-variant"
                size={45}
                color="blue"
              />
              <Text className="text-2xl ml-1 text-blue-800 font-bold ">
                {" "}
                All Books : {bookList.length}
              </Text>
            </TouchableOpacity>
          </Link>
          <Link href="/favorites" asChild>
            <TouchableOpacity className="flex flex-row justify-center items-center mt-10 pb-3 border-b-2 border-b-gray-300">
              <MaterialCommunityIcons
                name="heart-circle"
                size={45}
                color={"red"}
              />
              <Text className="text-2xl ml-1 text-red-600 font-bold ">
                {" "}
                Favorite Books : {favoriteBookList.length}
              </Text>
            </TouchableOpacity>
          </Link>
          <Link href="/cart" asChild>
            <TouchableOpacity className="flex flex-row justify-center items-center mt-10 pb-3 border-b-2 border-b-gray-300">
              <AntDesign name="shoppingcart" size={40} color="green" />
              <Text className="text-2xl ml-1 text-green-600 font-bold ">
                {" "}
                Books in Cart : {cartBookList.length}
              </Text>
            </TouchableOpacity>
          </Link>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default account;
