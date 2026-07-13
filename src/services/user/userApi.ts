import { createApi } from '@reduxjs/toolkit/query/react';

import { baseQueryWithRefresh } from '@utils/api.ts';
import { apiUrls } from '@utils/apiUrls.ts';
import { clearTokens, getRefreshToken, setTokens } from '@utils/token.ts';

import type { TUser } from '@utils/types.ts';

type TRegisterRequest = {
  email: string;
  password: string;
  name: string;
};

type TLoginRequest = {
  email: string;
  password: string;
};

type TAuthResponse = {
  success: boolean;
  user: TUser;
  accessToken: string;
  refreshToken: string;
};

export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: baseQueryWithRefresh,
  endpoints: (builder) => ({
    register: builder.mutation<TUser, TRegisterRequest>({
      query: (credentials) => ({
        url: apiUrls.register,
        method: 'POST',
        body: JSON.stringify(credentials),
      }),
      transformResponse: (response: TAuthResponse) => {
        setTokens(response.accessToken, response.refreshToken);
        return response.user;
      },
    }),
    login: builder.mutation<TUser, TLoginRequest>({
      query: (credentials) => ({
        url: apiUrls.login,
        method: 'POST',
        body: JSON.stringify(credentials),
      }),
      transformResponse: (response: TAuthResponse) => {
        setTokens(response.accessToken, response.refreshToken);
        return response.user;
      },
    }),
    getUser: builder.query<TUser, void>({
      query: () => ({
        url: apiUrls.getUser,
        method: 'GET',
      }),
      transformResponse: (response: TAuthResponse) => response.user,
    }),
    logout: builder.mutation<void, void>({
      query: () => ({
        url: apiUrls.logout,
        method: 'POST',
        body: JSON.stringify({ token: getRefreshToken() }),
      }),
      transformResponse: () => {
        clearTokens();
      },
    }),
  }),
});

export const {
  useRegisterMutation,
  useLoginMutation,
  useGetUserQuery,
  useLogoutMutation,
} = userApi;
