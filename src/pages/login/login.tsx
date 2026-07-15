import {
  Button,
  EmailInput,
  PasswordInput,
} from '@krgaa/react-developer-burger-ui-components';
import { useCallback } from 'react';
import { Link } from 'react-router-dom';

import { useForm } from '@hooks/useForm.ts';
import { useLoginMutation } from '@services/user/userApi.ts';

import styles from './login.module.css';

export const Login = (): React.JSX.Element => {
  const { values, handleChange } = useForm({ email: '', password: '' });
  const [login, { isLoading }] = useLoginMutation();

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      login(values).unwrap().catch(console.error);
    },
    [values, login]
  );

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <h1 className="text text_type_main-medium">Вход</h1>
        <EmailInput
          value={values.email}
          name="email"
          placeholder="E-mail"
          onChange={handleChange}
        />
        <PasswordInput
          value={values.password}
          name="password"
          placeholder="Пароль"
          onChange={handleChange}
        />
        <Button htmlType="submit" type="primary" size="medium" disabled={isLoading}>
          Войти
        </Button>
      </form>
      <p className="text text_type_main-default text_color_inactive mt-20">
        Вы — новый пользователь?{' '}
        <Link to="/register" className={styles.link}>
          Зарегистрироваться
        </Link>
      </p>
      <p className="text text_type_main-default text_color_inactive mt-4">
        Забыли пароль?{' '}
        <Link to="/forgot-password" className={styles.link}>
          Восстановить пароль
        </Link>
      </p>
    </div>
  );
};
