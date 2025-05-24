import { configureStore } from "@reduxjs/toolkit";
import movieReducer from "./reducers/movieSlice"
import notificationReducer from "./reducers/NotificationSlice"
import filterReducer from "./reducers/FilterSlice"

export const store = configureStore({
    reducer: {
        movie: movieReducer,
        notification: notificationReducer,
        filter: filterReducer
    },
})
