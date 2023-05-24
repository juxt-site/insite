import { createRoot } from 'react-dom/client';
import { StrictMode } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Outlet, ReactLocation, Router } from '@tanstack/react-location';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { App } from './App';
import './style.css';

const container = document.getElementById('root');
const root = createRoot(container);
const queryClient = new QueryClient();
const location = new ReactLocation();

root.render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <Router location={location} routes={[{ path: '/', element: <App /> }]}>
        <Outlet />
      </Router>
    </QueryClientProvider>
  </StrictMode>,
);
