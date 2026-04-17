import { useMemo, useRef } from 'react';

import { useTaskListInfiniteQuery } from '@/entities/task';

import { useInfiniteScrollTrigger, useVirtualTaskList } from '../hooks';
import { getTaskListStatusMessage } from '../lib';
import { ITEM_HEIGHT, LIST_VIEWPORT_HEIGHT, OVER_SCAN } from '../model';

import { TaskListEmptyState } from './task-list-empty-state';
import { TaskListItems } from './task-list-items';

export const TaskList = () => {
  const { data, hasNextPage, isFetching, isFetchingNextPage, fetchNextPage } =
    useTaskListInfiniteQuery();

  const viewportRef = useRef<HTMLDivElement>(null);
  const items = useMemo(() => data?.pages.flatMap((page) => page.items) ?? [], [data]);

  const { totalHeight, startIndex, virtualItems, onScroll } = useVirtualTaskList({
    items,
    itemHeight: ITEM_HEIGHT,
    viewportHeight: LIST_VIEWPORT_HEIGHT,
    overScan: OVER_SCAN,
  });

  const { loadMoreRef } = useInfiniteScrollTrigger({
    viewportRef,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  });

  const statusMessage = getTaskListStatusMessage({
    isFetchingNextPage,
    hasNextPage,
    itemCount: items.length,
  });

  const isRefreshing = isFetching && !isFetchingNextPage;
  const isEmpty = !isFetching && items.length === 0;

  return (
    <section className='space-y-4'>
      <h1 className='text-content-primary text-xl font-semibold'>할 일 목록</h1>

      {isEmpty && <TaskListEmptyState />}

      {!isEmpty && (
        <div
          ref={viewportRef}
          className='bg-layer-elevated rounded-xl border'
          style={{ height: LIST_VIEWPORT_HEIGHT, overflow: 'auto' }}
          onScroll={onScroll}
        >
          <div style={{ height: totalHeight, position: 'relative' }}>
            <TaskListItems
              virtualItems={virtualItems}
              startIndex={startIndex}
              itemHeight={ITEM_HEIGHT}
              totalHeight={totalHeight}
              loadMoreRef={loadMoreRef}
            />
          </div>
        </div>
      )}

      <p className='text-content-secondary text-sm'>{statusMessage}</p>

      {isRefreshing && <p className='text-content-secondary text-xs'>목록을 새로고침 중입니다.</p>}
    </section>
  );
};
