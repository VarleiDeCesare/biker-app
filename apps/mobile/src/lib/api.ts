import { env } from './env';
import { authClient } from './auth-client';

type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
const BASE_URL = `${env.EXPO_PUBLIC_BACK_END_BASE_URL}/api`;

const request = async <T>(method: HttpMethod, path: string, body?: unknown): Promise<T> => {
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  const { data, error } = await authClient.$fetch<T>(`${BASE_URL}${normalizedPath}`, {
    method,
    body: body ? JSON.stringify(body) : undefined,
    headers: { 'Content-Type': 'application/json' },
  });
  if (error) throw new Error(error.message);
  return data as T;
};

//FIXME:
export const getRiderStats = async (): Promise<{ kmTotal: number }> => {
  return request<{ kmTotal: number }>('GET', '/test');
};

//FIXME:
export const getTotalRides = async (): Promise<{ rides: number }> => {
  return request<{ rides: number }>('POST', '/test-post', {
    rides: 20,
  });
};
