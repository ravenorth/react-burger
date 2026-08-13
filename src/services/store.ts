import { combineSlices, configureStore } from '@reduxjs/toolkit';

import { burgerConstructorSlice } from './burgerConstructor/burgerConstructorSlice.ts';
import { feedSlice } from './feed/feedSlice.ts';
import { feedSocketMiddleware } from './feed/feedSocketMiddleware.ts';
import { ingredientDetailsSlice } from './ingredientDetails/ingredientDetailsSlice.ts';
import { ingredientsApi } from './ingredients/ingredientsApi.ts';
import { orderApi } from './order/orderApi.ts';
import { passwordApi } from './password/passwordApi.ts';
import { profileFeedSlice } from './profile-feed/profileFeedSlice.ts';
import { profileFeedSocketMiddleware } from './profile-feed/profileFeedSocketMiddleware.ts';
import { userApi } from './user/userApi.ts';
import { userSlice } from './user/userSlice.ts';

const rootReducer = combineSlices(
  ingredientsApi,
  burgerConstructorSlice,
  ingredientDetailsSlice,
  orderApi,
  passwordApi,
  userApi,
  userSlice,
  feedSlice,
  profileFeedSlice
);

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      ingredientsApi.middleware,
      orderApi.middleware,
      passwordApi.middleware,
      userApi.middleware,
      feedSocketMiddleware,
      profileFeedSocketMiddleware
    ),
  devTools: import.meta.env.DEV,
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
