import React, { useContext, useEffect } from "react";
import {
  SafeAreaView,
  ScrollView,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import BookCard from "../../components/BookCard";
import Toast from "react-native-toast-message";
import "../../global.css";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { useDispatch, useSelector } from "react-redux";
import { StatusBar } from "react-native";
import { setActiveBookCategory } from "../../store/features/book/bookSlice";
import { getBookList } from "../../api/routes";

const home = () => {
  const {
    searchBookText,
    setSearchBookText,
    bookCategories,
    activeBookCategory,
    bookList,
  } = useSelector((state) => state.book);

  const { newBookScreen, editBookScreen, loadingScreen } = useSelector(
    (state) => state.screen
  );

  const dispatch = useDispatch();
  return (
    <SafeAreaView className="flex-1 flex-col justify-center  ">
      <StatusBar backgroundColor="gray" />
      <ScrollView className="mt-7 bg-white">
        {/* Header */}
        <View className="w-full flex-col justify-center py-2 border-b-2 border-gray-200 items-center">
          <Text className="text-3xl font-bold">Croco Books</Text>
          <Text className="italic text-sm">
            Discover your next favorite book...
          </Text>
        </View>

        {/* Search Bar */}
        <View className="flex-row mt-4 mx-3 items-center bg-gray-100 rounded-full px-4 py-1 mb-4">
          <MaterialCommunityIcons name="magnify" size={25} color="#6B7280" />
          <TextInput
            keyboardType="search"
            className="flex-1 ml-3 text-gray-800 outline-0"
            placeholder="Search books, authors..."
            placeholderTextColor="#9CA3AF"
            value={searchBookText}
            onChangeText={dispatch(setSearchBookText("j"))}
          />
          {searchBookText.length > 0 && (
            <TouchableOpacity onPress={dispatch(setSearchBookText(""))}>
              <MaterialCommunityIcons
                name="close-circle"
                size={20}
                color="#6B7280"
              />
            </TouchableOpacity>
          )}
        </View>

        {/* Category Filter */}
        <View className="w-full flex justify-center items-center mb-5">
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            className="flex-row w-[90%] mx-4"
          >
            {bookCategories.map((category) => (
              <TouchableOpacity
                key={category}
                className={`px-4 py-2 rounded-full mr-3 ${
                  activeBookCategory === category
                    ? "bg-blue-500"
                    : "bg-gray-200"
                }`}
                onPress={() => dispatch(setActiveBookCategory(category))}
              >
                <Text
                  className={`font-medium ${
                    activeBookCategory === category
                      ? "text-white"
                      : "text-gray-600"
                  }`}
                >
                  {category}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Action Buttons */}
        <View className="flex-row justify-around py-4 bg-white border-t border-b border-gray-100">
          <TouchableOpacity
            className="bg-emerald-500 px-6 py-3 rounded-full flex-row items-center"
            onPress={getBookList}
          >
            <MaterialCommunityIcons name="refresh" size={20} color="white" />
            <Text className="text-white font-semibold ml-2">Refresh Books</Text>
          </TouchableOpacity>

          <TouchableOpacity
            className="bg-purple-500 px-6 py-3 rounded-full flex-row items-center"
            onPress={() => setNewBookScreen(true)}
          >
            <MaterialCommunityIcons name="plus" size={20} color="white" />
            <Text className="text-white font-semibold ml-2">Add Book</Text>
          </TouchableOpacity>
        </View>

        {newBookScreen && <AddNewBook setNewBookScreen={setNewBookScreen} />}
        {editBookScreen && <EditBook editBookDetails={editBookDetails} />}

        {/* Book List */}
        {loadingScreen ? (
          <View className="flex-1 justify-center items-center">
            <ActivityIndicator size={"large"} color={"blue"} />
            <Text className="text-gray-600 mt-2">Loading books...</Text>
          </View>
        ) : bookList && bookList.length > 0 ? (
          <FlatList
            className="mt-3"
            data={bookList}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => <BookCard item={item} />}
            showsVerticalScrollIndicator={false}
          />
        ) : (
          //
          <View className="flex-1 h-full bg-red-500 justify-center items-center px-8">
            <MaterialCommunityIcons
              name="book-open-blank-variant"
              size={64}
              color="#D1D5DB"
            />
            <Text>{bookList}</Text>
            <Text className="text-xl font-bold text-gray-600 mt-4 text-center">
              No Books Found
            </Text>
            <Text className="text-gray-500 mt-2 text-center">
              {bookList
                ? "Try adjusting your search criteria"
                : "Tap 'Refresh Books' to load the catalog"}
            </Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default home;
