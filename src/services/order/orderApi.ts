import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { apiUrls } from '@utils/apiUrls.ts';

type TCreateOrderRequest = {
  ingredients: string[];
};

type TOrderResponse = {
  name: string;
  order: {
    number: number;
  };
  success: boolean;
};

export const orderApi = createApi({
  reducerPath: 'ordersApi',
  baseQuery: fetchBaseQuery({
    baseUrl: apiUrls.baseUrl,
  }),
  endpoints: (builder) => ({
    createOrder: builder.mutation<TOrderResponse, TCreateOrderRequest>({
      query: (body) => ({
        url: apiUrls.createOrder,
        method: 'POST',
        body,
      }),
    }),
  }),
});

export const { useCreateOrderMutation } = orderApi;
