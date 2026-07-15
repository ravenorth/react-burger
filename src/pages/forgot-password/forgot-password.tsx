import { Button, EmailInput } from '@krgaa/react-developer-burger-ui-components';
import { useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { useForm } from '@hooks/useForm.ts';
import { useForgotPasswordMutation } from '@services/password/passwordApi.ts';
import { setResetPasswordVisited } from '@utils/resetPassword.ts';

import styles from './forgot-password.module.css';

export const ForgotPassword = (): React.JSX.Element => {
  const { values, handleChange } = useForm({ email: '' });
  const [forgotPassword, { isLoading }] = useForgotPasswordMutation();
  const navigate = useNavigate();

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      forgotPassword(values)
        .unwrap()
        .then(() => {
          setResetPasswordVisited();
          void navigate('/reset-password', { replace: true });
        })
        .catch(console.error);
    },
    [values, forgotPassword, navigate]
  );

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <h1 className="text text_type_main-medium">Восстановление пароля</h1>
        <EmailInput
          value={values.email}
          name="email"
          placeholder="Укажите e-mail"
          onChange={handleChange}
        />
        <Button htmlType="submit" type="primary" size="medium" disabled={isLoading}>
          Восстановить
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
