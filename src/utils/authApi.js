// src/utils/authApi.js
import { api } from './http';

export const signIn  = (email, password) =>
  api('/signin',  { method: 'POST', body: JSON.stringify({ email, password }) });

export const signUp  = (payload) =>
  api('/signup',  { method: 'POST', body: JSON.stringify(payload) });

export const getMe   = () => api('/users/me');
