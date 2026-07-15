import { fetchWithRefresh, getAccessToken } from './token.ts';

export const baseQueryWithRefresh = async (args: {
  url: string;
  method?: string;
  body?: unknown;
  [key: string]: unknown;
}): Promise<{ data: unknown } | { error: unknown }> => {
  const { url, method = 'GET', body, ...rest } = args;
  const token = getAccessToken();

  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  };

  if (token) {
    headers.authorization = token;
  }

  const options: RequestInit & Record<string, unknown> = {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
    ...rest,
  };

  const data = await fetchWithRefresh(url, options);
  return { data };
};
