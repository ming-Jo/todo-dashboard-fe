import type { TaskDetail, TaskListPage } from './types';
import type { TaskDetailResponse, TaskListResponse } from '@/shared';

export const mapTaskListPage = (response: TaskListResponse, page: number): TaskListPage => ({
  page,
  hasNext: response.hasNext,
  items: response.data,
});

export const mapTaskDetail = (
  id: string,
  response: TaskDetailResponse,
  status: TaskDetail['status'],
): TaskDetail => ({
  id,
  title: response.title,
  memo: response.memo,
  status,
  registerDatetime: response.registerDatetime,
});
