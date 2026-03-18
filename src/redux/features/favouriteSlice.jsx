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
        item => item.idMeal === recipe.idMeal
      );

      if (exists) {
        state.items = state.items.filter(
          item => item.idMeal !== recipe.idMeal
        );
      } else {
        state.items.push(recipe);
      }

    }
  }
});

export const { toggleFavorite } = favoritesSlice.actions;
export default favoritesSlice.reducer;