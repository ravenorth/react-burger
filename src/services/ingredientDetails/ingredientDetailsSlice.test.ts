import {
  getIngredient,
  ingredientDetailsSlice,
  setIngredient,
} from './ingredientDetailsSlice.ts';

import type { TIngredient } from '@utils/types.ts';

const ingredient: TIngredient = {
  _id: 'bun-1',
  name: 'Краторная булка',
  type: 'bun',
  proteins: 80,
  fat: 24,
  carbohydrates: 53,
  calories: 420,
  price: 1255,
  image: '',
  image_large: '',
  image_mobile: '',
  __v: 0,
};

const initialState = ingredientDetailsSlice.getInitialState();

describe('ingredientDetailsSlice', () => {
  it('should return the initial state', (): void => {
    const state = ingredientDetailsSlice.reducer(undefined, { type: '' });

    expect(state).toEqual({
      ingredient: null,
    });
  });

  it('setIngredient: should set the ingredient', (): void => {
    const state = ingredientDetailsSlice.reducer(
      initialState,
      setIngredient(ingredient)
    );

    expect(state.ingredient).toEqual(ingredient);
  });

  it('setIngredient: should clear the ingredient when null is passed', (): void => {
    const previousState = ingredientDetailsSlice.reducer(
      initialState,
      setIngredient(ingredient)
    );
    const state = ingredientDetailsSlice.reducer(previousState, setIngredient(null));

    expect(state.ingredient).toBeNull();
  });
});

describe('ingredientDetailsSlice selectors', () => {
  it('getIngredient: should return the selected ingredient', (): void => {
    const state = ingredientDetailsSlice.reducer(
      initialState,
      setIngredient(ingredient)
    );

    expect(getIngredient({ ingredientDetails: state })).toEqual(ingredient);
  });
});
