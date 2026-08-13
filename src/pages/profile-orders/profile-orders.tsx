import { Preloader } from '@krgaa/react-developer-burger-ui-components';
import { Outlet } from 'react-router-dom';

import { OrdersList } from '@components/orders-list/orders-list';
import { useGetIngredientsQuery } from '@services/ingredients/ingredientsApi';
import { MOCK_ORDERS } from '@utils/mockOrders';

import styles from './profile-orders.module.css';

export const ProfileOrders = (): React.JSX.Element => {
  const { isLoading } = useGetIngredientsQuery();

  return (
    <>
      <div className={styles.container}>
        {!isLoading ? (
          <OrdersList orders={MOCK_ORDERS} path="/profile/orders" showStatus />
        ) : (
          <Preloader />
        )}
      </div>
      <Outlet />
    </>
  );
};
