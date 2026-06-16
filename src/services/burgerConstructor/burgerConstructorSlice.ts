import { createSelector, createSlice } from '@reduxjs/toolkit';

import type { TConstructorIngredient, TIngredient } from '@utils/types.ts';

type TConstructorState = {
  bun: TIngredient | null;
  ingredients: TConstructorIngredient[];
};

const initialState: TConstructorState = {
  bun: null,
  ingredients: [],
};

export const burgerConstructorSlice = createSlice({
  name: 'burgerConstructor',
  initialState,
  reducers: {},
  selectors: {
    getState: (state) => state,
    getBun: (state) => state.bun,
    getIngredients: (state) => state.ingredients,
    getTotalPrice: createSelector(
      (state: TConstructorState): TConstructorState =>
        burgerConstructorSlice.getSelectors().getState(state),
      (state: TConstructorState) => {
        const bunPrice = state.bun ? state.bun.price * 2 : 0;
        const ingredientsPrice = state.ingredients.reduce(
          (sum, item) => sum + item.price,
          0
        );
        return bunPrice + ingredientsPrice;
      }
    ),
  },
});

export const { getBun, getIngredients, getTotalPrice } =
  burgerConstructorSlice.selectors;
