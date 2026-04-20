import { createBrowserRouter } from 'react-router-dom';

import { DashboardPage, SignInPage, TaskDetailPage, TaskListPage, UserPage } from '@/pages';

import { GnbLnbLayout } from '@/widgets/navigation';

import { ROUTE } from '@/shared';

import { ProtectedRoute } from './protected-route';

export const router = createBrowserRouter([
  {
    path: ROUTE.DASHBOARD,
    element: <GnbLnbLayout />,
    children: [
      {
        path: ROUTE.SIGN_IN,
        element: <SignInPage />,
      },
      {
        element: <ProtectedRoute />,
        children: [
          {
            index: true,
            element: <DashboardPage />,
          },
          {
            path: ROUTE.TASK_LIST,
            element: <TaskListPage />,
          },
          {
            path: ROUTE.TASK_DETAIL,
            element: <TaskDetailPage />,
          },
          {
            path: ROUTE.USER,
            element: <UserPage />,
          },
        ],
      },
    ],
  },
]);
