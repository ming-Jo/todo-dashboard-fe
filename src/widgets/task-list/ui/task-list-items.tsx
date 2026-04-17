import { generatePath, Link } from 'react-router-dom';
import type { RefObject } from 'react';

import type { TaskSummary } from '@/entities/task';

import { ROUTE } from '@/shared';

interface TaskListItemsProps {
  virtualItems: TaskSummary[];
  startIndex: number;
  itemHeight: number;
  totalHeight: number;
  loadMoreRef: RefObject<HTMLDivElement>;
}

export const TaskListItems = ({
  virtualItems,
  startIndex,
  itemHeight,
  totalHeight,
  loadMoreRef,
}: TaskListItemsProps) => (
  <>
    {virtualItems.map((item, index) => {
      const offsetTop = (startIndex + index) * itemHeight;

      return (
        <Link
          key={item.id}
          to={generatePath(ROUTE.TASK_DETAIL, { id: item.id })}
          className='hover:bg-layer absolute right-0 left-0 block border-b px-4 py-3 transition'
          style={{ top: offsetTop, height: itemHeight }}
        >
          <article className='space-y-2'>
            <p className='text-content-primary text-base font-semibold'>{item.title}</p>
            <p className='text-content-secondary line-clamp-2 text-sm'>{item.memo}</p>
          </article>
        </Link>
      );
    })}

    <div
      ref={loadMoreRef}
      style={{
        position: 'absolute',
        top: Math.max(totalHeight - 1, 0),
        left: 0,
        right: 0,
        height: 1,
      }}
    />
  </>
);
