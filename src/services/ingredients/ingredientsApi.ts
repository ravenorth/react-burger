import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { apiUrls } from '@utils/apiUrls.ts';

import type { TIngredient } from '@utils/types.ts';

type TIngredientsResponse = {
  success: boolean;
  data: TIngredient[];
};

export const ingredientsApi = createApi({
  reducerPath: 'ingredientsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: apiUrls.baseUrl,
  }),
  endpoints: (builder) => ({
    getIngredients: builder.query<TIngredient[], void>({
      query: () => apiUrls.getIngredients,
      transformResponse: (response: TIngredientsResponse) => {
        if (!response.success) {
          throw new Error('Server returned "success: false"');
        }
        return response.data;
      },
    }),
  }),
});

export const { useGetIngredientsQuery } = ingredientsApi;
