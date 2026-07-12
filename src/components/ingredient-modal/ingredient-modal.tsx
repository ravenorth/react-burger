import { useNavigate, useParams } from 'react-router-dom';

import { IngredientDetails } from '@components/ingredient-details/ingredient-details';
import { Modal } from '@components/modal/modal';
import { useGetIngredientsQuery } from '@services/ingredients/ingredientsApi';

export const IngredientModal = (): React.JSX.Element | null => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data: ingredients = [] } = useGetIngredientsQuery();
  const ingredient = ingredients.find((item) => item._id === id);

  if (!ingredient) {
    return null;
  }

  return (
    <Modal
      title="Детали ингредиента"
      onClose={() => {
        void navigate('/');
      }}
    >
      <IngredientDetails ingredient={ingredient} />
    </Modal>
  );
};
