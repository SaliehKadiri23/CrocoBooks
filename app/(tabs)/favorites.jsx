import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { Link } from "expo-router";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  SafeAreaView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { getFavoriteBookList } from "../../api/routes";
import BookCard from "../../components/BookCard";

const favorites = () => {
  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = async () => {
    setRefreshing(true);
    getFavoriteBookList(dispatch);
    setRefreshing(false);
  };
  const {
    searchBookText,
    bookCategories,
    editBookDetails,
    activeBookCategory,
    bookList,
    favoriteBookList,
  } = useSelector((state) => state.book);

  const { newBookScreen, editBookScreen, loadingScreen } = useSelector(
    (state) => state.screen
  );
  const dispatch = useDispatch();
  useEffect(() => {
    getFavoriteBookList(dispatch);
  }, []);

  return (
    <SafeAreaView className="flex-1 bg-white">
      <StatusBar barStyle="dark-content" backgroundColor="#F9FAFB" />
      {loadingScreen ? (
        <View className="flex-1 justify-center items-center">
          <ActivityIndicator size={"large"} color={"blue"} />
          <Text className="text-gray-600 mt-2">Loading favorite books...</Text>
        </View>
      ) : favoriteBookList && favoriteBookList.length > 0 ? (
        <View className="flex-1 mt-9 mb-4">
          <Text className="text-center text-3xl font-bold italic mb-3">
            Your Favorite Books...
          </Text>
          <FlatList
            data={favoriteBookList}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => <BookCard item={item} />}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingVertical: 8 }}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
          />
        </View>
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
          <TouchableOpacity
            className="bg-emerald-500 mt-7 px-6 py-3 rounded-full flex-row items-center"
            onPress={() => getFavoriteBookList(dispatch)}
          >
            <MaterialCommunityIcons name="refresh" size={20} color="white" />
            <Text className="text-white font-semibold ml-2">Refresh Books</Text>
          </TouchableOpacity>
          {bookList && (
            <View className="w-full mt-5 flext flex-row justify-center">
              <View className="flex flex-row w-[95%] justify-center items-center">
                <Text className="text-md text-center  text-gray-600">
                  Try adding books your Favorite books here by clicking on the
                  heart icon (❤️) in the
                  <Link href="/home" className="text-blue-500 font-bold">
                    {" "}
                    Home Page
                  </Link>
                  <Text>
                    {" "}
                    or Tap 'Refresh Books' if you have added any books.
                  </Text>
                </Text>
              </View>
            </View>
          )}

          {bookList ? "" : "Tap 'Refresh Books' to load the catalog"}
        </View>
      )}
    </SafeAreaView>
  );
};

export default favorites;
