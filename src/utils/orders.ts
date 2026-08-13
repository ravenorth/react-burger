import type { TIngredient, TOrder, TOrderStatus } from './types.ts';

const VALID_ORDER_STATUSES: TOrderStatus[] = ['created', 'pending', 'done'];

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

export const isValidOrder = (order: TOrder | null | undefined): boolean => {
  if (!order || typeof order !== 'object') {
    return false;
  }
  return (
    '_id' in order &&
    'number' in order &&
    'name' in order &&
    'status' in order &&
    'ingredients' in order &&
    'createdAt' in order &&
    'updatedAt' in order &&
    VALID_ORDER_STATUSES.includes(order.status) &&
    Array.isArray(order.ingredients)
  );
};
