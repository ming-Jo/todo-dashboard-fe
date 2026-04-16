import { authHandlers } from './auth.handlers';
import { dashboardHandlers } from './dashboard.handlers';
import { taskHandlers } from './task.handlers';
import { userHandlers } from './user.handlers';

export const handlers = [...authHandlers, ...userHandlers, ...dashboardHandlers, ...taskHandlers];
