import { createSelector, createSlice } from '@reduxjs/toolkit';

import { isOrderDone } from '@utils/orders';

import type { TOrder } from '@utils/types.ts';

type TFeedState = {
  orders: TOrder[];
  total: number;
  totalToday: number;
  isConnected: boolean;
  error: string | null;
};

const initialState: TFeedState = {
  orders: [],
  total: 0,
  totalToday: 0,
  isConnected: false,
  error: null,
};

export const feedSlice = createSlice({
  name: 'feed',
  initialState,
  reducers: {
    setConnected(state, action: { payload: boolean }) {
      state.isConnected = action.payload;
      state.error = null;
    },
    setOrders(
      state,
      action: {
        payload: { orders: TOrder[]; total: number; totalToday: number };
      }
    ) {
      state.orders = action.payload.orders;
      state.total = action.payload.total;
      state.totalToday = action.payload.totalToday;
    },
    setError(state, action: { payload: string }) {
      state.error = action.payload;
    },
  },
  selectors: {
    getFeedOrders: (state) => state.orders,
    getFeedTotal: (state) => state.total,
    getFeedTotalToday: (state) => state.totalToday,
    getFeedIsConnected: (state) => state.isConnected,
    getFeedError: (state) => state.error,
    getFeedDoneNumbers: createSelector(
      (state: TFeedState) => state.orders,
      (orders) =>
        orders.filter((order) => isOrderDone(order.status)).map((order) => order.number)
    ),
    getFeedPendingNumbers: createSelector(
      (state: TFeedState) => state.orders,
      (orders) =>
        orders.filter((order) => !isOrderDone(order.status)).map((order) => order.number)
    ),
  },
});

export const { setConnected, setOrders, setError } = feedSlice.actions;
export const {
  getFeedOrders,
  getFeedTotal,
  getFeedTotalToday,
  getFeedIsConnected,
  getFeedError,
  getFeedDoneNumbers,
  getFeedPendingNumbers,
} = feedSlice.selectors;
