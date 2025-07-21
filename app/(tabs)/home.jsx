import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  View,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import {
  setActiveBookCategory,
  setSearchBookText,
} from "../../store/features/book/bookSlice";
import { addNewBook, getBookList } from "../../api/routes";
import BookCard from "../../components/BookCard";
import AddNewBook from "../../components/AddNewBook";
import EditBook from "../../components/EditBook";
import { setNewBookScreen } from "../../store/features/screen/screenSlice";

const home = () => {
  const { searchBookText, bookCategories, editBookDetails, activeBookCategory, bookList } = useSelector(
    (state) => state.book
  );

  const { newBookScreen, editBookScreen, loadingScreen } = useSelector(
    (state) => state.screen
  );

  const filteredBooks = bookList?.filter((book) =>
    book.name_of_author.toLowerCase().includes(searchBookText.toLowerCase())
  );

  const dispatch = useDispatch();
  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <StatusBar barStyle="dark-content" backgroundColor="#F9FAFB" />

      {/* Header */}
      <View className="bg-white px-4 py-4 mt-7 shadow-sm">
        <View className="flex-row items-center justify-between mb-4">
          <View>
            <Text className="text-2xl font-bold text-gray-800">BookStore</Text>
            <Text className="text-gray-600">
              Discover your next favorite book
            </Text>
          </View>
        </View>

        {/* Search Bar */}
        <View className="flex-row items-center bg-gray-100 rounded-full px-4 py-2 mb-4">
          <MaterialCommunityIcons
            className="ml-3"
            name="magnify"
            size={25}
            color="#6B7280"
          />
          <TextInput
            className="flex-1 ml-3 text-gray-800"
            placeholder="Search books, authors..."
            placeholderTextColor="#9CA3AF"
            value={searchBookText}
            onChangeText={(text) => dispatch(setSearchBookText(text))}
          />
          {searchBookText.length > 0 && (
            <TouchableOpacity onPress={() => dispatch(setSearchBookText(""))}>
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

      {newBookScreen && <AddNewBook />}
      {editBookScreen && <EditBook editBookDetails={editBookDetails} />}

      {/* Action Buttons */}
      <View className="flex-row justify-around py-4 bg-white border-t border-b border-gray-100">
        <TouchableOpacity
          className="bg-emerald-500 px-6 py-3 rounded-full flex-row items-center"
          onPress={() => getBookList(dispatch)}
        >
          <MaterialCommunityIcons name="refresh" size={20} color="white" />
          <Text className="text-white font-semibold ml-2">Refresh Books</Text>
        </TouchableOpacity>

        <TouchableOpacity
          className="bg-purple-500 px-6 py-3 rounded-full flex-row items-center"
          onPress={() =>
            dispatch(setNewBookScreen(true))
          }
        >
          <MaterialCommunityIcons name="plus" size={20} color="white" />
          <Text className="text-white font-semibold ml-2">Add Book</Text>
        </TouchableOpacity>
      </View>

      {/* Book List */}
      {loadingScreen ? (
        <View className="flex-1 justify-center items-center">
          <ActivityIndicator size={"large"} color={"blue"} />
          <Text className="text-gray-600 mt-2">Loading books...</Text>
        </View>
      ) : filteredBooks && filteredBooks.length > 0 ? (
        <FlatList
          data={filteredBooks}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <BookCard item={item} />}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingVertical: 8 }}
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
