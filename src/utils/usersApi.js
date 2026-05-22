import { api } from './http.js';

export const getUser = () => {
  return api.get('/users/me');
};

export const updateProfile = ({ name, avatar }) => {
  return api.patch('/users/me', { name, avatar });
};
