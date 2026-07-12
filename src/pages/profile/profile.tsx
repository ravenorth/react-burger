import {
  Button,
  EmailInput,
  Input,
  PasswordInput,
} from '@krgaa/react-developer-burger-ui-components';
import { clsx } from 'clsx';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import styles from './profile.module.css';

export const Profile = (): React.JSX.Element => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [showButtons, setShowButtons] = useState(false);

  useEffect(() => {
    setShowButtons(!!name || !!email || !!password);
  }, [name, email, password, setShowButtons]);

  return (
    <div className={styles.container}>
      <nav className={styles.nav}>
        <p
          className={clsx(
            'text text_type_main-medium',
            styles.navLink,
            styles.navLinkActive
          )}
        >
          Профиль
        </p>
        <Link
          to="/profile/orders"
          className={clsx('text text_type_main-medium', styles.navLink)}
        >
          История заказов
        </Link>
        <button
          type="button"
          className={clsx('text text_type_main-medium', styles.navLink)}
          onClick={() => console.log('logout')}
        >
          Выход
        </button>
        <p className="text text_type_main-default text_color_inactive mt-20">
          В этом разделе вы можете изменить свои персональные данные
        </p>
      </nav>
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
    </div>
  );
};
