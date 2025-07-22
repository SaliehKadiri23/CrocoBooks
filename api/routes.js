import axios from "axios";
import { Alert } from "react-native";
// import {setLoading, setBookList} from "../screens/HomeScreen.jsx"
import { setBookList, setCartBookList, setFavoriteBookList } from "../store/features/book/bookSlice";
import { setLoadingScreen } from "../store/features/screen/screenSlice";

export const endpointURL =
  "https://687233b576a5723aacd3f1f0.mockapi.io/Bookstoredatabase";

// Getting all books
export const getBookList = async (dispatch) => {
  dispatch(setLoadingScreen(true));
  try {
    const response = await axios.get(endpointURL);
    dispatch(setBookList(response.data));
    console.log(JSON.stringify(response.data, null, 3));
  } catch (error) {
    console.log("An Error Just Occured", error);
    Alert.alert("Error", "Failed to fetch books");
  } finally {
    dispatch(setLoadingScreen(false));
  }
};

// Getting all books
export const getFavoriteBookList = async (dispatch) => {
  dispatch(setLoadingScreen(true));
  try {
    const response = await axios.get(endpointURL);
    const favoriteBooks = response.data.filter(book => book.isFavorite === true)
    dispatch(setFavoriteBookList(favoriteBooks));
    console.log(JSON.stringify(response.data, null, 3));
  } catch (error) {
    console.log("An Error Just Occured", error);
    Alert.alert("Error", "Failed to your favorite fetch books");
  } finally {
    dispatch(setLoadingScreen(false));
  }
};

// Getting all books in cart
export const getCartBookList = async (dispatch) => {
  dispatch(setLoadingScreen(true));
  try {
    const response = await axios.get(endpointURL);
    const cartBooks = response.data.filter((book) => book.isInCart === true);
    dispatch(setCartBookList(cartBooks));
    console.log(JSON.stringify(response.data, null, 3));
  } catch (error) {
    console.log("An Error Just Occured", error);
    Alert.alert("Error", "Failed to your favorite fetch books");
  } finally {
    dispatch(setLoadingScreen(false));
  }
};

export const toggleFavoriteBook = async (item, dispatch) => {
  
  try {
    dispatch(setLoadingScreen(true))
    const bookDetails = {
      ...item, isFavorite: !item.isFavorite
    }
    await axios.put(`${endpointURL}/${bookDetails.id}`, bookDetails);
    if (bookDetails.isFavorite === false) {
      Alert.alert("Success", "The Book was removed from your favorites");
    } else {
      Alert.alert("Success", "The Book was added to your favorites");
    }
    // dispatch(setLoadingScreen(false));
    
    getFavoriteBookList(dispatch);
    getBookList(dispatch)
  } catch (error) {
    console.log("An Error Just Occured", error);
    Alert.alert("Error", "Failed to update book");
  }
};
export const toggleCartBook = async (item, dispatch) => {
  
  try {
    dispatch(setLoadingScreen(true))
    const bookDetails = {
      ...item,
      isInCart: !item.isInCart,
    };
    await axios.put(`${endpointURL}/${bookDetails.id}`, bookDetails);
    if (bookDetails.isInCart === false) {
      Alert.alert("Success", "The Book was removed from your cart");
    } else {
      Alert.alert("Success", "The Book was added to your cart");
    }
    
    getCartBookList(dispatch);
    getBookList(dispatch)
  } catch (error) {
    console.log("An Error Just Occured", error);
    Alert.alert("Error", "Failed to update book");
  }
};

// Deleting a particular book with (id)
export const deleteBookById = async (id, dispatch) => {
  Alert.alert("Delete Book", "Are you sure you want to delete this book?", [
    { text: "Cancel", style: "cancel" },
    {
      text: "Delete",
      style: "destructive",
      onPress: async () => {
        try {
          await axios.delete(`${endpointURL}/${id}`);
          Alert.alert("Success", "Book deleted successfully!");
          getBookList(dispatch);
        } catch (error) {
          console.log("An Error Just Occured", error);
          Alert.alert("Error", "Failed to delete book");
        }
      },
    },
  ]);
};

// Adding a new book
export const addNewBook = async (bookDetails, dispatch) => {
  try {
    await axios.post(endpointURL, bookDetails);
    Alert.alert("Success", "Book added successfully!");

    getBookList(dispatch);
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
