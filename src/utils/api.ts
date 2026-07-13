import { fetchWithRefresh, getAccessToken } from './token.ts';

export const baseQueryWithRefresh = async (args: {
  url: string;
  method?: string;
  [key: string]: unknown;
}): Promise<{ data: unknown } | { error: unknown }> => {
  const { url, method = 'GET', ...rest } = args;
  const token = getAccessToken();

  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  };

  if (token) {
    headers.authorization = token;
  }

  const options = {
    method,
    headers,
    ...rest,
  };

  const data = await fetchWithRefresh(url, options);
  return { data };
};
