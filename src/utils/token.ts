import { apiUrls } from './apiUrls.ts';
import { request, ServerError } from './request.ts';

const ACCESS_TOKEN_KEY = 'accessToken';
const REFRESH_TOKEN_KEY = 'refreshToken';

export const getAccessToken = (): string | null =>
  localStorage.getItem(ACCESS_TOKEN_KEY);

export const getRefreshToken = (): string | null =>
  localStorage.getItem(REFRESH_TOKEN_KEY);

export const setTokens = (accessToken: string, refreshToken: string): void => {
  localStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
  localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);
};

export const clearTokens = (): void => {
  localStorage.removeItem(ACCESS_TOKEN_KEY);
  localStorage.removeItem(REFRESH_TOKEN_KEY);
};

type TTokens = {
  accessToken: string;
  refreshToken: string;
};

type TRefreshResponse = {
  success: boolean;
  accessToken: string;
  refreshToken: string;
};

export const refreshToken = async (): Promise<TTokens> => {
  const token = getRefreshToken();
  if (!token) {
    throw new Error('No refresh token available');
  }

  const data = await request<TRefreshResponse>(apiUrls.refreshToken, {
    method: 'POST',
    body: JSON.stringify({ token }),
  });

  if (!data.success) {
    clearTokens();
    throw new Error('Failed to refresh token');
  }

  setTokens(data.accessToken, data.refreshToken);
  return { accessToken: data.accessToken, refreshToken: data.refreshToken };
};

export async function fetchWithRefresh<T>(
  url: string,
  options: RequestInit
): Promise<T> {
  try {
    return await request(url, options);
  } catch (error) {
    if (
      error instanceof ServerError &&
      (error.statusCode === 401 || (error.statusCode === 403 && getRefreshToken()))
    ) {
      const refreshData = await refreshToken();

      return request(url, {
        ...options,
        headers: {
          ...options.headers,
          authorization: refreshData.accessToken,
        },
      });
    } else {
      throw error;
    }
  }
}
