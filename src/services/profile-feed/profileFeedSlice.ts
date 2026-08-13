import { createSlice } from '@reduxjs/toolkit';

import type { TOrder } from '@utils/types.ts';

type TProfileFeedState = {
  orders: TOrder[];
  total: number;
  totalToday: number;
  isConnected: boolean;
  error: string | null;
};

const initialState: TProfileFeedState = {
  orders: [],
  total: 0,
  totalToday: 0,
  isConnected: false,
  error: null,
};

export const profileFeedSlice = createSlice({
  name: 'profileFeed',
  initialState,
  reducers: {
    setProfileFeedConnected(state, action: { payload: boolean }) {
      state.isConnected = action.payload;
      state.error = null;
    },
    setProfileFeedOrders(
      state,
      action: {
        payload: { orders: TOrder[]; total: number; totalToday: number };
      }
    ) {
      state.orders = action.payload.orders;
      state.total = action.payload.total;
      state.totalToday = action.payload.totalToday;
    },
    setProfileFeedError(state, action: { payload: string | null }) {
      state.error = action.payload;
    },
  },
  selectors: {
    getProfileFeedOrders: (state) => state.orders,
    getProfileFeedTotal: (state) => state.total,
    getProfileFeedTotalToday: (state) => state.totalToday,
    getProfileFeedIsConnected: (state) => state.isConnected,
    getProfileFeedError: (state) => state.error,
  },
});

export const { setProfileFeedConnected, setProfileFeedOrders, setProfileFeedError } =
  profileFeedSlice.actions;
export const {
  getProfileFeedOrders,
  getProfileFeedTotal,
  getProfileFeedTotalToday,
  getProfileFeedIsConnected,
  getProfileFeedError,
} = profileFeedSlice.selectors;
