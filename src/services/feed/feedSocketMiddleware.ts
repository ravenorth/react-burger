import { createAction, type Action } from '@reduxjs/toolkit';

import { setConnected, setError, setOrders } from '@services/feed/feedSlice';
import { createSocketMiddleware } from '@services/socket/socketMiddleware';
import { apiUrls } from '@utils/apiUrls.ts';
import { isValidOrder } from '@utils/orders.ts';

import type { TOrder } from '@utils/types.ts';

export const wsConnectAll = createAction('feed/wsConnectAll');
export const wsDisconnectAll = createAction('feed/wsDisconnectAll');

type TFeedMessage = {
  success: boolean;
  orders?: TOrder[];
  total?: number;
  totalToday?: number;
};

export const feedSocketMiddleware = createSocketMiddleware<TFeedMessage>({
  connectType: wsConnectAll.type,
  disconnectType: wsDisconnectAll.type,
  getUrl: (): string => apiUrls.wsAllOrders,
  onOpen: (): Action => setConnected(true),
  onClose: (): Action => setConnected(false),
  onError: (message): Action => setError(message),
  onMessage: (data) => {
    if (!data.success) {
      return setError('Не удалось получить заказы');
    }
    return setOrders({
      orders: (data.orders ?? []).filter(isValidOrder),
      total: data.total ?? 0,
      totalToday: data.totalToday ?? 0,
    });
  },
});
