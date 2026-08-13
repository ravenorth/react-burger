import { createAction, type Action, type MiddlewareAPI } from '@reduxjs/toolkit';

import {
  setProfileFeedConnected,
  setProfileFeedError,
  setProfileFeedOrders,
} from '@services/profile-feed/profileFeedSlice';
import { createSocketMiddleware } from '@services/socket/socketMiddleware';
import { apiUrls } from '@utils/apiUrls.ts';
import { isValidOrder } from '@utils/orders.ts';
import { getAccessToken, refreshToken } from '@utils/token.ts';

import type { TOrder } from '@utils/types.ts';

export const wsConnectUser = createAction('profileFeed/wsConnectUser');
export const wsDisconnectUser = createAction('profileFeed/wsDisconnectUser');

type TProfileFeedMessage = {
  success: boolean;
  orders?: TOrder[];
  total?: number;
  totalToday?: number;
  message?: string;
};

export const profileFeedSocketMiddleware = createSocketMiddleware<TProfileFeedMessage>({
  connectType: wsConnectUser.type,
  disconnectType: wsDisconnectUser.type,
  getUrl: (): string => {
    const token = (getAccessToken() ?? '').replace(/^Bearer\s+/i, '');
    return `${apiUrls.wsUserOrders}?token=${token}`;
  },
  onOpen: (): Action => setProfileFeedConnected(true),
  onClose: (): Action => setProfileFeedConnected(false),
  onError: (message): Action => setProfileFeedError(message),
  onMessage: async (data, api) => {
    if (!data.success) {
      if (data.message?.includes('Invalid or missing token')) {
        return reconnectWithFreshToken(api);
      }
      return setProfileFeedError(data.message ?? 'Ошибка соединения');
    }
    return setProfileFeedOrders({
      orders: (data.orders ?? []).filter(isValidOrder),
      total: data.total ?? 0,
      totalToday: data.totalToday ?? 0,
    });
  },
});

const reconnectWithFreshToken = async (api: MiddlewareAPI): Promise<Action> => {
  try {
    await refreshToken();
    api.dispatch(wsConnectUser());
    return setProfileFeedError(null);
  } catch {
    return setProfileFeedError('Сессия истекла');
  }
};
