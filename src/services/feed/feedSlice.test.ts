import {
  feedSlice,
  getFeedDoneNumbers,
  getFeedError,
  getFeedIsConnected,
  getFeedOrders,
  getFeedPendingNumbers,
  getFeedTotal,
  getFeedTotalToday,
  setConnected,
  setError,
  setOrders,
} from './feedSlice.ts';

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

const createdOrder: TOrder = {
  _id: 'order-3',
  number: 12,
  name: 'Бургер классический',
  status: 'created',
  ingredients: [],
  createdAt: '2026-08-17T12:00:00.000Z',
  updatedAt: '2026-08-17T12:05:00.000Z',
};

const initialState = feedSlice.getInitialState();

describe('feedSlice', () => {
  it('should return the initial state', (): void => {
    const state = feedSlice.reducer(undefined, { type: '' });

    expect(state).toEqual({
      orders: [],
      total: 0,
      totalToday: 0,
      isConnected: false,
      error: null,
    });
  });

  it('setConnected: should mark the feed as connected', (): void => {
    const state = feedSlice.reducer(initialState, setConnected(true));

    expect(state.isConnected).toBe(true);
    expect(state.error).toBeNull();
  });

  it('setConnected: should clear the previous error', (): void => {
    const previousState = feedSlice.reducer(initialState, setError('connection failed'));
    const state = feedSlice.reducer(previousState, setConnected(false));

    expect(state.isConnected).toBe(false);
    expect(state.error).toBeNull();
  });

  it('setOrders: should replace orders and totals', (): void => {
    const orders = [doneOrder, pendingOrder];
    const state = feedSlice.reducer(
      initialState,
      setOrders({ orders, total: 200, totalToday: 5 })
    );

    expect(state.orders).toEqual(orders);
    expect(state.total).toBe(200);
    expect(state.totalToday).toBe(5);
  });

  it('setError: should save the error message', (): void => {
    const state = feedSlice.reducer(initialState, setError('connection failed'));

    expect(state.error).toBe('connection failed');
  });
});

describe('feedSlice selectors', () => {
  const rootState = {
    feed: feedSlice.reducer(
      initialState,
      setOrders({
        orders: [doneOrder, pendingOrder, createdOrder],
        total: 3,
        totalToday: 1,
      })
    ),
  };

  it('getFeedOrders: should return the feed orders', (): void => {
    expect(getFeedOrders(rootState)).toEqual([doneOrder, pendingOrder, createdOrder]);
  });

  it('getFeedTotal: should return the total number of orders', (): void => {
    expect(getFeedTotal(rootState)).toBe(3);
  });

  it('getFeedTotalToday: should return the total number of orders today', (): void => {
    expect(getFeedTotalToday(rootState)).toBe(1);
  });

  it('getFeedIsConnected: should return the connection status', (): void => {
    expect(getFeedIsConnected(rootState)).toBe(false);
  });

  it('getFeedError: should return the error message', (): void => {
    expect(getFeedError(rootState)).toBeNull();
  });

  it('getFeedDoneNumbers: should return numbers of done orders only', (): void => {
    expect(getFeedDoneNumbers(rootState)).toEqual([10]);
  });

  it('getFeedPendingNumbers: should return numbers of not-done orders only', (): void => {
    expect(getFeedPendingNumbers(rootState)).toEqual([11, 12]);
  });
});
