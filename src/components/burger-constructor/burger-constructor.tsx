import {
  Button,
  ConstructorElement,
  CurrencyIcon,
  DragIcon,
} from '@krgaa/react-developer-burger-ui-components';
import { useCallback, useState } from 'react';
import { useDrop } from 'react-dnd';
import { useDispatch, useSelector } from 'react-redux';

import { Modal } from '@components/modal/modal.tsx';
import { OrderDetails } from '@components/order-details/order-details.tsx';
import {
  addIngredient,
  getBun,
  getIngredients,
  getTotalPrice,
  removeIngredient,
} from '@services/burgerConstructor/burgerConstructorSlice.ts';
import { useCreateOrderMutation } from '@services/order/orderApi.ts';
import { BURGER_INGREDIENT_TYPE } from '@utils/dnd.ts';

import { ConstructorElementPlaceholder } from '../constructor-element-placeholder/constructor-element-placeholder.tsx';

import type { TConstructorIngredient, TIngredient } from '@utils/types';

import styles from './burger-constructor.module.css';

export const BurgerConstructor = (): React.JSX.Element => {
  const total = useSelector(getTotalPrice);
  const bun = useSelector(getBun);
  const ingredients = useSelector(getIngredients);
  const dispatch = useDispatch();

  const [collected, dropTargetRef] = useDrop<
    TIngredient,
    void,
    { isHover: boolean; isBun: boolean }
  >({
    accept: BURGER_INGREDIENT_TYPE,
    drop(ingredient) {
      dispatch(addIngredient(ingredient));
    },
    collect: (monitor) => {
      const item = monitor.getItem<TIngredient>();
      return {
        isHover: monitor.isOver() && monitor.canDrop(),
        isBun: item?.type === 'bun',
      };
    },
  });

  const { isHover, isBun } = collected;
  const bunTarget = isHover && isBun;
  const ingredientTarget = isHover && !isBun;

  const [createOrder, { data, isLoading }] = useCreateOrderMutation();

  const [orderDetailsOpened, setOrderDetailsOpened] = useState(false);

  const handleOrderClick = useCallback(() => {
    if (!bun) return;

    const ingredientIds = [bun._id, ...ingredients.map((item) => item._id), bun._id];

    createOrder({ ingredients: ingredientIds })
      .then(() => {
        setOrderDetailsOpened(true);
      })
      .catch(console.error);
  }, [bun, ingredients, createOrder]);

  const handleCloseModal = useCallback(() => {
    setOrderDetailsOpened(false);
  }, []);

  return (
    <>
      <section
        ref={(node) => {
          dropTargetRef(node);
        }}
        className={`${styles.burgerConstructor} mb-10`}
      >
        <IngredientList bunTarget={bunTarget} ingredientTarget={ingredientTarget} />
        <footer className={`${styles.info} pl-4 pr-4 pt-10`}>
          <span className={`${styles.price} text text_type_digits-medium mr-10`}>
            {total} <CurrencyIcon className={styles.icon} type="primary" />
          </span>
          <Button
            htmlType="button"
            size="large"
            onClick={handleOrderClick}
            disabled={isLoading || !bun}
          >
            {isLoading ? 'Оформляем...' : 'Оформить заказ'}
          </Button>
        </footer>
      </section>
      {orderDetailsOpened && data?.order && (
        <Modal onClose={handleCloseModal}>
          <OrderDetails id={data.order.number} />
        </Modal>
      )}
    </>
  );
};

type TIngredientListProps = {
  bunTarget: boolean;
  ingredientTarget: boolean;
};

const IngredientList = ({
  bunTarget,
  ingredientTarget,
}: TIngredientListProps): React.JSX.Element => {
  const bun = useSelector(getBun);
  const ingredients = useSelector(getIngredients);
  const dispatch = useDispatch();

  return (
    <div className={styles.list}>
      <Bun bun={bun} type="top" isTarget={bunTarget} />
      <div className={`${styles.ingredients} custom-scroll pl-4 pr-2`}>
        {ingredients.length > 0 ? (
          ingredients.map((ingredient) => (
            <Ingredient
              key={ingredient.key}
              ingredient={ingredient}
              onDelete={() => dispatch(removeIngredient(ingredient.key))}
            />
          ))
        ) : (
          <ConstructorElementPlaceholder
            text="Выберите начинку"
            isTarget={ingredientTarget}
          />
        )}
      </div>
      <Bun bun={bun} type="bottom" isTarget={bunTarget} />
    </div>
  );
};

type TBunProps = {
  bun: TIngredient | null;
  type: 'top' | 'bottom';
  isTarget: boolean;
};

const Bun = ({ bun, type, isTarget }: TBunProps): React.JSX.Element => {
  const hint = type === 'top' ? 'верх' : 'низ';

  return (
    <div className={`${styles.bun} custom-scroll pl-4 pr-2`}>
      {bun ? (
        <ConstructorElement
          text={`${bun.name} (${hint})`}
          thumbnail={bun.image}
          price={bun.price}
          isLocked={true}
          type={type}
        />
      ) : (
        <ConstructorElementPlaceholder
          text="Выберите булки"
          type={type}
          isTarget={isTarget}
        />
      )}
    </div>
  );
};

type TIngredientProps = {
  ingredient: TConstructorIngredient;
  onDelete: () => void;
};

const Ingredient = ({ ingredient, onDelete }: TIngredientProps): React.JSX.Element => {
  return (
    <div className={styles.ingredient}>
      <DragIcon type="primary" />
      <ConstructorElement
        key={ingredient.key}
        text={ingredient.name}
        thumbnail={ingredient.image}
        price={ingredient.price}
        handleClose={onDelete}
      />
    </div>
  );
};
