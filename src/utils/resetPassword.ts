const RESET_PASSWORD_VISITED_KEY = 'resetPasswordVisited';

export const setResetPasswordVisited = (): void => {
  localStorage.setItem(RESET_PASSWORD_VISITED_KEY, 'true');
};

export const getResetPasswordVisited = (): boolean => {
  return !!localStorage.getItem(RESET_PASSWORD_VISITED_KEY);
};

export const clearResetPasswordVisited = (): void => {
  localStorage.removeItem(RESET_PASSWORD_VISITED_KEY);
};
