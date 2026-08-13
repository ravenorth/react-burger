import { createApi } from '@reduxjs/toolkit/query/react';

import { baseQueryWithRefresh } from '@utils/api.ts';
import { apiUrls } from '@utils/apiUrls.ts';

import type { TOrder } from '@utils/types.ts';

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

type TGetOrderResponse = {
  success: boolean;
  order: TOrder;
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
    getOrderById: builder.query<TOrder, string>({
      query: (id) => ({
        url: `${apiUrls.getOrder}/${id}`,
        method: 'GET',
      }),
      transformResponse: (response: TGetOrderResponse) => {
        if (!response.success) {
          throw new Error('Server returned "success: false"');
        }
        return response.order;
      },
    }),
  }),
});

export const { useCreateOrderMutation, useGetOrderByIdQuery } = orderApi;
