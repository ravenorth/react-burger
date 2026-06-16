import { type RefObject, useMemo, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Ingredient } from '@components/burger-ingredient/burger-ingredient.tsx';
import { BurgerIngredientsTabs } from '@components/burger-ingredients-tabs/burger-ingredients-tabs.tsx';
import { IngredientDetails } from '@components/ingredient-details/ingredient-details.tsx';
import { Modal } from '@components/modal/modal.tsx';
import { useBurgerIngredientsTabsController } from '@hooks/useBurgerIngredientsTabsController.ts';
import {
  getIngredient,
  setIngredient,
} from '@services/ingredientDetails/ingredientDetailsSlice.ts';

import type { TIngredient } from '@utils/types';

import styles from './burger-ingredients.module.css';

type TBurgerIngredientsProps = {
  ingredients: TIngredient[];
};

export const BurgerIngredients = ({
  ingredients,
}: TBurgerIngredientsProps): React.JSX.Element => {
  const containerRef = useRef<HTMLDivElement>(null);
  const bunRef = useRef<HTMLHeadingElement>(null);
  const mainRef = useRef<HTMLHeadingElement>(null);
  const sauceRef = useRef<HTMLHeadingElement>(null);

  const dispatch = useDispatch();
  const openedIngredient = useSelector(getIngredient);

  const buns = useMemo(() => {
    return ingredients.filter((ingredient) => ingredient.type === 'bun');
  }, [ingredients]);
  const mains = useMemo(() => {
    return ingredients.filter((ingredient) => ingredient.type === 'main');
  }, [ingredients]);
  const sauces = useMemo(() => {
    return ingredients.filter((ingredient) => ingredient.type === 'sauce');
  }, [ingredients]);

  const { selectedTab, handleSelectTab, handleContainerScroll } =
    useBurgerIngredientsTabsController({
      containerRef,
      bunRef,
      mainRef,
      sauceRef,
    });

  return (
    <>
      <section className={`${styles.burgerIngredients} mb-10`}>
        <BurgerIngredientsTabs selectedTab={selectedTab} onTabClick={handleSelectTab} />
        <div
          className={`${styles.sections} custom-scroll`}
          ref={containerRef}
          onScroll={handleContainerScroll}
        >
          <Section
            ref={bunRef}
            title="Булки"
            ingredients={buns}
            onIngredientClick={(ingredient) => dispatch(setIngredient(ingredient))}
          />
          <Section
            ref={mainRef}
            title="Начинки"
            ingredients={mains}
            onIngredientClick={(ingredient) => dispatch(setIngredient(ingredient))}
          />
          <Section
            ref={sauceRef}
            title="Соусы"
            ingredients={sauces}
            onIngredientClick={(ingredient) => dispatch(setIngredient(ingredient))}
          />
        </div>
      </section>
      {openedIngredient && (
        <Modal title="Детали ингредиента" onClose={() => dispatch(setIngredient(null))}>
          <IngredientDetails ingredient={openedIngredient} />
        </Modal>
      )}
    </>
  );
};

type TSectionProps = {
  ref?: RefObject<HTMLHeadingElement | null>;
  title: string;
  ingredients: TIngredient[];
  onIngredientClick: (ingredient: TIngredient) => void;
};

const Section = ({
  ref,
  title,
  ingredients,
  onIngredientClick,
}: TSectionProps): React.JSX.Element => {
  return (
    <section ref={ref} className="mt-10">
      <h2 className="text text_type_main-medium mb-6">{title}</h2>
      <div className={`${styles.sectionIngredients} pl-4 pr-4`}>
        {ingredients.map((ingredient) => (
          <Ingredient
            key={ingredient._id}
            ingredient={ingredient}
            count={getMockCount(ingredient)}
            onClick={() => onIngredientClick(ingredient)}
          />
        ))}
      </div>
    </section>
  );
};

// TODO sprint2
const getMockCount = (ingredient: TIngredient): number | undefined => {
  return ingredient.price < 1000 ? 1 : undefined;
};
