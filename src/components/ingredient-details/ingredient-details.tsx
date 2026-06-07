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
      <img className={styles.image} src={ingredient.image} alt={ingredient.name} />
      <span className="text text_type_main-medium mt-4 mb-8">{ingredient.name}</span>
      <div className={styles.facts}>
        <Fact name="Калории,ккал" value={ingredient.calories} />
        <Fact name="Белки, г" value={ingredient.proteins} />
        <Fact name="Жиры, г" value={ingredient.fat} />
        <Fact name="Углеводы, г" value={ingredient.carbohydrates} />
      </div>
    </div>
  );
}

type TFactProps = {
  name: string;
  value: number;
};

const Fact = ({ name, value }: TFactProps): React.JSX.Element => {
  return (
    <div className={styles.fact}>
      <span className="text text_type_main-default text_color_inactive">{name}</span>
      <span className="text text_type_digits-default text_color_inactive">{value}</span>
    </div>
  );
};
