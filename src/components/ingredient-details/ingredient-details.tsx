import type { TIngredient } from '@utils/types.ts';

import styles from './ingredient-details.module.css';

type TIngredientDetailsProps = {
  ingredient: TIngredient;
};

export function IngredientDetails({
  ingredient,
}: TIngredientDetailsProps): React.JSX.Element {
  return (
    <div className={`${styles.content} pb-15`}>
      <img
        className={styles.image}
        src={ingredient.image_large}
        alt={ingredient.name}
        data-testid={`ingredient-image-${ingredient._id}`}
      />
      <span
        className="text text_type_main-medium mt-4 mb-8"
        data-testid={`ingredient-name-${ingredient._id}`}
      >
        {ingredient.name}
      </span>
      <div className={styles.facts} data-testid="ingredient-facts">
        <Fact name="Калории,ккал" value={ingredient.calories} testId="fact-calories" />
        <Fact name="Белки, г" value={ingredient.proteins} testId="fact-proteins" />
        <Fact name="Жиры, г" value={ingredient.fat} testId="fact-fat" />
        <Fact
          name="Углеводы, г"
          value={ingredient.carbohydrates}
          testId="fact-carbohydrates"
        />
      </div>
    </div>
  );
}

type TFactProps = {
  name: string;
  value: number;
  testId?: string;
};

const Fact = ({ name, value, testId }: TFactProps): React.JSX.Element => {
  return (
    <div className={styles.fact} data-testid={testId}>
      <span className="text text_type_main-default text_color_inactive">{name}</span>
      <span className="text text_type_digits-default text_color_inactive">{value}</span>
    </div>
  );
};
