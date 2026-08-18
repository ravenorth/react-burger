import {
  getProfileFeedError,
  getProfileFeedIsConnected,
  getProfileFeedOrders,
  getProfileFeedTotal,
  getProfileFeedTotalToday,
  profileFeedSlice,
  setProfileFeedConnected,
  setProfileFeedError,
  setProfileFeedOrders,
} from './profileFeedSlice.ts';

import type { TOrder } from '@utils/types.ts';

const doneOrder: TOrder = {
  _id: 'order-1',
  number: 10,
  name: 'Бургер с био-котлетой',
  status: 'done',
  ingredients: [],
  createdAt: '2026-08-17T10:00:00.000Z',
  updatedAt: '2026-08-17T10:05:00.000Z',
};

const pendingOrder: TOrder = {
  _id: 'order-2',
  number: 11,
  name: 'Бургер с соусом',
  status: 'pending',
  ingredients: [],
  createdAt: '2026-08-17T11:00:00.000Z',
  updatedAt: '2026-08-17T11:05:00.000Z',
};

const initialState = profileFeedSlice.getInitialState();

describe('profileFeedSlice', () => {
  it('should return the initial state', (): void => {
    const state = profileFeedSlice.reducer(undefined, { type: '' });

    expect(state).toEqual({
      orders: [],
      total: 0,
      totalToday: 0,
      isConnected: false,
      error: null,
    });
  });

  it('setProfileFeedConnected: should mark the feed as connected', (): void => {
    const state = profileFeedSlice.reducer(initialState, setProfileFeedConnected(true));

    expect(state.isConnected).toBe(true);
    expect(state.error).toBeNull();
  });

  it('setProfileFeedConnected: should clear the previous error', (): void => {
    const previousState = profileFeedSlice.reducer(
      initialState,
      setProfileFeedError('connection failed')
    );
    const state = profileFeedSlice.reducer(
      previousState,
      setProfileFeedConnected(false)
    );

    expect(state.isConnected).toBe(false);
    expect(state.error).toBeNull();
  });

  it('setProfileFeedOrders: should replace orders and totals', (): void => {
    const orders = [doneOrder, pendingOrder];
    const state = profileFeedSlice.reducer(
      initialState,
      setProfileFeedOrders({ orders, total: 200, totalToday: 5 })
    );

    expect(state.orders).toEqual(orders);
    expect(state.total).toBe(200);
    expect(state.totalToday).toBe(5);
  });

  it('setProfileFeedError: should save the error message', (): void => {
    const state = profileFeedSlice.reducer(
      initialState,
      setProfileFeedError('connection failed')
    );

    expect(state.error).toBe('connection failed');
  });

  it('setProfileFeedError: should clear the error when null is passed', (): void => {
    const previousState = profileFeedSlice.reducer(
      initialState,
      setProfileFeedError('connection failed')
    );
    const state = profileFeedSlice.reducer(previousState, setProfileFeedError(null));

    expect(state.error).toBeNull();
  });
});

describe('profileFeedSlice selectors', () => {
  const state = profileFeedSlice.reducer(
    initialState,
    setProfileFeedOrders({
      orders: [doneOrder, pendingOrder],
      total: 2,
      totalToday: 1,
    })
  );
  const connectedState = profileFeedSlice.reducer(state, setProfileFeedConnected(true));
  const rootState = { profileFeed: state };
  const connectedRootState = { profileFeed: connectedState };

  it('getProfileFeedOrders: should return the feed orders', (): void => {
    expect(getProfileFeedOrders(rootState)).toEqual([doneOrder, pendingOrder]);
  });

  it('getProfileFeedTotal: should return the total number of orders', (): void => {
    expect(getProfileFeedTotal(rootState)).toBe(2);
  });

  it('getProfileFeedTotalToday: should return the total number of orders today', (): void => {
    expect(getProfileFeedTotalToday(rootState)).toBe(1);
  });

  it('getProfileFeedIsConnected: should return the connection status', (): void => {
    expect(getProfileFeedIsConnected(connectedRootState)).toBe(true);
  });

  it('getProfileFeedError: should return the error message', (): void => {
    expect(getProfileFeedError(rootState)).toBeNull();
  });
});
