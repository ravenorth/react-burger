import { Preloader } from '@krgaa/react-developer-burger-ui-components';
import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';

import { OrdersList } from '@components/orders-list/orders-list';
import { useAppDispatch, useAppSelector } from '@services/hooks';
import { useGetIngredientsQuery } from '@services/ingredients/ingredientsApi';
import {
  getProfileFeedIsConnected,
  getProfileFeedOrders,
} from '@services/profile-feed/profileFeedSlice';
import {
  wsConnectUser,
  wsDisconnectUser,
} from '@services/profile-feed/profileFeedSocketMiddleware';

import styles from './profile-orders.module.css';

export const ProfileOrders = (): React.JSX.Element => {
  const dispatch = useAppDispatch();
  const { isLoading: isIngredientsLoading } = useGetIngredientsQuery();
  const orders = useAppSelector(getProfileFeedOrders);
  const isConnected = useAppSelector(getProfileFeedIsConnected);

  useEffect(() => {
    dispatch(wsConnectUser());
    return (): void => {
      dispatch(wsDisconnectUser());
    };
  }, [dispatch]);

  return (
    <>
      <div className={styles.container}>
        {isConnected && !isIngredientsLoading ? (
          <OrdersList orders={orders} path="/profile/orders" showStatus />
        ) : (
          <Preloader />
        )}
      </div>
      <Outlet />
    </>
  );
};
