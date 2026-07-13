import { clsx } from 'clsx';
import { useCallback } from 'react';
import { NavLink, Outlet } from 'react-router-dom';

import { useLogoutMutation } from '@services/user/userApi.ts';

import styles from './profile.module.css';

export const Profile = (): React.JSX.Element => {
  const [logout] = useLogoutMutation();

  const handleLogout = useCallback(() => {
    logout().catch(console.error);
  }, [logout]);

  return (
    <div className={styles.container}>
      <nav className={styles.nav}>
        <NavLink
          to="/profile"
          end
          className={({ isActive }) =>
            clsx(
              'text text_type_main-medium',
              styles.navLink,
              isActive && styles.navLinkActive
            )
          }
        >
          Профиль
        </NavLink>
        <NavLink
          to="/profile/orders"
          className={({ isActive }) =>
            clsx(
              'text text_type_main-medium',
              styles.navLink,
              isActive && styles.navLinkActive
            )
          }
        >
          История заказов
        </NavLink>
        <button
          type="button"
          className={clsx('text text_type_main-medium', styles.navLink)}
          onClick={handleLogout}
        >
          Выход
        </button>
        <p className="text text_type_main-default text_color_inactive mt-20">
          В этом разделе вы можете изменить свои персональные данные
        </p>
      </nav>
      <div className={styles.content}>
        <Outlet />
      </div>
    </div>
  );
};
