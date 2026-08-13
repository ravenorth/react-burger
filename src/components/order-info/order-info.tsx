import { useParams } from 'react-router-dom';

import { OrderInfoContent } from '@components/order-info-content/order-info-content';
import { MOCK_ORDERS } from '@utils/mockOrders';

import styles from './order-info.module.css';

export const OrderInfo = (): React.JSX.Element => {
  const { id } = useParams<{ id: string }>();
  const order = MOCK_ORDERS.find((order) => order._id === id);

  if (!order) {
    return (
      <div className={styles.notFound}>
        <p className="text text_type_main-medium">Заказ не найден</p>
      </div>
    );
  }

  return <OrderInfoContent order={order} />;
};
