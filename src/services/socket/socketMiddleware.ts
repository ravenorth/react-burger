import type { Action, Middleware, MiddlewareAPI, UnknownAction } from '@reduxjs/toolkit';

type TSocketMessageHandler<TMessage> = (
  message: TMessage,
  api: MiddlewareAPI
) => Action | Promise<Action | void>;

type TSocketMiddlewareConfig<TMessage> = {
  connectType: string;
  disconnectType: string;
  getUrl: () => string;
  onOpen: () => Action;
  onClose: () => Action;
  onError: (message: string) => Action;
  onMessage: TSocketMessageHandler<TMessage>;
};

export const createSocketMiddleware = <TMessage>(
  config: TSocketMiddlewareConfig<TMessage>
): Middleware => {
  let ws: WebSocket | null = null;

  return (storeApi) => (next) => (action) => {
    const { type } = action as UnknownAction;

    if (type === config.connectType) {
      if (ws) {
        ws.close();
      }

      ws = new WebSocket(config.getUrl());

      ws.onopen = (): void => {
        storeApi.dispatch(config.onOpen());
      };
      ws.onerror = (): void => {
        storeApi.dispatch(config.onError('Ошибка соединения'));
      };
      ws.onclose = (): void => {
        ws = null;
        storeApi.dispatch(config.onClose());
      };
      ws.onmessage = async (event): Promise<void> => {
        try {
          const data = JSON.parse(event.data as string) as TMessage;
          const messageAction = await config.onMessage(data, storeApi);
          if (messageAction) {
            storeApi.dispatch(messageAction);
          }
        } catch {
          console.log('Ошибка!');
        }
      };
    }

    if (type === config.disconnectType) {
      if (ws) {
        ws.close();
        ws = null;
      }
    }

    return next(action);
  };
};
