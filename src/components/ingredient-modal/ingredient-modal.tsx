import { useNavigate, useParams } from 'react-router-dom';

import { IngredientDetails } from '@components/ingredient-details/ingredient-details';
import { Modal } from '@components/modal/modal';
import { useGetIngredientsQuery } from '@services/ingredients/ingredientsApi';

import styles from './ingredient-modal.module.css';

export const IngredientModal = (): React.JSX.Element => {
  const navigate = useNavigate();

  return (
    <Modal
      title="Детали ингредиента"
      onClose={() => {
        void navigate('/');
      }}
    >
      <Content />
    </Modal>
  );
};

const Content = (): React.JSX.Element => {
  const { id } = useParams<{ id: string }>();
  const { data: ingredients = [] } = useGetIngredientsQuery();
  const ingredient = ingredients.find((item) => item._id === id);

  if (!ingredient) {
    return (
      <div className={styles.notFound}>
        <p className="text text_type_main-medium mt-6">Ингредиент не найден</p>
        <p className="text text_type_main-default text_color_inactive mt-4">
          Возможно, он был удалён
        </p>
      </div>
    );
  }

  return <IngredientDetails ingredient={ingredient} />;
};
