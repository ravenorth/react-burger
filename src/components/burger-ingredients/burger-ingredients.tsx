import { useMemo, useState } from 'react';

import { Ingredient } from '@components/burger-ingredient/burger-ingredient.tsx';
import { BurgerIngredientsTabs } from '@components/burger-ingredients-tabs/burger-ingredients-tabs.tsx';
import { IngredientDetails } from '@components/ingredient-details/ingredient-details.tsx';
import { Modal } from '@components/modal/modal.tsx';

import type { TIngredient } from '@utils/types';

import styles from './burger-ingredients.module.css';

type TBurgerIngredientsProps = {
  ingredients: TIngredient[];
};

export const BurgerIngredients = ({
  ingredients,
}: TBurgerIngredientsProps): React.JSX.Element => {
  const [selectedTab, setSelectedTab] = useState('bun');
  const [openedIngredient, setSelectedIngredient] = useState<TIngredient | null>(null);

  const buns = useMemo(() => {
    return ingredients.filter((ingredient) => ingredient.type === 'bun');
  }, [ingredients]);
  const mains = useMemo(() => {
    return ingredients.filter((ingredient) => ingredient.type === 'main');
  }, [ingredients]);
  const sauces = useMemo(() => {
    return ingredients.filter((ingredient) => ingredient.type === 'sauce');
  }, [ingredients]);

  return (
    <>
      <section className={`${styles.burgerIngredients} mb-10`}>
        <BurgerIngredientsTabs selectedTab={selectedTab} onTabClick={setSelectedTab} />
        <div className={`${styles.sections} custom-scroll`}>
          <Section
            title="Булки"
            ingredients={buns}
            onIngredientClick={setSelectedIngredient}
          />
          <Section
            title="Начинки"
            ingredients={mains}
            onIngredientClick={setSelectedIngredient}
          />
          <Section
            title="Соусы"
            ingredients={sauces}
            onIngredientClick={setSelectedIngredient}
          />
        </div>
      </section>
      {openedIngredient && (
        <Modal title="Детали ингредиента" onClose={() => setSelectedIngredient(null)}>
          <IngredientDetails ingredient={openedIngredient} />
        </Modal>
      )}
    </>
  );
};

type TSectionProps = {
  title: string;
  ingredients: TIngredient[];
  onIngredientClick: (ingredient: TIngredient) => void;
};

const Section = ({
  title,
  ingredients,
  onIngredientClick,
}: TSectionProps): React.JSX.Element => {
  return (
    <section className="mt-10">
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

const getMockCount = (ingredient: TIngredient): number | undefined => {
  return ingredient.price < 1000 ? 1 : undefined;
};
