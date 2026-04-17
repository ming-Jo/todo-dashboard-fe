import { requestWithAuthRetry } from '@/entities/auth';

import { api, type DeleteTaskResponse, type TaskDetailResponse, type TaskListResponse } from '@/shared';

const fetchTaskListWithToken = (accessToken: string, page: number): Promise<TaskListResponse> =>
  api.get<TaskListResponse>(`/api/task?page=${page}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

const fetchTaskDetailWithToken = (accessToken: string, id: string): Promise<TaskDetailResponse> =>
  api.get<TaskDetailResponse>(`/api/task/${id}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

const deleteTaskWithToken = (accessToken: string, id: string): Promise<DeleteTaskResponse> =>
  api.delete<DeleteTaskResponse>(`/api/task/${id}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

export const fetchTaskList = (page: number): Promise<TaskListResponse> =>
  requestWithAuthRetry((accessToken) => fetchTaskListWithToken(accessToken, page));

export const fetchTaskDetail = (id: string): Promise<TaskDetailResponse> =>
  requestWithAuthRetry((accessToken) => fetchTaskDetailWithToken(accessToken, id));

export const deleteTask = (id: string): Promise<DeleteTaskResponse> =>
  requestWithAuthRetry((accessToken) => deleteTaskWithToken(accessToken, id));
