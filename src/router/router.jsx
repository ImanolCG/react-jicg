import { createBrowserRouter } from 'react-router-dom';

import { LoginIndex } from '../pages/auth/LoginIndex';
import { RegisterIndex } from '../pages/auth/RegisterIndex';
import { StoreApp } from '../pages/store/StoreApp';
import { ProtectedRoute } from './ProtectedRoute';

export const router = createBrowserRouter ([
    {
      path: '/',
      element: <LoginIndex />
    },
    {
      path: '/register',
      element: <RegisterIndex />
    },
    {
      path: '/',
      element: <ProtectedRoute />,
      children:[
        {
            path: '/store',
            element: <StoreApp />
        }
      ],
    },
  ]);