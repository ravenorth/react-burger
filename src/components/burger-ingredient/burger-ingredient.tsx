import { Counter, CurrencyIcon } from '@krgaa/react-developer-burger-ui-components';
import { useDrag } from 'react-dnd';

import { BURGER_INGREDIENT_TYPE } from '@utils/dnd.ts';

import type { TIngredient } from '@utils/types.ts';

import styles from './burger-ingredient.module.css';

type TIngredientProps = {
  ingredient: TIngredient;
  count?: number;
  onClick?: () => void;
};

export const Ingredient = ({
  ingredient,
  count,
  onClick,
}: TIngredientProps): React.JSX.Element => {
  const [, dragRef] = useDrag({
    type: BURGER_INGREDIENT_TYPE,
    item: ingredient,
  });

  return (
    <div
      ref={(node) => {
        dragRef(node);
      }}
      className={styles.burgerIngredient}
      onClick={onClick}
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
    </div>
  );
};
