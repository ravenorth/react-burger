import styles from './profile-orders.module.css';

export const ProfileOrders = (): React.JSX.Element => {
  return (
    <div className={styles.container}>
      <p className="text text_type_main-medium">История заказов</p>
      <p className="text text_type_main-default text_color_inactive mt-4">
        Страница находится в разработке
      </p>
    </div>
  );
};
