import { createSelector, createSlice, nanoid } from '@reduxjs/toolkit';

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
  reducers: {
    addIngredient: {
      reducer(state, action: { payload: TConstructorIngredient }) {
        if (action.payload.type === 'bun') {
          state.bun = action.payload;
        } else {
          state.ingredients.push(action.payload);
        }
      },
      prepare(ingredient: TIngredient) {
        return { payload: { ...ingredient, key: nanoid() } };
      },
    },
    removeIngredient(state, action: { payload: string }) {
      state.ingredients = state.ingredients.filter(
        (item) => item.key !== action.payload
      );
    },
  },
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
    getIngredientsCountMap: createSelector(
      (state: TConstructorState) => state.bun,
      (state: TConstructorState) => state.ingredients,
      (bun, ingredients): Record<string, number> => {
        const counts: Record<string, number> = {};
        if (bun) {
          counts[bun._id] = 2;
        }
        ingredients.forEach((item) => {
          counts[item._id] = (counts[item._id] || 0) + 1;
        });
        return counts;
      }
    ),
  },
});

export const { addIngredient, removeIngredient } = burgerConstructorSlice.actions;

export const { getBun, getIngredients, getTotalPrice, getIngredientsCountMap } =
  burgerConstructorSlice.selectors;
