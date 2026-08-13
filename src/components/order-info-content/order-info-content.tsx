import {
  CurrencyIcon,
  FormattedDate,
  Preloader,
} from '@krgaa/react-developer-burger-ui-components';
import { clsx } from 'clsx';

import { GradientBorder } from '@components/gradient-border/gradient-border';
import { useGetIngredientsQuery } from '@services/ingredients/ingredientsApi';
import {
  getIngredientMap,
  getOrderComposition,
  getOrderStatusText,
  getOrderTotal,
  isOrderDone,
} from '@utils/orders';

import type { TIngredient, TOrder } from '@utils/types';

import styles from './order-info-content.module.css';

type TOrderInfoContentProps = {
  order: TOrder;
};

export const OrderInfoContent = ({
  order,
}: TOrderInfoContentProps): React.JSX.Element => {
  const { data: ingredients = [], isLoading } = useGetIngredientsQuery();
  const ingredientMap = getIngredientMap(ingredients);
  const composition = getOrderComposition(order, ingredientMap);
  const total = getOrderTotal(order, ingredientMap);

  if (isLoading) {
    return <Preloader />;
  }

  return (
    <div className={`${styles.content} pt-10 pr-10 pb-15 pl-10`}>
      <span className={`${styles.number} text text_type_digits-medium`}>
        #{order.number}
      </span>
      <p className="text text_type_main-medium mt-10">{order.name}</p>
      <p
        className={clsx(
          'text text_type_main-default mt-2',
          isOrderDone(order.status) && 'text_color_success'
        )}
      >
        {getOrderStatusText(order.status)}
      </p>
      <p className="text text_type_main-medium mt-15 mb-6">Состав:</p>
      <div className={`${styles.composition} custom-scroll pr-6`}>
        {composition.map(({ ingredient, count }) => (
          <CompositionRow key={ingredient._id} ingredient={ingredient} count={count} />
        ))}
      </div>
      <div className={`${styles.footer} mt-10`}>
        <FormattedDate
          className="text text_type_main-default text_color_inactive"
          date={new Date(order.createdAt)}
        />
        <span className={`${styles.total} text text_type_digits-default`}>
          {total} <CurrencyIcon className={styles.icon} type="primary" />
        </span>
      </div>
    </div>
  );
};

type TCompositionRowProps = {
  ingredient: TIngredient;
  count: number;
};

const CompositionRow = ({
  ingredient,
  count,
}: TCompositionRowProps): React.JSX.Element => {
  return (
    <div className={styles.row}>
      <GradientBorder>
        <img
          className={styles.rowImage}
          src={ingredient.image_mobile}
          alt={ingredient.name}
        />
      </GradientBorder>
      <span className="text text_type_main-default">{ingredient.name}</span>
      <span className={`${styles.rowPrice} text text_type_digits-default`}>
        {count} x {ingredient.price}{' '}
        <CurrencyIcon className={styles.icon} type="primary" />
      </span>
    </div>
  );
};
