import React, { useContext, useEffect } from "react"; 
import { SafeAreaView, ScrollView, Text, View, TextInput, TouchableOpacity } from "react-native";
import BookCard from "../../components/BookCard";
import Toast from "react-native-toast-message";
import "../../global.css";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { useSelector } from "react-redux";


const home = () => {
  const {
    searchBookText,
    setSearchBookText,
    bookCategories,
    activeBookCategory,
  } = useSelector((state) => state.book);
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView style={{ flex: 1 }}>
        <View className="flex-row items-center bg-gray-100 rounded-full px-4 py-1 mb-4">
          <MaterialCommunityIcons name="magnify" size={25} color="#6B7280" />
          <TextInput
            keyboardType="search"
            className="flex-1 ml-3 text-gray-800 outline-0"
            placeholder="Search books, authors..."
            placeholderTextColor="#9CA3AF"
            value={searchBookText}
            onChangeText={setSearchBookText}
          />
          {searchBookText.length > 0 && (
            <TouchableOpacity onPress={() => setSearchBookText("")}>
              <MaterialCommunityIcons
                name="close-circle"
                size={20}
                color="#6B7280"
              />
            </TouchableOpacity>
          )}
        </View>

        {/* Category Filter */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          className="flex-row"
        >
          {bookCategories.map((category) => (
            <TouchableOpacity
              key={category}
              className={`px-4 py-2 rounded-full mr-3 ${
                activeBookCategory === category ? "bg-blue-500" : "bg-gray-200"
              }`}
              onPress={() => setActiveBookCategory(category)}
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
      </ScrollView>

      {/* Action Buttons */}
      <View className="flex-row justify-around py-4 bg-white border-t border-gray-100">
        <TouchableOpacity
          className="bg-emerald-500 px-6 py-3 rounded-full flex-row items-center"
          onPress={() => getBookList(setLoading, setBookList)}
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
      {loading ? (
        <View className="flex-1 justify-center items-center">
          <ActivityIndicator size={"large"} color={"blue"} />
          {/* <MaterialCommunityIcons name="loading" size={48} color="#6B7280" /> */}
          <Text className="text-gray-600 mt-2">Loading books...</Text>
        </View>
      ) : filteredBooks && filteredBooks.length > 0 ? (
        <FlatList
          className="mt-3"
          data={filteredBooks}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <BookCard item={item} />}
          showsVerticalScrollIndicator={false}
        />
      ) : (
        <View className="flex-1 justify-center items-center px-8">
          <MaterialCommunityIcons
            name="book-open-blank-variant"
            size={64}
            color="#D1D5DB"
          />
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
    </SafeAreaView>
  );
};

export default home;
