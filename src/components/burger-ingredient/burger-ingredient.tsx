import { Counter, CurrencyIcon } from '@krgaa/react-developer-burger-ui-components';
import { useDrag } from 'react-dnd';
import { Link } from 'react-router-dom';

import { BURGER_INGREDIENT_TYPE } from '@utils/dnd.ts';

import type { TIngredient } from '@utils/types.ts';

import styles from './burger-ingredient.module.css';

type TIngredientProps = {
  ingredient: TIngredient;
  count?: number;
};

export const Ingredient = ({
  ingredient,
  count,
}: TIngredientProps): React.JSX.Element => {
  const [, dragRef] = useDrag({
    type: BURGER_INGREDIENT_TYPE,
    item: ingredient,
  });

  return (
    <Link
      ref={(node) => {
        dragRef(node);
      }}
      to={`/ingredients/${ingredient._id}`}
      className={styles.burgerIngredient}
    >
      <img
        className={`${styles.image} ml-4 mr-4`}
        src={ingredient.image}
        alt={ingredient.name}
      />
      <span className={`${styles.price} text text_type_digits-default mt-1 mb-1`}>
        {ingredient.price} <CurrencyIcon className={styles.icon} type="primary" />
      </span>
      <span className="text text_type_main-small">{ingredient.name}</span>
      {count && <Counter extraClass={styles.counter} count={count} />}
    </Link>
  );
};
