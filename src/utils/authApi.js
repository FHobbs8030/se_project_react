import { api } from './http.js';

export const login = ({ email, password }) =>
  api.post('/signin', { email, password });

export const register = ({ name, email, password, avatar }) =>
  api.post('/signup', { name, email, password, avatar });

export const logout = () => api.post('/signout');

export const getUser = () => api.get('/users/me');
