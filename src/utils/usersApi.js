import { request } from './http.js';

export const getUser = () => {
  return request('/users/me');
};

export const updateProfile = ({ name, avatar }) => {
  return request('/users/me', {
    method: 'PATCH',
    body: { name, avatar },
  });
};
