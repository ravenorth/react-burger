import { apiUrls } from './apiUrls.ts';

class ServerError extends Error {
  statusCode: number;

  constructor(message: string, statusCode: number) {
    super(message);
    this.name = 'ServerError';
    this.statusCode = statusCode;
  }
}

async function checkResponse<T>(response: Response): Promise<T> {
  if (response.ok) {
    return (await response.json()) as T;
  }

  const error = (await response.json()) as { message?: string };
  throw new ServerError(error.message ?? 'Unknown error', response.status);
}

export async function request<T>(url: string, options?: RequestInit): Promise<T> {
  const response = await fetch(apiUrls.baseUrl + url, {
    headers: {
      'Content-Type': 'application/json',
    },
    ...options,
  });

  return checkResponse<T>(response);
}

export { ServerError };
