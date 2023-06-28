import { createRoot } from 'react-dom/client';
import { StrictMode, lazy } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { RouterProvider } from '@tanstack/router';
import { router } from './routes';
import './style.css';

const container = document.getElementById('root');
const root = createRoot(container);
const queryClient = new QueryClient();

root.render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <RouterProvider router={router} />
    </QueryClientProvider>
  </StrictMode>,
);
