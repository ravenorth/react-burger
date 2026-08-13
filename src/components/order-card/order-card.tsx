import {
  CurrencyIcon,
  FormattedDate,
} from '@krgaa/react-developer-burger-ui-components';
import { clsx } from 'clsx';
import { useMemo } from 'react';
import { Link } from 'react-router-dom';

import { GradientBorder } from '@components/gradient-border/gradient-border';
import { useAppSelector } from '@services/hooks';
import { getIngredientMap } from '@services/ingredients/ingredientsApi';
import { getOrderStatusText, getOrderTotal, isOrderDone } from '@utils/orders';

import type { TIngredient, TOrder } from '@utils/types';

import styles from './order-card.module.css';

const MAX_PREVIEW_INGREDIENTS = 3;

type TOrderCardProps = {
  order: TOrder;
  path: string;
  showStatus?: boolean;
};

export const OrderCard = ({
  order,
  path,
  showStatus = false,
}: TOrderCardProps): React.JSX.Element => {
  const ingredientMap = useAppSelector(getIngredientMap);

  const { previewIngredients, extraCount } = useMemo(() => {
    const ingredientSet = new Set(order.ingredients);
    const _previewIngredients = [...ingredientSet]
      .map((id) => ingredientMap[id])
      .slice(0, MAX_PREVIEW_INGREDIENTS);
    const _extraCount = ingredientSet.size - _previewIngredients.length;

    return { previewIngredients: _previewIngredients, extraCount: _extraCount };
  }, [order, ingredientMap]);

  const total = getOrderTotal(order, ingredientMap);

  return (
    <Link to={`${path}/${order._id}`} className={`${styles.card} p-6`}>
      <div className={styles.header}>
        <span className="text text_type_digits-default">#{order.number}</span>
        <FormattedDate
          className="text text_type_main-default text_color_inactive"
          date={new Date(order.createdAt)}
        />
      </div>
      <p className="text text_type_main-medium mt-6">{order.name}</p>
      {showStatus && (
        <p
          className={clsx(
            'text text_type_main-default mt-2',
            isOrderDone(order.status) && 'text_color_success'
          )}
        >
          {getOrderStatusText(order.status)}
        </p>
      )}
      <div className={`${styles.footer} mt-6`}>
        <IngredientPreview ingredients={previewIngredients} extraCount={extraCount} />
        <span className={`${styles.price} text text_type_digits-default`}>
          {total} <CurrencyIcon className={styles.icon} type="primary" />
        </span>
      </div>
    </Link>
  );
};

type TIngredientPreviewProps = {
  ingredients: TIngredient[];
  extraCount: number;
};

const IngredientPreview = ({
  ingredients,
  extraCount,
}: TIngredientPreviewProps): React.JSX.Element => {
  return (
    <ul className={styles.preview}>
      {ingredients.map((ingredient, index) => (
        <li
          key={ingredient._id}
          className={styles.previewItem}
          style={{ zIndex: -index }}
        >
          <GradientBorder>
            {index === ingredients.length - 1 && extraCount > 0 ? (
              <span className="text text_type_main-default">+{extraCount}</span>
            ) : (
              <img
                className={styles.previewImage}
                src={ingredient.image_mobile}
                alt={ingredient.name}
              />
            )}
          </GradientBorder>
        </li>
      ))}
    </ul>
  );
};
