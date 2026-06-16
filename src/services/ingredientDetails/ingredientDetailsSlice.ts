import { createSlice } from '@reduxjs/toolkit';

import type { TIngredient } from '@utils/types.ts';

type TIngredientDetailsState = {
  ingredient: TIngredient | null;
};

const initialState: TIngredientDetailsState = {
  ingredient: null,
};

export const ingredientDetailsSlice = createSlice({
  name: 'ingredientDetails',
  initialState,
  reducers: {
    setIngredient(state, action: { payload: TIngredient | null }) {
      state.ingredient = action.payload;
    },
  },
  selectors: {
    getIngredient: (state) => state.ingredient,
  },
});

export const { setIngredient } = ingredientDetailsSlice.actions;
export const { getIngredient } = ingredientDetailsSlice.selectors;
