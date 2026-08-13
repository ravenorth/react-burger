import { OrderCard } from '@components/order-card/order-card';

import type { TOrder } from '@utils/types';

import styles from './orders-list.module.css';

type TOrdersListProps = {
  orders: TOrder[];
  path: string;
  showStatus?: boolean;
};

export const OrdersList = ({
  orders,
  path,
  showStatus = false,
}: TOrdersListProps): React.JSX.Element => {
  return (
    <div className={`${styles.list} custom-scroll pr-2`}>
      {orders.map((order) => (
        <OrderCard key={order._id} order={order} path={path} showStatus={showStatus} />
      ))}
    </div>
  );
};
