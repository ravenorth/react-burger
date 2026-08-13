import { Preloader } from '@krgaa/react-developer-burger-ui-components';
import { Outlet } from 'react-router-dom';

import { FeedInfo } from '@components/feed-info/feed-info';
import { OrdersList } from '@components/orders-list/orders-list';
import { useGetIngredientsQuery } from '@services/ingredients/ingredientsApi';
import { MOCK_FEED_STATS, MOCK_ORDERS } from '@utils/mockOrders';

import styles from './feed.module.css';

export const Feed = (): React.JSX.Element => {
  const { isLoading } = useGetIngredientsQuery();

  return (
    <>
      <main className={styles.page}>
        <h1 className={`${styles.title} text text_type_main-large mt-10 mb-5`}>
          Лента заказов
        </h1>
        {!isLoading ? (
          <div className={styles.content}>
            <div className={styles.orders}>
              <OrdersList orders={MOCK_ORDERS} path="/feed" />
            </div>
            <FeedInfo
              orders={MOCK_ORDERS}
              total={MOCK_FEED_STATS.total}
              today={MOCK_FEED_STATS.today}
            />
          </div>
        ) : (
          <Preloader />
        )}
      </main>
      <Outlet />
    </>
  );
};
