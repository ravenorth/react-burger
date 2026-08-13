import { Preloader } from '@krgaa/react-developer-burger-ui-components';
import { useParams } from 'react-router-dom';

import { OrderInfoContent } from '@components/order-info-content/order-info-content';
import { getFeedOrders } from '@services/feed/feedSlice';
import { useAppSelector } from '@services/hooks';
import { useGetOrderByIdQuery } from '@services/order/orderApi';
import { getProfileFeedOrders } from '@services/profile-feed/profileFeedSlice';

import styles from './order-info.module.css';

export const OrderInfo = (): React.JSX.Element => {
  const { id } = useParams<{ id: string }>();
  const socketOrder = useAppSelector((state) => {
    const order = getFeedOrders(state).find((order) => order._id === id);
    return order ?? getProfileFeedOrders(state).find((order) => order._id === id);
  });
  const { data: fetchedOrder, isLoading } = useGetOrderByIdQuery(id ?? '', {
    skip: !id || !!socketOrder,
  });

  const order = socketOrder ?? fetchedOrder;

  if (!order) {
    if (isLoading) {
      return <Preloader />;
    }
    return (
      <div className={styles.notFound}>
        <p className="text text_type_main-medium">Заказ не найден</p>
      </div>
    );
  }

  return <OrderInfoContent order={order} />;
};
