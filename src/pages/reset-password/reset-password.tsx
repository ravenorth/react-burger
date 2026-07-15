import {
  Button,
  Input,
  PasswordInput,
} from '@krgaa/react-developer-burger-ui-components';
import { useCallback } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';

import { useForm } from '@hooks/useForm.ts';
import { useResetPasswordMutation } from '@services/password/passwordApi.ts';
import {
  clearResetPasswordVisited,
  getResetPasswordVisited,
} from '@utils/resetPassword.ts';

import styles from './reset-password.module.css';

export const ResetPassword = (): React.JSX.Element => {
  const { values, handleChange } = useForm({ password: '', code: '' });
  const [resetPassword, { isLoading }] = useResetPasswordMutation();
  const navigate = useNavigate();

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      resetPassword({ password: values.password, token: values.code })
        .unwrap()
        .then(() => {
          clearResetPasswordVisited();
          void navigate('/login', { replace: true });
        })
        .catch(console.error);
    },
    [values, resetPassword, navigate]
  );

  if (!getResetPasswordVisited()) {
    return <Navigate to="/forgot-password" replace />;
  }

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <h1 className="text text_type_main-medium">Восстановление пароля</h1>
        <PasswordInput
          value={values.password}
          name="password"
          placeholder="Введите новый пароль"
          onChange={handleChange}
        />
        <Input
          value={values.code}
          name="code"
          placeholder="Введите код из письма"
          onChange={handleChange}
        />
        <Button htmlType="submit" type="primary" size="medium" disabled={isLoading}>
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
