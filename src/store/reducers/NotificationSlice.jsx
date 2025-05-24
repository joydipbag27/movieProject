import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    notifications: JSON.parse(localStorage.getItem("NOTIFICATIONS")) || []
}

export const notificationSlice = createSlice({
    name: 'notification',
    initialState,
    reducers: {
        favAdded: (state, action) => {
           state.notifications.push({
            type: "favorite", 
            message: `${action.payload === "movie" ? "Movie" : "Tv Series"} Added to Favorites`})

            localStorage.setItem("NOTIFICATIONS", JSON.stringify(state.notifications))
        },
        notificationDel: (state, action) => {
            state.notifications = state.notifications.filter((_, index) => index !== action.payload)

            localStorage.setItem("NOTIFICATIONS", JSON.stringify(state.notifications))
        },
        hisAdded: (state, action) => {
            state.notifications.push({
                type: "history",
                message: `You Just Watched the Trailer for ${action.payload.name || action.payload.title}`
            })
            localStorage.setItem("NOTIFICATIONS", JSON.stringify(state.notifications));
        },
        favRemove: (state, action) => {
            state.notifications.push({
                type: "remove",
                message: `Favorite removed: ${action.payload}`
            })
        }
    }
})

export const {favAdded, notificationDel, hisAdded, favRemove} = notificationSlice.actions

export default notificationSlice.reducer