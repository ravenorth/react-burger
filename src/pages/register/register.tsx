import {
  Button,
  EmailInput,
  Input,
  PasswordInput,
} from '@krgaa/react-developer-burger-ui-components';
import { useCallback } from 'react';
import { Link } from 'react-router-dom';

import { useForm } from '@hooks/useForm.ts';
import { useRegisterMutation } from '@services/user/userApi.ts';

import styles from './register.module.css';

export const Register = (): React.JSX.Element => {
  const { values, handleChange } = useForm({ name: '', email: '', password: '' });
  const [register, { isLoading }] = useRegisterMutation();

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      register(values).unwrap().catch(console.error);
    },
    [values, register]
  );

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <h1 className="text text_type_main-medium">Регистрация</h1>
        <Input
          value={values.name}
          name="name"
          placeholder="Имя"
          onChange={handleChange}
        />
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
          Зарегистрироваться
        </Button>
      </form>
      <p className="text text_type_main-default text_color_inactive mt-20">
        Уже зарегистрированы?{' '}
        <Link to="/login" className={styles.link}>
          Войти
        </Link>
      </p>
    </div>
  );
};
