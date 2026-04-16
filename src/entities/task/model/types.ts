import type { TaskItem } from '@/shared';

export type { TaskStatus } from '@/shared';
export type TaskSummary = TaskItem;

export interface TaskDetail extends TaskItem {
  registerDatetime: string;
}

export interface TaskListPage {
  items: TaskSummary[];
  hasNext: boolean;
  page: number;
}

export type TaskListStatus = 'idle' | 'loading' | 'loaded' | 'error';

export type TaskListState =
  | {
      status: 'idle' | 'loading';
      pages: TaskListPage[];
    }
  | {
      status: 'loaded';
      pages: TaskListPage[];
    }
  | {
      status: 'error';
      pages: TaskListPage[];
      message: string;
    };

export type TaskDetailStatus = 'idle' | 'loading' | 'loaded' | 'not-found' | 'error';

export type TaskDetailState =
  | {
      status: 'idle' | 'loading';
      item: null;
    }
  | {
      status: 'loaded';
      item: TaskDetail;
    }
  | {
      status: 'not-found';
      item: null;
    }
  | {
      status: 'error';
      item: null;
      message: string;
    };
