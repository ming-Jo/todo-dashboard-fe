import { useMemo, useState } from 'react';
import type { UIEventHandler } from 'react';

interface UseVirtualTaskListParams<T> {
  items: T[];
  itemHeight: number;
  viewportHeight: number;
  overScan: number;
}

export const useVirtualTaskList = <T>({
  items,
  itemHeight,
  viewportHeight,
  overScan,
}: UseVirtualTaskListParams<T>) => {
  const [scrollTop, setScrollTop] = useState(0);

  const totalHeight = items.length * itemHeight;
  const visibleCount = Math.ceil(viewportHeight / itemHeight);

  const startIndex = Math.max(0, Math.floor(scrollTop / itemHeight) - overScan);
  const endIndex = Math.min(items.length, startIndex + visibleCount + overScan * 2);

  const virtualItems = useMemo(() => items.slice(startIndex, endIndex), [endIndex, items, startIndex]);

  const onScroll: UIEventHandler<HTMLDivElement> = (event) => {
    setScrollTop(event.currentTarget.scrollTop);
  };

  return {
    totalHeight,
    startIndex,
    virtualItems,
    onScroll,
  };
};
