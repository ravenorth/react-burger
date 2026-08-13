type TIngredientType = 'bun' | 'main' | 'sauce';

type TOrderStatus = 'created' | 'pending' | 'done';

type TOrder = {
  _id: string;
  number: number;
  name: string;
  status: TOrderStatus;
  ingredients: string[];
  createdAt: string;
  updatedAt: string;
};

type TIngredient = {
  _id: string;
  name: string;
  type: TIngredientType;
  proteins: number;
  fat: number;
  carbohydrates: number;
  calories: number;
  price: number;
  image: string;
  image_large: string;
  image_mobile: string;
  __v: number;
};

type TConstructorIngredient = TIngredient & { key: string };

type TDragItem = {
  key: string;
  index: number;
};

type TUser = {
  email: string;
  name: string;
};

export type {
  TIngredientType,
  TIngredient,
  TConstructorIngredient,
  TDragItem,
  TUser,
  TOrderStatus,
  TOrder,
};
