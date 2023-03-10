import { lazy } from 'solid-js';
import type { RouteDefinition } from '@solidjs/router';

import Home from './pages/home/home';

export const routes: RouteDefinition[] = [
  {
    path: '/',
    component: Home,
  },
  // {
  //   path: '/item/:id',
  //   component: lazy(() => import('./pages/item/item'))
  // },
  {
    path: '**',
    component: lazy(() => import('./errors/404')),
  },
];
