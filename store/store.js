import { configureStore } from "@reduxjs/toolkit"
import bookReducer from "./features/book/bookSlice"
import screenReducer from "./features/screen/screenSlice"
const store = configureStore({
    reducer: {
        book: bookReducer,
        screen: screenReducer,
    }
})

export default store;