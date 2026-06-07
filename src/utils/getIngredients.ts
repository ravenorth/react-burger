import { apiUrls } from '@utils/apiUrls.ts';

import type { TIngredient } from '@utils/types.ts';

type TIngredientsResponse = {
  success: boolean;
  data: TIngredient[];
};

async function request<T>(url: string): Promise<T> {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Request failed: ${response.status} ${response.statusText}`);
  }
  return response.json() as Promise<T>;
}

export async function getIngredients(): Promise<TIngredient[]> {
  const result = await request<TIngredientsResponse>(apiUrls.getIngredients);

  if (!result.success) {
    throw new Error('Server returned "success: false"');
  }

  return result.data;
}
