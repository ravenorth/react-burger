import { Button } from '@krgaa/react-developer-burger-ui-components';
import { useNavigate } from 'react-router-dom';

import styles from './not-found.module.css';

export const NotFound = (): React.JSX.Element => {
  const navigate = useNavigate();

  return (
    <div className={styles.container}>
      <p className="text text_type_digits-large mb-4">404</p>
      <p className="text text_type_main-medium mb-5">Страница не найдена</p>
      <Button
        htmlType="button"
        type="primary"
        size="medium"
        onClick={() => {
          void navigate('/');
        }}
      >
        На главную
      </Button>
    </div>
  );
};
