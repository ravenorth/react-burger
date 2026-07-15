import { createAsyncThunk } from '@reduxjs/toolkit';

import { getRefreshToken } from '@utils/token.ts';

import { userApi } from './userApi.ts';
import { setIsAuthChecked } from './userSlice.ts';

export const checkUserAuth = createAsyncThunk(
  'user/checkUserAuth',
  async (_, { dispatch }) => {
    try {
      if (getRefreshToken()) {
        await dispatch(
          userApi.endpoints.getUser.initiate(undefined, { forceRefetch: true })
        );
      }
    } finally {
      dispatch(setIsAuthChecked(true));
    }
  }
);
