import http from '../http';

export const login = (options: ILogin) =>
  http.post('/auth/signin', undefined, options);

export const refreshToken = (authToken: string) =>
  http.put('/auth/tokens', { authToken }, null);
