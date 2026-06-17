import { combineSlices, configureStore } from '@reduxjs/toolkit';

import { burgerConstructorSlice } from './burgerConstructor/burgerConstructorSlice.ts';
import { ingredientDetailsSlice } from './ingredientDetails/ingredientDetailsSlice.ts';
import { ingredientsApi } from './ingredients/ingredientsApi.ts';
import { orderApi } from './order/orderApi.ts';

const rootReducer = combineSlices(
  ingredientsApi,
  burgerConstructorSlice,
  ingredientDetailsSlice,
  orderApi
);

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(ingredientsApi.middleware, orderApi.middleware),
  devTools: import.meta.env.DEV,
});

export default store;
