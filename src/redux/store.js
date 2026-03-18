import { configureStore } from "@reduxjs/toolkit";
import themeReducer from "./features/themeSlice";
import favoritesReducer from "./features/favouriteSlice"

export const store = configureStore(
    {
        reducer:{
            theme:themeReducer,
            favorites:favoritesReducer,
        }
    }
)