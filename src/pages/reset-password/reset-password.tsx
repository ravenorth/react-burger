import {
  Button,
  Input,
  PasswordInput,
} from '@krgaa/react-developer-burger-ui-components';
import { useState } from 'react';
import { Link } from 'react-router-dom';

import styles from './reset-password.module.css';

export const ResetPassword = (): React.JSX.Element => {
  const [password, setPassword] = useState('');
  const [code, setCode] = useState('');

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={(e) => e.preventDefault()}>
        <h1 className="text text_type_main-medium">Восстановление пароля</h1>
        <PasswordInput
          value={password}
          placeholder="Введите новый пароль"
          onChange={(e) => setPassword(e.target.value)}
        />
        <Input
          value={code}
          placeholder="Введите код из письма"
          onChange={(e) => setCode(e.target.value)}
        />
        <Button htmlType="submit" type="primary" size="medium">
          Сохранить
        </Button>
      </form>
      <p className="text text_type_main-default text_color_inactive mt-20">
        Вспомнили пароль?{' '}
        <Link to="/login" className={styles.link}>
          Войти
        </Link>
      </p>
    </div>
  );
};
