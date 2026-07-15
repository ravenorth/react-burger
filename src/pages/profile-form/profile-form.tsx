import {
  Button,
  EmailInput,
  Input,
  PasswordInput,
} from '@krgaa/react-developer-burger-ui-components';
import { useCallback, useState } from 'react';

import { useAppSelector } from '@services/hooks.ts';
import { useUpdateUserMutation } from '@services/user/userApi.ts';
import { getUser } from '@services/user/userSlice.ts';

import styles from './profile-form.module.css';

export const ProfileForm = (): React.JSX.Element | null => {
  const user = useAppSelector(getUser);
  const [updateUser, { isLoading }] = useUpdateUserMutation();

  const [name, setName] = useState(user?.name ?? '');
  const [email, setEmail] = useState(user?.email ?? '');
  const [password, setPassword] = useState('');

  const isEdited = name !== user?.name || email !== user?.email || !!password;

  const handleCancel = useCallback(() => {
    if (!user) return;
    setName(user.name);
    setEmail(user.email);
    setPassword('');
  }, [user]);

  const handleSave = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      updateUser({ name, email, password })
        .unwrap()
        .then(() => setPassword(''))
        .catch(console.error);
    },
    [name, email, password, updateUser, user]
  );

  return (
    <form className={styles.form} onSubmit={handleSave}>
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
