import { Navigate, Outlet, RootRoute, Route, Router } from '@tanstack/router';
import { lazy } from 'react';
import { z } from 'zod';
import { Nav } from './components/nav';
import { useUserId } from './utils';
import { App } from './App';

const rootSearchSchema = z.object({
  code: z.string().optional(),
  state: z.string().optional(),
  siteUrl: z.string().optional(),
  modal: z.discriminatedUnion('type', [z.object({ type: z.literal('settings') })]).optional(),
});

// eslint-disable-next-line @typescript-eslint/no-unused-vars
type RootSearch = z.infer<typeof rootSearchSchema>;

function withAuthenticationRequired(Root: () => JSX.Element) {
  return Root;
}

const TanStackRouterDevtools =
  import.meta.env.NODE_ENV === 'production'
    ? () => null // Render nothing in production
    : lazy(() =>
        // Lazy load in development
        import('@tanstack/router-devtools').then((res) => ({
          default: res.TanStackRouterDevtools,
          // For Embedded Mode
          // default: res.TanStackRouterDevtoolsPanel
        })),
      );

function Root() {
  return (
    <>
      <Nav />
      <Outlet />
      <TanStackRouterDevtools position="bottom-right" />
    </>
  );
}

const rootRoute = new RootRoute({
  component: withAuthenticationRequired(Root),
  validateSearch: rootSearchSchema,
});

function Index() {
  const id = useUserId();
  return <App />;
}

export const defaultPath = '/console';

const indexRoute = new Route({
  getParentRoute: () => rootRoute,
  path: '/',
  component: () => <Navigate to={defaultPath} />,
});

const consoleRoute = new Route({
  getParentRoute: () => rootRoute,
  path: defaultPath,
  component: Index,
});

const splatRoute = new Route({
  getParentRoute: () => rootRoute,
  path: '$',
  component: () => (
    <div className="text-white">
      <h3>404</h3>
    </div>
  ),
});

const routeTree = rootRoute.addChildren([consoleRoute, indexRoute, splatRoute]);

export const router = new Router({
  routeTree,
});

declare module '@tanstack/router' {
  interface Register {
    router: typeof router;
  }
}
