import { Counter, CurrencyIcon } from '@krgaa/react-developer-burger-ui-components';

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
  return (
    <div className={styles.burgerIngredient}>
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
