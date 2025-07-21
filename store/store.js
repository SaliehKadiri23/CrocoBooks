import { configureStore } from "@reduxjs/toolkit"
import bookReducer from "./features/book/bookSlice"
import screenReducer from "./features/screen/screenSlice"
export default store = configureStore({
    reducer: {
        book: bookReducer,
        screen: screenReducer,
    }
})