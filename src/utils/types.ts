type TIngredientType = 'bun' | 'main' | 'sauce';

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

export type { TIngredientType, TIngredient, TConstructorIngredient };
