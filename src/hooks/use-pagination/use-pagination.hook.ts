/* eslint-disable react-hooks/exhaustive-deps */
import { AxiosRequestConfig } from 'axios';
import { useCallback, useEffect, useState } from 'react';

import { PAGE_LIMIT } from '@/constants';

import { useAuthContext } from '@/contexts';

import { useFetch } from '../use-fetch/use-fetch.hook';

interface GenericBaseProps {
  id: string;
}

type UsePaginationProps = {
  endpoint: string;
  limit: number;
};

type UsePaginationReturn<T> = {
  data: T[];
  isLoading: boolean;
  hasMore: boolean;
  loadMore: () => void;
  refreshData: () => Promise<void>;
};

export function usePagination<T extends GenericBaseProps>({
  endpoint,
  limit = PAGE_LIMIT,
}: UsePaginationProps): UsePaginationReturn<T> {
  const { userData } = useAuthContext();
  const { request, isLoading } = useFetch<T[]>();
  const [data, setData] = useState<T[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const loadMore = useCallback(async () => {
    if (isLoading || !hasMore) return;

    const config: AxiosRequestConfig = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userData?.accessToken}`,
      },
      url: endpoint,
      params: { page, limit },
    };

    const response = await request(config);

    if (response && response?.data?.length) {
      setData((prevData) => {
        const newData = response.data.filter(
          (newItem) =>
            !prevData.some((existingItem) => existingItem.id === newItem.id),
        );

        return [...prevData, ...newData];
      });

      if (response.data.length < limit) {
        setHasMore(false);
      }

      setPage((prevPage) => prevPage + 1);
    }
  }, [request, endpoint, page, limit, isLoading, hasMore]);

  const refreshData = useCallback(async () => {
    const config: AxiosRequestConfig = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userData?.accessToken}`,
      },
      url: endpoint,
      params: { page: 1, limit },
    };

    const response = await request(config);

    if (response?.data) {
      setData(response.data);
      setPage(2);
      setHasMore(response.data.length === limit);
    }
  }, [request, endpoint, limit, userData?.accessToken]);

  useEffect(() => {
    loadMore();
  }, []);

  return { data, isLoading, hasMore, loadMore, refreshData };
}
