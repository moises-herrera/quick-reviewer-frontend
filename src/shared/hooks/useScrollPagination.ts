import { useMemo, useCallback, useEffect } from 'react';
import { isMobile } from '@/shared/utils/device-helper';

interface UsePaginationProps {
  isLoading: boolean;
  currentRecords: number;
  total: number;
  elementRef?: React.RefObject<HTMLDivElement>;
  isReverse?: boolean;
  fetchNextPage?: () => void;
}

export const useScrollPagination = ({
  isLoading,
  currentRecords,
  total,
  elementRef,
  isReverse,
  fetchNextPage,
}: UsePaginationProps) => {
  const element = elementRef ? elementRef.current : window;

  const isLastPage = useMemo(
    () => currentRecords === total,
    [currentRecords, total]
  );

  const handleScroll = useCallback(() => {
    const canScrollWindow =
      element &&
      element instanceof Window &&
      Math.abs(
        Math.round(element.innerHeight + document.documentElement.scrollTop) -
          document.documentElement.offsetHeight
      ) > 1;

    const canScrollElement =
      element && element instanceof HTMLElement
        ? !isReverse
          ? Math.round(element.offsetHeight + element.scrollTop) !==
            element.scrollHeight
          : element.scrollTop !== 0
        : false;

    if (canScrollWindow || canScrollElement || isLoading || isLastPage) {
      return;
    }

    if (isReverse && element instanceof HTMLDivElement) {
      const lastScrollHeight = element.scrollHeight;
      localStorage.setItem('scrollHeight', lastScrollHeight.toString());
    }

    fetchNextPage?.();
  }, [isLoading, isLastPage, element, isReverse]);

  useEffect(() => {
    if (element) {
      if (!isMobile()) {
        element.addEventListener('scroll', handleScroll);
      } else {
        element.addEventListener('touchmove', handleScroll);
      }
    }

    return () => {
      if (!isMobile()) {
        element?.removeEventListener('scroll', handleScroll);
      } else {
        element?.removeEventListener('touchmove', handleScroll);
      }
    };
  }, [isLoading, handleScroll, element]);
};
