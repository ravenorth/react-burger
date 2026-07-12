import { type RefObject, useMemo, useRef } from 'react';

import { Ingredient } from '@components/burger-ingredient/burger-ingredient.tsx';
import { BurgerIngredientsTabs } from '@components/burger-ingredients-tabs/burger-ingredients-tabs.tsx';
import { useBurgerIngredientsTabsController } from '@hooks/useBurgerIngredientsTabsController.ts';
import { getIngredientsCountMap } from '@services/burgerConstructor/burgerConstructorSlice.ts';
import { useAppSelector } from '@services/hooks.ts';
import { useGetIngredientsQuery } from '@services/ingredients/ingredientsApi.ts';

import type { TIngredient } from '@utils/types';

import styles from './burger-ingredients.module.css';

export const BurgerIngredients = (): React.JSX.Element => {
  const { data: ingredients = [] } = useGetIngredientsQuery();
  const containerRef = useRef<HTMLDivElement>(null);
  const bunRef = useRef<HTMLHeadingElement>(null);
  const mainRef = useRef<HTMLHeadingElement>(null);
  const sauceRef = useRef<HTMLHeadingElement>(null);

  const countMap = useAppSelector(getIngredientsCountMap);

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
    <section className={`${styles.burgerIngredients} mb-10`}>
      <BurgerIngredientsTabs selectedTab={selectedTab} onTabClick={handleSelectTab} />
      <div
        className={`${styles.sections} custom-scroll`}
        ref={containerRef}
        onScroll={handleContainerScroll}
      >
        <Section ref={bunRef} title="Булки" ingredients={buns} countMap={countMap} />
        <Section ref={mainRef} title="Начинки" ingredients={mains} countMap={countMap} />
        <Section ref={sauceRef} title="Соусы" ingredients={sauces} countMap={countMap} />
      </div>
    </section>
  );
};

type TSectionProps = {
  ref?: RefObject<HTMLHeadingElement | null>;
  title: string;
  ingredients: TIngredient[];
  countMap: Record<string, number>;
};

const Section = ({
  ref,
  title,
  ingredients,
  countMap,
}: TSectionProps): React.JSX.Element => {
  return (
    <section ref={ref} className="mt-10">
      <h2 className="text text_type_main-medium mb-6">{title}</h2>
      <div className={`${styles.sectionIngredients} pl-4 pr-4`}>
        {ingredients.map((ingredient) => (
          <Ingredient
            key={ingredient._id}
            ingredient={ingredient}
            count={countMap[ingredient._id]}
          />
        ))}
      </div>
    </section>
  );
};
