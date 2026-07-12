import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import { App } from '@components/app/app';
import { IngredientModal } from '@components/ingredient-modal/ingredient-modal';
import { Home } from '@pages/home/home.tsx';
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
