import { createApi } from '@reduxjs/toolkit/query/react';

import { baseQueryWithRefresh } from '@utils/api.ts';
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
  baseQuery: baseQueryWithRefresh,
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
