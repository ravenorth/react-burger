import { createSelector } from '@reduxjs/toolkit';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { apiUrls } from '@utils/apiUrls.ts';

import type { RootState } from '@services/store';
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

export const getIngredientMap = createSelector(
  (state: RootState) => ingredientsApi.endpoints.getIngredients.select()(state).data,
  (ingredients) =>
    (ingredients ?? []).reduce<Record<string, TIngredient>>((map, ingredient) => {
      map[ingredient._id] = ingredient;
      return map;
    }, {})
);
