import {
  Button,
  EmailInput,
  Input,
  PasswordInput,
} from '@krgaa/react-developer-burger-ui-components';
import { useEffect, useState } from 'react';

import styles from './profile-form.module.css';

export const ProfileForm = (): React.JSX.Element => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [showButtons, setShowButtons] = useState(false);

  useEffect(() => {
    setShowButtons(!!name || !!email || !!password);
  }, [name, email, password, setShowButtons]);

  return (
    <form className={styles.form} onSubmit={(e) => e.preventDefault()}>
      <Input
        value={name}
        placeholder="Имя"
        icon="EditIcon"
        onChange={(e) => setName(e.target.value)}
      />
      <EmailInput
        value={email}
        placeholder="Логин"
        onChange={(e) => setEmail(e.target.value)}
      />
      <PasswordInput
        value={password}
        placeholder="Пароль"
        onChange={(e) => setPassword(e.target.value)}
      />
      {showButtons && (
        <div className={styles.buttons}>
          <Button
            htmlType="button"
            type="secondary"
            size="medium"
            onClick={() => console.log('cancel')}
          >
            Отмена
          </Button>
          <Button
            htmlType="submit"
            type="primary"
            size="medium"
            onClick={() => console.log('save')}
          >
            Сохранить
          </Button>
        </div>
      )}
    </form>
  );
};
