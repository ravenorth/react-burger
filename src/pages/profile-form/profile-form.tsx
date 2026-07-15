import {
  Button,
  EmailInput,
  Input,
  PasswordInput,
} from '@krgaa/react-developer-burger-ui-components';
import { useCallback } from 'react';

import { useForm } from '@hooks/useForm.ts';
import { useAppSelector } from '@services/hooks.ts';
import { useUpdateUserMutation } from '@services/user/userApi.ts';
import { getUser } from '@services/user/userSlice.ts';

import styles from './profile-form.module.css';

export const ProfileForm = (): React.JSX.Element | null => {
  const user = useAppSelector(getUser);
  const { values, handleChange, setValues } = useForm({
    name: user?.name ?? '',
    email: user?.email ?? '',
    password: '',
  });
  const [updateUser, { isLoading }] = useUpdateUserMutation();

  const isEdited =
    values.name !== user?.name || values.email !== user?.email || !!values.password;

  const handleCancel = useCallback(() => {
    if (!user) return;
    setValues({ name: user.name, email: user.email, password: '' });
  }, [user, setValues]);

  const handleSave = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      if (!user) return;
      updateUser(values)
        .unwrap()
        .then(() => setValues((prev) => ({ ...prev, password: '' })))
        .catch(console.error);
    },
    [values, updateUser, setValues, user]
  );

  return (
    <form className={styles.form} onSubmit={handleSave}>
      <Input
        value={values.name}
        name="name"
        placeholder="Имя"
        icon="EditIcon"
        onChange={handleChange}
      />
      <EmailInput
        value={values.email}
        name="email"
        placeholder="Логин"
        onChange={handleChange}
      />
      <PasswordInput
        value={values.password}
        name="password"
        placeholder="Пароль"
        onChange={handleChange}
      />
      {isEdited && (
        <div className={styles.buttons}>
          <Button
            htmlType="button"
            type="secondary"
            size="medium"
            disabled={isLoading}
            onClick={handleCancel}
          >
            Отмена
          </Button>
          <Button htmlType="submit" type="primary" size="medium" disabled={isLoading}>
            Сохранить
          </Button>
        </div>
      )}
    </form>
  );
};
