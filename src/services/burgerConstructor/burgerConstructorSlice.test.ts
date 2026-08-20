import {
  addIngredient,
  burgerConstructorSlice,
  getBun,
  getIngredients,
  getIngredientsCountMap,
  getTotalPrice,
  moveIngredient,
  removeIngredient,
  resetConstructor,
} from './burgerConstructorSlice.ts';

import type { TConstructorIngredient, TIngredient } from '@utils/types.ts';

const bun: TIngredient = {
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

const anotherBun: TIngredient = {
  _id: 'bun-2',
  name: 'Флюоресцентная булка R2-D3',
  type: 'bun',
  proteins: 44,
  fat: 26,
  carbohydrates: 85,
  calories: 643,
  price: 988,
  image: '',
  image_large: '',
  image_mobile: '',
  __v: 0,
};

const sauce: TIngredient = {
  _id: 'sauce-1',
  name: 'Соус с фирменным вкусом',
  type: 'sauce',
  proteins: 0,
  fat: 10,
  carbohydrates: 2,
  calories: 50,
  price: 200,
  image: '',
  image_large: '',
  image_mobile: '',
  __v: 0,
};

const main: TIngredient = {
  _id: 'main-1',
  name: 'Биокотлета из марсианской Магнолии',
  type: 'main',
  proteins: 100,
  fat: 50,
  carbohydrates: 10,
  calories: 600,
  price: 500,
  image: '',
  image_large: '',
  image_mobile: '',
  __v: 0,
};

const initialState = burgerConstructorSlice.getInitialState();

describe('burgerConstructorSlice', () => {
  it('should return the initial state', (): void => {
    const state = burgerConstructorSlice.reducer(undefined, { type: '' });

    expect(state).toEqual({
      bun: null,
      ingredients: [],
    });
  });

  it('addIngredient: should add a bun', (): void => {
    const state = burgerConstructorSlice.reducer(initialState, addIngredient(bun));

    expect(state.bun).toMatchObject(bun);
    expect(state.ingredients).toEqual([]);
  });

  it('addIngredient: should assign a unique key to each added bun', (): void => {
    const firstAction = addIngredient(bun);
    const secondAction = addIngredient(anotherBun);

    expect(firstAction.payload.key).toEqual(expect.any(String));
    expect(firstAction.payload.key).not.toBe(secondAction.payload.key);
  });

  it('addIngredient: should replace the previous bun', (): void => {
    const previousState = burgerConstructorSlice.reducer(
      initialState,
      addIngredient(bun)
    );
    const state = burgerConstructorSlice.reducer(
      previousState,
      addIngredient(anotherBun)
    );

    expect(state.bun).toMatchObject(anotherBun);
    expect(state.bun).not.toBe(previousState.bun);
    expect(state.ingredients).toEqual([]);
  });

  it('addIngredient: should append a non-bun ingredient with a generated key', (): void => {
    const state = burgerConstructorSlice.reducer(initialState, addIngredient(main));

    expect(state.bun).toBeNull();
    expect(state.ingredients).toHaveLength(1);
    expect(state.ingredients[0]).toMatchObject(main);
    expect(state.ingredients[0].key).toEqual(expect.any(String));
  });

  it('addIngredient: should append ingredients and keep the bun', (): void => {
    const previousState = burgerConstructorSlice.reducer(
      initialState,
      addIngredient(bun)
    );
    const state = burgerConstructorSlice.reducer(previousState, addIngredient(main));

    expect(state.bun).toBe(previousState.bun);
    expect(state.ingredients).toHaveLength(1);
  });

  it('removeIngredient: should remove an ingredient by key', (): void => {
    const first: TConstructorIngredient = { ...main, key: 'key-1' };
    const second: TConstructorIngredient = { ...sauce, key: 'key-2' };
    const previousState = {
      bun: null,
      ingredients: [first, second],
    };
    const state = burgerConstructorSlice.reducer(
      previousState,
      removeIngredient('key-1')
    );

    expect(state.ingredients).toEqual([second]);
  });

  it('moveIngredient: should move an ingredient forward', (): void => {
    const first: TConstructorIngredient = { ...main, key: 'key-1' };
    const second: TConstructorIngredient = { ...sauce, key: 'key-2' };
    const third: TConstructorIngredient = { ...main, key: 'key-3' };
    const state = burgerConstructorSlice.reducer(
      { bun: null, ingredients: [first, second, third] },
      moveIngredient({ fromIndex: 0, toIndex: 2 })
    );

    expect(state.ingredients.map((item) => item.key)).toEqual([
      'key-2',
      'key-3',
      'key-1',
    ]);
  });

  it('moveIngredient: should move an ingredient backwards', (): void => {
    const first: TConstructorIngredient = { ...main, key: 'key-1' };
    const second: TConstructorIngredient = { ...sauce, key: 'key-2' };
    const third: TConstructorIngredient = { ...main, key: 'key-3' };
    const state = burgerConstructorSlice.reducer(
      { bun: null, ingredients: [first, second, third] },
      moveIngredient({ fromIndex: 2, toIndex: 0 })
    );

    expect(state.ingredients.map((item) => item.key)).toEqual([
      'key-3',
      'key-1',
      'key-2',
    ]);
  });

  it('resetConstructor: should reset the state', (): void => {
    const state = burgerConstructorSlice.reducer(
      { bun, ingredients: [{ ...main, key: 'key-1' }] },
      resetConstructor()
    );

    expect(state).toEqual(initialState);
  });
});

describe('burgerConstructorSlice selectors', () => {
  const rootState = {
    burgerConstructor: {
      bun,
      ingredients: [
        { ...main, key: 'key-1' },
        { ...sauce, key: 'key-2' },
        { ...main, key: 'key-3' },
      ],
    },
  };

  it('getBun: should return the selected bun', (): void => {
    expect(getBun(rootState)).toBe(bun);
  });

  it('getIngredients: should return the constructor ingredients', (): void => {
    expect(getIngredients(rootState)).toEqual(rootState.burgerConstructor.ingredients);
  });

  it('getTotalPrice: should count the bun twice', (): void => {
    expect(getTotalPrice(rootState)).toBe(bun.price * 2 + main.price * 2 + sauce.price);
  });

  it('getTotalPrice: should return 0 for an empty constructor', (): void => {
    expect(getTotalPrice({ burgerConstructor: { bun: null, ingredients: [] } })).toBe(0);
  });

  it('getIngredientsCountMap: should count the bun twice and each ingredient once', (): void => {
    expect(getIngredientsCountMap(rootState)).toEqual({
      'bun-1': 2,
      'main-1': 2,
      'sauce-1': 1,
    });
  });
});
