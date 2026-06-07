import { Tab } from '@krgaa/react-developer-burger-ui-components';

import styles from './burger-ingredients-tabs.module.css';

type TBurgerIngredientsTabsProps = {
  selectedTab: string;
  onTabClick: (value: string) => void;
};

export const BurgerIngredientsTabs = ({
  selectedTab,
  onTabClick,
}: TBurgerIngredientsTabsProps): React.JSX.Element => {
  return (
    <nav>
      <ul className={styles.menu}>
        <Tab value="bun" active={selectedTab === 'bun'} onClick={onTabClick}>
          Булки
        </Tab>
        <Tab value="main" active={selectedTab === 'main'} onClick={onTabClick}>
          Начинки
        </Tab>
        <Tab value="sauce" active={selectedTab === 'sauce'} onClick={onTabClick}>
          Соусы
        </Tab>
      </ul>
    </nav>
  );
};
