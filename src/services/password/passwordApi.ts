import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { apiUrls } from '@utils/apiUrls.ts';

type TForgotPasswordRequest = {
  email: string;
};

type TForgotPasswordResponse = {
  success: boolean;
  message: string;
};

type TResetPasswordRequest = {
  password: string;
  token: string;
};

type TResetPasswordResponse = {
  success: boolean;
  message: string;
};

export const passwordApi = createApi({
  reducerPath: 'passwordApi',
  baseQuery: fetchBaseQuery({
    baseUrl: apiUrls.baseUrl,
  }),
  endpoints: (builder) => ({
    forgotPassword: builder.mutation<TForgotPasswordResponse, TForgotPasswordRequest>({
      query: (body) => ({
        url: apiUrls.forgotPassword,
        method: 'POST',
        body: JSON.stringify(body),
      }),
    }),
    resetPassword: builder.mutation<TResetPasswordResponse, TResetPasswordRequest>({
      query: (body) => ({
        url: apiUrls.resetPassword,
        method: 'POST',
        body: JSON.stringify(body),
      }),
    }),
  }),
});

export const { useForgotPasswordMutation, useResetPasswordMutation } = passwordApi;
