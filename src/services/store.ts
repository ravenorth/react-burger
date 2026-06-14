import { combineSlices, configureStore } from '@reduxjs/toolkit';

import { burgerConstructorSlice } from './burgerConstructor/slice.ts';
import { ingredientsApi } from './ingredientsApi.ts';

const rootReducer = combineSlices(ingredientsApi, burgerConstructorSlice);

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(ingredientsApi.middleware),
  devTools: import.meta.env.DEV,
});

export default store;
