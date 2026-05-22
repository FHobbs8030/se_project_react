import { request } from './http.js';

export const register = data =>
  request('/signup', {
    method: 'POST',
    body: data,
  });

export const login = data =>
  request('/signin', {
    method: 'POST',
    body: data,
  });

export const getUser = () => request('/users/me');

export const logout = () =>
  request('/signout', {
    method: 'POST',
  });
