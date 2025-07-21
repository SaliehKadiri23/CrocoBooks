import { createSlice } from "@reduxjs/toolkit";

const bookSlice = createSlice({
  name: "book",
  initialState: {
    bookList: [],
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
  setActiveBookCategory,
  setSearchBookText,
  setEditBookDetails,
} = bookSlice.actions;
export default bookSlice.reducer;
