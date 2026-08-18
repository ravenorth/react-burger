import {
  getIsAuthChecked,
  getUser,
  setIsAuthChecked,
  setUser,
  userSlice,
} from './userSlice.ts';

import type { TUser } from '@utils/types.ts';

const user: TUser = {
  email: 'test@example.com',
  name: 'Тестовый пользователь',
};

const otherUser: TUser = {
  email: 'other@example.com',
  name: 'Другой пользователь',
};

type TFulfilledUserAction = {
  type: string;
  payload: TUser;
  meta: {
    requestId: string;
    requestStatus: 'fulfilled';
    arg: { endpointName: string; queryCacheKey?: string };
  };
};

const createFulfilledUserAction = (
  endpointName: string,
  payload: TUser
): TFulfilledUserAction => ({
  type: 'userApi/executeMutation/fulfilled',
  payload,
  meta: {
    requestId: 'test-request-id',
    requestStatus: 'fulfilled',
    arg: { endpointName },
  },
});

const createFulfilledLogoutAction = (): TFulfilledUserAction => ({
  type: 'userApi/executeMutation/fulfilled',
  payload: undefined as unknown as TUser,
  meta: {
    requestId: 'test-request-id',
    requestStatus: 'fulfilled',
    arg: { endpointName: 'logout' },
  },
});

const createFulfilledQueryAction = (endpointName: string): TFulfilledUserAction => ({
  type: 'userApi/executeQuery/fulfilled',
  payload: user,
  meta: {
    requestId: 'test-request-id',
    requestStatus: 'fulfilled',
    arg: { endpointName, queryCacheKey: 'test-cache-key' },
  },
});

const initialState = userSlice.getInitialState();

describe('userSlice', () => {
  it('should return the initial state', (): void => {
    const state = userSlice.reducer(undefined, { type: '' });

    expect(state).toEqual({
      user: null,
      isAuthChecked: false,
    });
  });

  it('setIsAuthChecked: should update the auth check flag', (): void => {
    const state = userSlice.reducer(initialState, setIsAuthChecked(true));

    expect(state.isAuthChecked).toBe(true);
  });

  it('setUser: should set the user', (): void => {
    const state = userSlice.reducer(initialState, setUser(user));

    expect(state.user).toEqual(user);
  });

  it('setUser: should clear the user when null is passed', (): void => {
    const previousState = userSlice.reducer(initialState, setUser(user));
    const state = userSlice.reducer(previousState, setUser(null));

    expect(state.user).toBeNull();
  });
});

describe('userSlice extraReducers', () => {
  it('login fulfilled: should set the user and mark the auth as checked', (): void => {
    const state = userSlice.reducer(
      initialState,
      createFulfilledUserAction('login', user)
    );

    expect(state).toEqual({
      user,
      isAuthChecked: true,
    });
  });

  it('register fulfilled: should set the user and mark the auth as checked', (): void => {
    const state = userSlice.reducer(
      initialState,
      createFulfilledUserAction('register', user)
    );

    expect(state).toEqual({
      user,
      isAuthChecked: true,
    });
  });

  it('getUser fulfilled: should set the user without checking the auth', (): void => {
    const state = userSlice.reducer(initialState, createFulfilledQueryAction('getUser'));

    expect(state.user).toEqual(user);
    expect(state.isAuthChecked).toBe(false);
  });

  it('updateUser fulfilled: should replace the user', (): void => {
    const previousState = userSlice.reducer(
      initialState,
      createFulfilledUserAction('updateUser', user)
    );
    const state = userSlice.reducer(
      previousState,
      createFulfilledUserAction('updateUser', otherUser)
    );

    expect(state.user).toEqual(otherUser);
    expect(state.isAuthChecked).toBe(false);
  });

  it('logout fulfilled: should clear the user', (): void => {
    const previousState = userSlice.reducer(
      initialState,
      createFulfilledUserAction('login', user)
    );
    const state = userSlice.reducer(previousState, createFulfilledLogoutAction());

    expect(state.user).toBeNull();
    expect(state.isAuthChecked).toBe(true);
  });

  it('should ignore fulfilled actions of unknown endpoints', (): void => {
    const state = userSlice.reducer(
      initialState,
      createFulfilledUserAction('unknownEndpoint', user)
    );

    expect(state).toEqual(initialState);
  });
});

describe('userSlice selectors', () => {
  const rootState = {
    user: {
      user,
      isAuthChecked: true,
    },
  };

  it('getUser: should return the current user', (): void => {
    expect(getUser(rootState)).toEqual(user);
  });

  it('getIsAuthChecked: should return the auth check flag', (): void => {
    expect(getIsAuthChecked(rootState)).toBe(true);
  });
});
