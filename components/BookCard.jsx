import {
  View,
  Text,
  Image,
  Pressable,
  TouchableOpacity,
  Alert,
} from "react-native";
import React, { useContext } from "react";
import {
  MaterialCommunityIcons,
  MaterialIcons,
  AntDesign,
} from "@expo/vector-icons";
import { addFavoriteBook, deleteBookById, editBook } from "../api/routes";
import "../global.css";
import EditBook from "./EditBook";
import { useDispatch } from "react-redux";
import { setEditBookDetails } from "../store/features/book/bookSlice";
import { setEditBookScreen } from "../store/features/screen/screenSlice";
const BookCard = ({ item }) => {

  const dispatch =  useDispatch()
  
  return (
    // <View className="bg-white mx-4 mb-6 rounded-2xl shadow-lg overflow-hidden">
    //   <View className="relative">
    //     <Image
    //       className="w-full h-48 bg-gray-200"
    //       source={{
    //         uri: item.cover ===
    //           "https://loremflickr.com/1104/1965?lock=6287645115451669" ||
    //         item.cover ===
    //           "https://loremflickr.com/1378/912?lock=2614722917990689" ||
    //         item.cover ===
    //           "https://loremflickr.com/3546/256?lock=7409429111691894" ||
    //         item.cover ===
    //           "https://loremflickr.com/2820/1782?lock=1936214136075007"
    //           ? "https://picsum.photos/seed/NnVnflA3/2140/3048"
    //           : item.cover,
    //       }}
    //       resizeMode="cover"
    //     />
    //     <View className="absolute top-3 right-3 bg-black/20 rounded-full p-2">
    //       <Pressable onPress={() => addFavoriteBook(item.id)}>
    //         <MaterialCommunityIcons
    //           name="heart-outline"
    //           size={20}
    //           color="white"
    //         />
    //       </Pressable>
    //     </View>
    //     <View className="absolute bottom-2 right-3 bg-red-600/20 rounded-full p-2">
    //       <TouchableOpacity onPress={() => deleteBookById(item.id, setLoading, setBookList)}>
    //         <MaterialIcons name="delete" size={24} color="red" />
    //       </TouchableOpacity>
    //     </View>
    //     <View className="absolute bottom-3 left-3 bg-emerald-500 px-3 py-1 rounded-full">
    //       <Text className="text-white font-semibold text-sm">
    //         ${item.price_of_book}
    //       </Text>
    //     </View>
    //   </View>

    //   <View className="p-4">
    //     <Text
    //       className="text-xl font-bold text-gray-800 mb-2"
    //       numberOfLines={1}
    //     >
    //       {item.name_of_author}
    //     </Text>

    //     <View className="flex-row items-center mb-3">
    //       <MaterialCommunityIcons name="star" size={16} color="#FFC107" />
    //       <MaterialCommunityIcons name="star" size={16} color="#FFC107" />
    //       <MaterialCommunityIcons name="star" size={16} color="#FFC107" />
    //       <MaterialCommunityIcons name="star" size={16} color="#FFC107" />
    //       <MaterialCommunityIcons
    //         name="star-outline"
    //         size={16}
    //         color="#FFC107"
    //       />
    //       <Text className="ml-2 text-gray-600 text-sm">4.0 (23 reviews)</Text>
    //     </View>

    //     <View className="flex-row items-center justify-between">
    //       <View className="flex-row items-center">
    //         <MaterialCommunityIcons
    //           name="email-outline"
    //           size={16}
    //           color="#6B7280"
    //         />
    //         <Text className="ml-2 text-gray-600 text-sm" numberOfLines={1}>
    //           {item.email_of_seller}
    //         </Text>
    //       </View>

    //       <TouchableOpacity
    //         className="bg-blue-500 px-4 py-2 rounded-full"
    //         onPress={() =>
    //           Alert.alert("Added to Cart", "Book added to your cart!")
    //         }
    //       >
    //         <Text className="text-white font-semibold text-sm">
    //           Add to Cart
    //         </Text>
    //       </TouchableOpacity>
    //     </View>
    //   </View>
    // </View>

    <View className="w-full h-48 flex flex-row justify-center mb-6">
      <View className=" w-[95%] border-2 border-gray-300 bg-white h-full flex flex-row overflow-hidden shadow-lg rounded-2xl">
        {/* Book cover */}
        <View className="w-[35%] shadow-lg bg-white h-full">
          <Image
            className="w-full h-full rounded-xl"
            source={{
              uri:
                item.cover ===
                  "https://loremflickr.com/1104/1965?lock=6287645115451669" ||
                item.cover ===
                  "https://loremflickr.com/1378/912?lock=2614722917990689" ||
                item.cover ===
                  "https://loremflickr.com/3546/256?lock=7409429111691894" ||
                item.cover ===
                  "https://loremflickr.com/2820/1782?lock=1936214136075007"
                  ? "https://picsum.photos/seed/NnVnflA3/2140/3048"
                  : item.cover,
            }}
            // resizeMode="cover"
          />
        </View>
        {/* Book Details */}
        <View className="w-[65%] shadow-lg bg-white h-full">
          {/* Add to favorite */}
          <View className="absolute top-3 right-3 bg-black/20 rounded-full p-2">
            <TouchableOpacity onPress={()=>addFavoriteBook(item.id)}>
              <MaterialCommunityIcons
                name="heart-outline"
                size={20}
                color="white"
              />
            </TouchableOpacity>
          </View>
          {/* Edit Book */}
          <View className="absolute bottom-2 right-20 bg-green-600/20 rounded-full p-2">
            <TouchableOpacity
              onPress={() => {
                dispatch(setEditBookScreen(true))
                dispatch(setEditBookDetails(item))
              }}
            >
              <AntDesign name="edit" size={24} color="green" />
            </TouchableOpacity>
          </View>

          {/* Delete Book */}
          <View className="absolute bottom-2 right-3 bg-red-600/20 rounded-full p-2">
            <TouchableOpacity
              onPress={() => deleteBookById(item.id, dispatch)}
            >
              <MaterialIcons name="delete" size={24} color="red" />
            </TouchableOpacity>
          </View>
          {/* Price of book */}
          <View className="absolute bottom-3 left-3 bg-emerald-500 px-3 py-1 rounded-full">
            <Text className="text-white font-semibold text-sm">
              ${item.price_of_book}
            </Text>
          </View>

          <View className="pl-3 flex flex-col py-2">
            <Text
              className="text-xl font-bold text-gray-800 mb-2"
              numberOfLines={1}
            >
              {item.name_of_author}
            </Text>

            <View className="flex-row items-center mb-3">
              <MaterialCommunityIcons name="star" size={16} color="#FFC107" />
              <MaterialCommunityIcons name="star" size={16} color="#FFC107" />
              <MaterialCommunityIcons name="star" size={16} color="#FFC107" />
              <MaterialCommunityIcons name="star" size={16} color="#FFC107" />
              <MaterialCommunityIcons
                name="star-outline"
                size={16}
                color="#FFC107"
              />
              <Text className="ml-2 text-gray-600 text-sm">
                4.0 (23 reviews)
              </Text>
            </View>

            <View className="flex-row items-center justify-between">
              <View className="flex-row items-center">
                <MaterialCommunityIcons
                  name="email-outline"
                  size={16}
                  color="#6B7280"
                />
                <Text className="ml-2 text-gray-600 text-sm" numberOfLines={1}>
                  {item.email_of_seller}
                </Text>
              </View>
            </View>
            <View className="mt-2">
              <TouchableOpacity
                className="self-start"
                onPress={() =>
                  Alert.alert("Added to Cart", "Book added to your cart!")
                }
              >
                <Text className="text-white font-semibold text-sm bg-blue-500 px-4 py-2 rounded-full">
                  Add to Cart
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

export default BookCard;
