import { combineSlices, configureStore } from '@reduxjs/toolkit';

import { burgerConstructorSlice } from './burgerConstructor/burgerConstructorSlice.ts';
import { ingredientDetailsSlice } from './ingredientDetails/ingredientDetailsSlice.ts';
import { ingredientsApi } from './ingredients/ingredientsApi.ts';
import { orderApi } from './order/orderApi.ts';
import { passwordApi } from './password/passwordApi.ts';
import { userSlice } from './user/slice.ts';
import { userApi } from './user/userApi.ts';

const rootReducer = combineSlices(
  ingredientsApi,
  burgerConstructorSlice,
  ingredientDetailsSlice,
  orderApi,
  passwordApi,
  userApi,
  userSlice
);

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      ingredientsApi.middleware,
      orderApi.middleware,
      passwordApi.middleware,
      userApi.middleware
    ),
  devTools: import.meta.env.DEV,
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
