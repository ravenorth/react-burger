import { createSlice } from '@reduxjs/toolkit';

import { userApi } from './userApi.ts';

import type { TUser } from '@utils/types.ts';

type TUserState = {
  user: TUser | null;
  isAuthChecked: boolean;
};

const initialState: TUserState = {
  user: null,
  isAuthChecked: false,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setIsAuthChecked(state, action: { payload: boolean }) {
      state.isAuthChecked = action.payload;
    },
    setUser(state, action: { payload: TUser | null }) {
      state.user = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(userApi.endpoints.login.matchFulfilled, (state, action) => {
        state.user = action.payload;
        state.isAuthChecked = true;
      })
      .addMatcher(userApi.endpoints.register.matchFulfilled, (state, action) => {
        state.user = action.payload;
        state.isAuthChecked = true;
      })
      .addMatcher(userApi.endpoints.getUser.matchFulfilled, (state, action) => {
        state.user = action.payload;
      })
      .addMatcher(userApi.endpoints.logout.matchFulfilled, (state) => {
        state.user = null;
      });
  },
  selectors: {
    getUser: (state) => state.user,
    getIsAuthChecked: (state) => state.isAuthChecked,
  },
});

export const { setIsAuthChecked, setUser } = userSlice.actions;
export const { getUser, getIsAuthChecked } = userSlice.selectors;
