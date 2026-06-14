import {
  Button,
  ConstructorElement,
  CurrencyIcon,
  DragIcon,
} from '@krgaa/react-developer-burger-ui-components';
import { useState } from 'react';
import { useSelector } from 'react-redux';

import { Modal } from '@components/modal/modal.tsx';
import { OrderDetails } from '@components/order-details/order-details.tsx';
import {
  getBun,
  getIngredients,
  getTotalPrice,
} from '@services/burgerConstructor/slice.ts';

import type { TConstructorIngredient } from '@utils/types';

import styles from './burger-constructor.module.css';

export const BurgerConstructor = (): React.JSX.Element => {
  const total = useSelector(getTotalPrice);

  const [orderDetailsOpened, setOrderDetailsOpened] = useState(false);

  return (
    <>
      <section className={`${styles.burgerConstructor} mb-10`}>
        <IngredientList />
        <footer className={`${styles.info} pl-4 pr-4 pt-10`}>
          <span className={`${styles.price} text text_type_digits-medium mr-10`}>
            {total} <CurrencyIcon className={styles.icon} type="primary" />
          </span>
          <Button
            htmlType="button"
            size="large"
            onClick={() => setOrderDetailsOpened(true)}
          >
            Оформить заказ
          </Button>
        </footer>
      </section>
      {orderDetailsOpened && (
        <Modal onClose={() => setOrderDetailsOpened(false)}>
          <OrderDetails id="034536" />
        </Modal>
      )}
    </>
  );
};

const IngredientList = (): React.JSX.Element => {
  const bun = useSelector(getBun);
  const ingredients = useSelector(getIngredients);

  return (
    <div className={styles.list}>
      {bun && (
        <ConstructorElement
          extraClass="ml-4 mr-4"
          text={`${bun.name} (верх)`}
          thumbnail={bun.image}
          price={bun.price}
          isLocked={true}
          type="top"
        />
      )}
      <div className={`${styles.otherIngredients} custom-scroll pl-4 pr-4`}>
        {ingredients.map((ingredient) => (
          <OptionalIngredient key={ingredient.key} ingredient={ingredient} />
        ))}
      </div>
      {bun && (
        <ConstructorElement
          extraClass="ml-4 mr-4"
          text={`${bun.name} (низ)`}
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
  ingredient: TConstructorIngredient;
};

const OptionalIngredient = ({
  ingredient,
}: TOptionalIngredientProps): React.JSX.Element => {
  return (
    <div className={styles.optionalIngredient}>
      <DragIcon type="primary" />
      <ConstructorElement
        key={ingredient.key}
        text={ingredient.name}
        thumbnail={ingredient.image}
        price={ingredient.price}
      />
    </div>
  );
};
