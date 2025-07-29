import AntDesign from "@expo/vector-icons/AntDesign";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import Entypo from "@expo/vector-icons/Entypo";
import { Link } from "expo-router";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Pressable,
  RefreshControl,
  SafeAreaView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { getCartBookList } from "../../api/routes";
import BookCard from "../../components/BookCard";

const cart = () => {
  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = async () => {
    setRefreshing(true);
    getCartBookList(dispatch);
    setRefreshing(false);
  };
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

  useEffect(() => {
    getCartBookList(dispatch);
  }, []);

  let cartTotal = () => {
    let sum = 0;
    if (cartBookList.length > 0) {
      for (let i = 0; i < cartBookList.length; i++) {
        sum += parseFloat(cartBookList[i].price_of_book);
      }
      return sum.toFixed(2);
    } else {
      return 0;
    }
  };

  const CartHeader = () => {
    return (
      <View className="w-full  text-white bg-blue-600/20 mb-5 flex justify-center items-center">
        <View className="w-[98%] m-3 bg-blue-600/30 flex justify-center items-center rounded-md">
          <View className="w-[97%] m-3 bg-blue-600/40 flex justify-center items-center rounded-md">
            <Text className="text-3xl py-2 font-extrabold text-white">Your Cart...</Text>
          </View>
        </View>
      </View>
    );
  };

  const CartFooter = () => {
    return (
      <View className="w-full  text-white bg-blue-600/20 mb-5 flex justify-center items-center">
        <View className="w-[98%] m-3 bg-blue-600/30 flex justify-center items-center rounded-md">
          <View className="w-[97%] m-3 bg-blue-600/40 flex flex-row items-center rounded-md">
            <Text className="text-3xl py-2 justify-self-start pl-7 grow font-extrabold text-white">
              Summary
            </Text>
            <Text className="text-xl py-2 pr-7 place-self-end right-0 relative justify-self-end font-extrabold text-white">
              Items: {cartBookList.length}
            </Text>
          </View>
          <View className="w-[97%] m-3 mt-0 bg-blue-600/40 gap-3 flex flex-col justify-center items-center rounded-md">
            {/* Total Price */}
            <Text className="text-green-600 mt-4 text-lg font-extrabold">
              Total ...................................................{" "}
              <Text className="font-bold">${cartTotal()}</Text>
            </Text>
            {/* Discount Price */}
            <Text className="text-red-600 text-lg font-extrabold">
              Discount .............................................{" "}
              <Text className="font-bold">
                ${(cartTotal() * 0.2).toFixed(2)}
              </Text>
            </Text>
            {/* Actual Price */}
            <Text className="text-white mb-5 text-lg font-extrabold ">
              Amount To Be Paid ...........................{" "}
              <Text className="font-bold">
                ${(cartTotal() * 0.8).toFixed(2)}
              </Text>
            </Text>
            <TouchableOpacity className="bg-green-600 mb-5 justify-center rounded-lg items-center w-[70%]">
              <View className="flex flex-row items-center justify-center ">
               <Text className="text-white font-bold text-lg py-2 mr-4">Pay Now</Text>
                <Entypo name="arrow-long-right" size={24} color="white" />
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <StatusBar barStyle="dark-content" backgroundColor="#F9FAFB" />
      {loadingScreen ? (
        <View className="flex-1 justify-center items-center">
          <ActivityIndicator size={"large"} color={"blue"} />
          <Text className="text-gray-600 mt-2">Loading cart items...</Text>
        </View>
      ) : cartBookList && cartBookList.length > 0 ? (
        <FlatList
          className="pt-9 bg-blue-600/10 "
          data={cartBookList}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <BookCard item={item} isCart={true} />}
          ListHeaderComponent={CartHeader}
          ListFooterComponent={CartFooter}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingVertical: 8 }}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        />
      ) : (
       
        <View className="flex-1 justify-center items-center px-8">
          <AntDesign name="shoppingcart" size={80} color="#D1D5DB" />

          <Text className="text-xl font-bold text-gray-600 mt-4 text-center">
            No books in your Cart...
          </Text>
          <TouchableOpacity
            className="bg-emerald-500 mt-7 px-6 py-3 rounded-full flex-row items-center"
            onPress={() => getCartBookList(dispatch)}
          >
            <MaterialCommunityIcons name="refresh" size={20} color="white" />
            <Text className="text-white font-semibold ml-2">Refresh Cart</Text>
          </TouchableOpacity>
          {bookList && (
            <View className="w-full mt-5 flex flex-row justify-center">
              <View className="flex flex-row w-[95%] justify-center items-center">
                <Text className="text-md text-center  text-gray-600">
                  Try adding books to your cart by clicking on the "Add To Cart"
                  button in the
                  <Link href="/home" className="text-blue-500 font-bold">
                    {" "}
                    Home Page
                  </Link>
                  <Text>
                    {" "}
                    or{" "}
                    <Link
                      className="text-blue-500 font-bold"
                      href="/favorites"
                    >
                      Favorites Page
                    </Link>
                  </Text>
                  <Text>
                    {" "}
                    or Tap 'Refresh Cart' if you have added any books.
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

export default cart;
