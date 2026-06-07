import {
  Button,
  ConstructorElement,
  CurrencyIcon,
  DragIcon,
} from '@krgaa/react-developer-burger-ui-components';
import { useMemo } from 'react';

import type { TIngredient } from '@utils/types';

import styles from './burger-constructor.module.css';

type TBurgerConstructorProps = {
  ingredients: TIngredient[];
};

export const BurgerConstructor = ({
  ingredients,
}: TBurgerConstructorProps): React.JSX.Element => {
  const total = useMemo(() => {
    return ingredients.reduce((acc, ingredient) => acc + ingredient.price, 0);
  }, [ingredients]);

  return (
    <section className={`${styles.burgerConstructor} mb-10`}>
      <IngredientList ingredients={ingredients} />
      <footer className={`${styles.info} pl-4 pr-4 pt-10`}>
        <span className={`${styles.price} text text_type_digits-medium mr-10`}>
          {total} <CurrencyIcon className={styles.icon} type="primary" />
        </span>
        <Button
          htmlType="button"
          size="large"
          onClick={() => {
            /*TODO: sprint1*/
          }}
        >
          Оформить заказ
        </Button>
      </footer>
    </section>
  );
};

type TIngredientListProps = {
  ingredients: TIngredient[];
};

const IngredientList = ({ ingredients }: TIngredientListProps): React.JSX.Element => {
  const bun = useMemo(() => {
    return ingredients.find((ingredient) => ingredient.type === 'bun');
  }, [ingredients]);
  const otherIngredients = useMemo(() => {
    return ingredients.filter((ingredient) => ingredient.type !== 'bun');
  }, [ingredients]);

  return (
    <div className={styles.list}>
      {bun && (
        <ConstructorElement
          extraClass="ml-4 mr-4"
          text={bun.name}
          thumbnail={bun.image}
          price={bun.price}
          isLocked={true}
          type="top"
        />
      )}
      <div className={`${styles.otherIngredients} custom-scroll pl-4 pr-4`}>
        {otherIngredients.map((ingredient) => (
          <OptionalIngredient key={ingredient._id} ingredient={ingredient} />
        ))}
      </div>
      {bun && (
        <ConstructorElement
          extraClass="ml-4 mr-4"
          text={bun.name}
          thumbnail={bun.image}
          price={bun.price}
          isLocked={true}
          type="bottom"
        />
      )}
    </div>
  );
};

type TOptionalIngredientProps = {
  ingredient: TIngredient;
};

const OptionalIngredient = ({
  ingredient,
}: TOptionalIngredientProps): React.JSX.Element => {
  return (
    <div className={styles.optionalIngredient}>
      <DragIcon type="primary" />
      <ConstructorElement
        key={ingredient._id}
        text={ingredient.name}
        thumbnail={ingredient.image}
        price={ingredient.price}
      />
    </div>
  );
};
