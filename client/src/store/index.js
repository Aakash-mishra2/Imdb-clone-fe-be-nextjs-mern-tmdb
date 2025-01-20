import { configureStore } from "@reduxjs/toolkit";
import { userReducer, bookmarksReducer } from './reducerLogic';

export const store = configureStore({
    reducer: {
        account: userReducer,
        bookmark: bookmarksReducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false,
    }),
})
