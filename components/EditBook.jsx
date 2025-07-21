import {
  View,
  StatusBar,
  Text,
  Modal,
  TextInput,
  ScrollView,
  Button,
  Pressable,
  TouchableOpacity,
} from "react-native";
import React, { useContext } from "react";
import "../global.css";
import AntDesign from "@expo/vector-icons/AntDesign";
import { useState } from "react";
import { editBook } from "../api/routes";

const EditBook = ({editBookDetails}) => {
  const [bookDetails, setBookDetails] = useState(editBookDetails);


  function onChange(field, value) {
    setBookDetails((prev) => ({...prev, [field] : value}));
  }

  async function handleSubmit() {
    setEditBookScreen(false);
    await editBook(bookDetails, setLoading, setBookList);
    await setBookDetails({
      name_of_author: "",
      cover: "",
      price_of_book: "",
      email_of_seller: "",
    });
    await editBookDetails({})
    
  }
  return (
    <Modal
      transparent={true}
      className="mx-3 flex justify-center items-center bg-transparent"
    >
      <View className="bg-gray-100 flex flex-col items-center border-2 border-gray-300 w-[93%] rounded-xl mx-auto h-full">
        <Text className="text-3xl text-gray-800 border-b-2 border-b-blue-400 font-bold mt-10 mb-3">
          Edit Book
        </Text>
        {/* Form Wrapper */}
        <ScrollView className="w-full ">
          {/* Autor's Name */}
          <View className="w-full px-4  border-b-2 border-dashed border-gray-500 pb-3">
            <Text className="text-xl font-bold mt-4 ">Author's name :</Text>
            <TextInput
              editable
              onChangeText={(value) => onChange("name_of_author", value)}
              value={bookDetails.name_of_author}
              className="border-2 mt-3 text-black pl-4 text-lg border-gray-500 rounded-3xl"
              placeholder="Enter the author's name"
            />
          </View>
          {/* Cover url */}
          <View className="w-full gap-3 px-4  border-b-2 border-dashed border-gray-500 pb-3">
            <Text className="text-xl font-bold mt-4 ">Book's Cover Url :</Text>
            <TextInput
              editable
              value={bookDetails.cover}
              onChangeText={(value) => onChange("cover", value)}
              inputMode="url"
              keyboardType="url"
              className="border-2 text-black pl-4 text-lg border-gray-500 rounded-3xl"
              placeholder="Enter the book's image url"
            />
          </View>
          {/* Price */}
          <View className="w-full gap-3 px-4  border-b-2 border-dashed border-gray-500 pb-3">
            <Text className="text-xl font-bold mt-4 ">Price of Book (₦) :</Text>
            <TextInput
              editable
              value={bookDetails.price_of_book}
              onChangeText={(value) => onChange("price_of_book", value)}
              keyboardType="numeric"
              className="border-2 text-black pl-4 text-lg border-gray-500 rounded-3xl"
              placeholder="Enter the book's price, e.g ₦2000"
            />
          </View>
          {/* Author's E-mail */}
          <View className="w-full gap-3 px-4  pb-3">
            <Text className="text-xl font-bold mt-4 ">Author's e-mail :</Text>
            <TextInput
              editable
              value={bookDetails.email_of_seller}
              onChangeText={(value) => onChange("email_of_seller", value)}
              keyboardType="email"
              className="border-2 text-black pl-4 text-lg border-gray-500 rounded-3xl"
              placeholder="e.g, example@gmail.com"
            />
          </View>

          <View className="w-full mt-4">
            <TouchableOpacity onPress={handleSubmit} className="mx-auto w-[70%] rounded-2xl flex bg-green-500">

              <Text className="text-white py-3 text-center font-bold text-xl">
                Edit Book
              </Text>
            </TouchableOpacity>
          </View>

          <View className="w-full mt-7">
            <TouchableOpacity
              onPress={() => {setEditBookScreen(false)}}
              className="w-full pl-5 flex flex-row items-center "
            >
              <AntDesign name="arrowleft" size={30} color="red" />
              <Text className="text-xl text-red-600 font-bold ml-3">Close</Text>
            </TouchableOpacity>
          </View>

          {/* <View className="w-full gap-3 px-4  border-b-2 border-dashed border-gray-500 pb-3">
            <Text className="text-xl font-bold mt-4 ">Author's name :</Text>
            <TextInput
            
              className="border-2 text-black pl-4 text-lg border-gray-500 rounded-3xl"
              placeholder="Enter the author's name"
            />
          </View> */}
        </ScrollView>
      </View>
    </Modal>
  );
};

export default EditBook;
