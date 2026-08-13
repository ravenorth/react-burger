import type { TIngredient, TOrder, TOrderStatus } from './types.ts';

type TOrderCompositionItem = {
  ingredient: TIngredient;
  count: number;
};

export const getIngredientMap = (
  ingredients: TIngredient[]
): Record<string, TIngredient> =>
  ingredients.reduce<Record<string, TIngredient>>((acc, ingredient) => {
    acc[ingredient._id] = ingredient;
    return acc;
  }, {});

export const getOrderComposition = (
  order: TOrder,
  ingredientMap: Record<string, TIngredient>
): TOrderCompositionItem[] => {
  const counts = new Map<string, number>();

  order.ingredients.forEach((id) => {
    counts.set(id, (counts.get(id) ?? 0) + 1);
  });

  return [...counts.entries()].map(([id, count]) => ({
    ingredient: ingredientMap[id],
    count,
  }));
};

export const getOrderTotal = (
  order: TOrder,
  ingredientMap: Record<string, TIngredient>
): number =>
  order.ingredients.reduce((sum, id) => sum + (ingredientMap[id]?.price ?? 0), 0);

export const getOrderStatusText = (status: TOrderStatus): string => {
  switch (status) {
    case 'done':
      return 'Выполнен';
    case 'pending':
      return 'Готовится';
    case 'created':
      return 'Создан';
    default:
      return '';
  }
};

export const isOrderDone = (status: TOrderStatus): boolean => status === 'done';
