import axios from "axios";
import { Alert } from "react-native";
// import {setLoading, setBookList} from "../screens/HomeScreen.jsx"
import Toast from "react-native-toast-message";
import { useDispatch, useSelector } from "react-redux";
import { setBookList } from "../store/features/book/bookSlice";
import {setLoadingScreen} from "../store/features/screen/screenSlice";

export const endpointURL = "https://687233b576a5723aacd3f1f0.mockapi.io/books";

// Getting all books
export const getBookList = async (dispatch) => {
  dispatch(setLoadingScreen(true));
  console.log("ran");
  try {
    const response = await axios.get(endpointURL);
    dispatch(setBookList(response.data))
    console.log(JSON.stringify(response.data, null, 3));
  } catch (error) {
    console.log("An Error Just Occured", error);
    Alert.alert("Error", "Failed to fetch books");
  } finally {
    dispatch(setLoadingScreen(false));
  }
};

export const addFavoriteBook = async (id) => {
  Alert.alert("Success", "The Book was added to your favorites");
};



// Deleting a particular book with (id)
export const deleteBookById = async (id, setLoading, setBookList) => {
  Alert.alert("Delete Book", "Are you sure you want to delete this book?", [
    { text: "Cancel", style: "cancel" },
    {
      text: "Delete",
      style: "destructive",
      onPress: async () => {
        try {
          await axios.delete(`${endpointURL}/${id}`);
          Alert.alert("Success", "Book deleted successfully!");
          getBookList(setLoading, setBookList);
        } catch (error) {
          console.log("An Error Just Occured", error);
          Alert.alert("Error", "Failed to delete book");
        }
      },
    },
  ]);
};



// Adding a new book
export const addNewBook = async (bookDetails, setLoading, setBookList) => {
  try {
    await axios.post(endpointURL, bookDetails);
    Alert.alert("Success", "Book added successfully!");

    getBookList(setLoading, setBookList);
  } catch (error) {
    console.log("An Error Just Occured", error);
    Alert.alert("Error", "Failed to add book");
  }
};

// Editing a particular book
export const editBook = async (bookDetails, dispatch) => {
  try {
    await axios.put(`${endpointURL}/${bookDetails.id}`, bookDetails);
    Alert.alert("Success", "Book updated successfully!");
    getBookList(dispatch); // Check
  } catch (error) {
    console.log("An Error Just Occured", error);
    Alert.alert("Error", "Failed to update book");
  }
};

