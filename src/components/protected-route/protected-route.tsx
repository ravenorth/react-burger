import { Navigate, useLocation } from 'react-router-dom';

import { useAppSelector } from '@services/hooks.ts';
import { getIsAuthChecked, getUser } from '@services/user/userSlice.ts';

type TProtectedRouteProps = {
  onlyUnAuth?: boolean;
  children: React.JSX.Element | null;
};

type TLocationState = {
  from?: { pathname?: string };
};

export const ProtectedRoute = ({
  onlyUnAuth = false,
  children,
}: TProtectedRouteProps): React.JSX.Element | null => {
  const isAuthChecked = useAppSelector(getIsAuthChecked);
  const user = useAppSelector(getUser);
  const location = useLocation();

  if (!isAuthChecked) {
    return null;
  }

  if (!onlyUnAuth && !user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (onlyUnAuth && user) {
    const state = location.state as TLocationState | null;
    const from = state?.from?.pathname ?? '/';
    return <Navigate to={from} replace />;
  }

  return children;
};
