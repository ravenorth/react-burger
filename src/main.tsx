import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import { App } from '@components/app/app';
import { FeedOrderModal } from '@components/feed-order-modal/feed-order-modal';
import { IngredientModal } from '@components/ingredient-modal/ingredient-modal';
import { ProfileOrderModal } from '@components/profile-order-modal/profile-order-modal';
import { ProtectedRoute } from '@components/protected-route/protected-route';
import { Feed } from '@pages/feed/feed.tsx';
import { ForgotPassword } from '@pages/forgot-password/forgot-password.tsx';
import { Home } from '@pages/home/home.tsx';
import { Login } from '@pages/login/login.tsx';
import { NotFound } from '@pages/not-found/not-found.tsx';
import { ProfileForm } from '@pages/profile-form/profile-form.tsx';
import { ProfileOrders } from '@pages/profile-orders/profile-orders.tsx';
import { Profile } from '@pages/profile/profile.tsx';
import { Register } from '@pages/register/register.tsx';
import { ResetPassword } from '@pages/reset-password/reset-password.tsx';
import store from '@services/store';

import './index.css';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        element: <Home />,
        children: [
          {
            index: true,
            element: <></>,
          },
          {
            path: 'ingredients/:id',
            element: <IngredientModal />,
          },
        ],
      },
      {
        path: 'login',
        element: (
          <ProtectedRoute onlyUnAuth>
            <Login />
          </ProtectedRoute>
        ),
      },
      {
        path: 'register',
        element: (
          <ProtectedRoute onlyUnAuth>
            <Register />
          </ProtectedRoute>
        ),
      },
      {
        path: 'forgot-password',
        element: (
          <ProtectedRoute onlyUnAuth>
            <ForgotPassword />
          </ProtectedRoute>
        ),
      },
      {
        path: 'reset-password',
        element: (
          <ProtectedRoute onlyUnAuth>
            <ResetPassword />
          </ProtectedRoute>
        ),
      },
      {
        path: 'feed',
        element: <Feed />,
        children: [
          {
            path: ':id',
            element: <FeedOrderModal />,
          },
        ],
      },
      {
        path: 'profile',
        element: (
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        ),
        children: [
          {
            index: true,
            element: <ProfileForm />,
          },
          {
            path: 'orders',
            element: <ProfileOrders />,
            children: [
              {
                path: ':id',
                element: <ProfileOrderModal />,
              },
            ],
          },
        ],
      },
      {
        path: '*',
        element: <NotFound />,
      },
    ],
  },
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>
);
