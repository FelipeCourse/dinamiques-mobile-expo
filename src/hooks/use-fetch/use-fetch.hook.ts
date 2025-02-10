import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { router } from 'expo-router';
import { useCallback, useState } from 'react';

import { getItemStorage, isExpiredToken, removeItemsStorage } from '@/utils';

import { ApiResponseWithDataModel, UserStorageModel } from '@/models';

const api = axios.create({
  baseURL: process.env.EXPO_PUBLIC_DINAMIQUES_API,
  validateStatus: () => true,
});

api.interceptors.request.use(async (request) => {
  const sessionStorage = await getItemStorage(
    process.env.EXPO_PUBLIC_STORAGE_KEY!,
  );

  if (sessionStorage) {
    const token = (await JSON.parse(sessionStorage)) as UserStorageModel;
    const isExpiredSession = isExpiredToken(token.exp);

    if (isExpiredSession) {
      await removeItemsStorage([process.env.EXPO_PUBLIC_STORAGE_KEY!]);
      router.push('/sign-in');
    }
  }

  return request;
});

type ServiceRequest<T> = (
  config: AxiosRequestConfig,
) => Promise<ApiResponseWithDataModel<T>>;

export type UseFetchReturn<T> = {
  request: ServiceRequest<T>;
  message: string;
  data: T | null;
  error: string;
  isLoading: boolean;
};

export function useFetch<T>(): UseFetchReturn<T> {
  const [message, setMessage] = useState<string>('');
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const request = useCallback(async (config: AxiosRequestConfig) => {
    let response: AxiosResponse<ApiResponseWithDataModel<T>>;
    let responseMessage = '';
    let responseData: T | null = null;
    let responseError = '';

    try {
      setMessage('');
      setError('');
      setIsLoading(true);

      response = await api(config);
      responseMessage = response.data.message ?? '';
      responseData = response.data.data ?? null;
      responseError = response?.data.error ?? '';
      setError(responseError);
    } catch (requestError: unknown) {
      setError('Erro!');
      setMessage('Um erro inesperado ocorreu');

      throw new Error(`log: useFetch - ${requestError}`);
    } finally {
      setMessage(responseMessage);
      setData(responseData);
      setIsLoading(false);
    }

    return response?.data;
  }, []);

  return { request, message, data, error, isLoading };
}
