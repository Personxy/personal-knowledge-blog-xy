import api from './api';

export const login = (data) => {
  return api.post('/auth/login', data);
};

export const getUserInfo = () => {
  return api.get('/auth/info');
};
