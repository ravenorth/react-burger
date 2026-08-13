import { Preloader } from '@krgaa/react-developer-burger-ui-components';
import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';

import { FeedInfo } from '@components/feed-info/feed-info';
import { OrdersList } from '@components/orders-list/orders-list';
import {
  getFeedIsConnected,
  getFeedOrders,
  getFeedTotal,
  getFeedTotalToday,
} from '@services/feed/feedSlice';
import { wsConnectAll, wsDisconnectAll } from '@services/feed/feedSocketMiddleware';
import { useAppDispatch, useAppSelector } from '@services/hooks';
import { useGetIngredientsQuery } from '@services/ingredients/ingredientsApi';

import styles from './feed.module.css';

export const Feed = (): React.JSX.Element => {
  const dispatch = useAppDispatch();
  const { isLoading: isIngredientsLoading } = useGetIngredientsQuery();
  const orders = useAppSelector(getFeedOrders);
  const total = useAppSelector(getFeedTotal);
  const totalToday = useAppSelector(getFeedTotalToday);
  const isConnected = useAppSelector(getFeedIsConnected);

  useEffect(() => {
    dispatch(wsConnectAll());
    return (): void => {
      dispatch(wsDisconnectAll());
    };
  }, [dispatch]);

  return (
    <>
      <main className={styles.page}>
        <h1 className={`${styles.title} text text_type_main-large mt-10 mb-5`}>
          Лента заказов
        </h1>
        {isConnected && !isIngredientsLoading ? (
          <div className={styles.content}>
            <div className={styles.orders}>
              <OrdersList orders={orders} path="/feed" />
            </div>
            <FeedInfo total={total} today={totalToday} />
          </div>
        ) : (
          <Preloader />
        )}
      </main>
      <Outlet />
    </>
  );
};
