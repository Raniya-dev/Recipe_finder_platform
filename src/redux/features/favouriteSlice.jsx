import { createSlice } from "@reduxjs/toolkit";

const favoritesSlice = createSlice({
  name: "favorites",
  initialState: {
    items: []
  },
  reducers: {
    toggleFavorite: (state, action) => {

      const recipe = action.payload;

      const exists = state.items.find(
        item => item._id === recipe._id
      );

      if (exists) {
        state.items = state.items.filter(
          item => item._id !== recipe._id
        );
      } else {
        state.items.push(recipe);
      }

    },

    setFavorites: (state, action) => {
    state.items = action.payload;
  }
  }
});

export const { toggleFavorite,setFavorites } = favoritesSlice.actions;
export default favoritesSlice.reducer;