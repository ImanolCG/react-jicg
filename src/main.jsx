//? UI imports
import 'primereact/resources/themes/soho-dark/theme.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';
import './styles/index.css';
import './styles/colors.css';
import './styles/store.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { router } from './router/router';
import { StoreApp } from './pages/store/StoreApp';



// Bootstrap CSS
import "bootstrap/dist/css/bootstrap.min.css";
// Bootstrap Bundle JS
import "bootstrap/dist/js/bootstrap.bundle.min";
import { AuthProvider } from './auth/AuthProvider';



// Create a client
const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
      <ReactQueryDevtools />
    </QueryClientProvider>
  </React.StrictMode>,
)
