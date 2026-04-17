import { useEffect, useRef } from 'react';
import type { RefObject } from 'react';

interface UseInfiniteScrollTriggerParams {
  viewportRef: RefObject<HTMLDivElement | null>;
  hasNextPage: boolean;
  isFetchingNextPage: boolean;
  fetchNextPage: () => Promise<unknown>;
}

export const useInfiniteScrollTrigger = ({
  viewportRef,
  hasNextPage,
  isFetchingNextPage,
  fetchNextPage,
}: UseInfiniteScrollTriggerParams) => {
  const loadMoreRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const viewport = viewportRef.current;
    const trigger = loadMoreRef.current;

    if (!viewport || !trigger) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (!entry?.isIntersecting || !hasNextPage || isFetchingNextPage) return;

        void fetchNextPage();
      },
      { root: viewport, threshold: 0.1 },
    );

    observer.observe(trigger);

    return () => observer.disconnect();
  }, [fetchNextPage, hasNextPage, isFetchingNextPage, viewportRef]);

  return { loadMoreRef };
};
