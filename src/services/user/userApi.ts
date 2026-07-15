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

type TUpdateUserRequest = {
  name: string;
  email: string;
  password: string;
};

type TAuthResponse = {
  success: boolean;
  user: TUser;
  accessToken: string;
  refreshToken: string;
};

type TUpdateUserResponse = {
  success: boolean;
  user: TUser;
};

export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: baseQueryWithRefresh,
  endpoints: (builder) => ({
    register: builder.mutation<TUser, TRegisterRequest>({
      query: (credentials) => ({
        url: apiUrls.register,
        method: 'POST',
        body: credentials,
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
        body: credentials,
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
        body: { token: getRefreshToken() },
      }),
      transformResponse: () => {
        clearTokens();
      },
    }),
    updateUser: builder.mutation<TUser, TUpdateUserRequest>({
      query: (body) => ({
        url: apiUrls.updateUser,
        method: 'PATCH',
        body,
      }),
      transformResponse: (response: TUpdateUserResponse) => response.user,
    }),
  }),
});

export const {
  useRegisterMutation,
  useLoginMutation,
  useGetUserQuery,
  useLogoutMutation,
  useUpdateUserMutation,
} = userApi;
