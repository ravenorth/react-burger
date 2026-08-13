import { useNavigate } from 'react-router-dom';

import { Modal } from '@components/modal/modal';
import { OrderInfo } from '@components/order-info/order-info';

export const FeedOrderModal = (): React.JSX.Element => {
  const navigate = useNavigate();

  return (
    <Modal
      onClose={() => {
        void navigate('/feed');
      }}
    >
      <OrderInfo />
    </Modal>
  );
};
