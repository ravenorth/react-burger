import doneIcon from '@assets/images/done.svg';

import styles from './order-details.module.css';

type TOrderDetailsProps = {
  id: string;
};

export function OrderDetails({ id }: TOrderDetailsProps): React.JSX.Element {
  return (
    <div className={`${styles.content} pt-30 pb-30 pl-25 pr-25`}>
      <h3 className="text text_type_digits-large mb-8">{id}</h3>
      <span className="text text_type_main-medium">идентификатор заказа</span>
      <img className={`${styles.image} mt-15 mb-15`} src={doneIcon} alt="done-icon" />
      <span className="text text_type_main-default mb-2">Ваш заказ начали готовить</span>
      <span className="text text_type_main-default text_color_inactive">
        Дождитесь готовности на орбитальной станции
      </span>
    </div>
  );
}
