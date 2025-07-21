import { createSlice } from "@reduxjs/toolkit";

const screenSlice = createSlice({
  name: "screen",
  initialState: {
    loadingScreen: false,
    newBookScreen: false,
    editBookScreen: false,
  },
  reducers: {
    setLoadingScreen: (state, action) => {
      state.loadingScreen = action.payload;
    },
    setNewBookScreen: (state, action) => {
      state.newBookScreen = action.payload;
    },
    setEditBookScreen: (state, action) => {
      state.editBookScreen = action.payload;
    },
  },
});

export const { setLoadingScreen, setNewBookScreen, setEditBookScreen } =
  screenSlice.actions;
export default screenSlice.reducer;
