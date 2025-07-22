import { createSlice } from "@reduxjs/toolkit";

const bookSlice = createSlice({
  name: "book",
  initialState: {
    bookList: [],
    favoriteBookList: [],
    cartBookList: [],
    activeBookCategory: "All",
    searchBookText: "",
    editBookDetails: {
      name_of_author: "",
      cover: "",
      price_of_book: "",
      email_of_seller: "",
    },
    bookCategories: ["All", "New", "Web Development", "Ethics", "Sciences"],
  },

  reducers: {
    setBookList: (state, action) => {
      state.bookList = action.payload;
    },
    setFavoriteBookList: (state, action) => {
      state.favoriteBookList = action.payload;
    },
    setCartBookList: (state, action) => {
      state.cartBookList = action.payload;
    },
    setActiveBookCategory: (state, action) => {
      state.activeBookCategory = action.payload;
    },
    setSearchBookText: (state, action) => {
      state.searchBookText = action.payload;
    },
    setEditBookDetails: (state, action) => {
      state.editBookDetails = action.payload;
    },
    // setBookCategories: (state, action) => {
    //   state.bookCategories.push(action.payload);
    // },
  },
});

export const {
  setBookList,
  setFavoriteBookList,
  setActiveBookCategory,
  setSearchBookText,
  setEditBookDetails,
  setCartBookList
} = bookSlice.actions;
export default bookSlice.reducer;
