import api from './api';

export const login = async (credentials) => {
  const response = await api.post('/auth/login', credentials);

  if (response.data.token) {
    sessionStorage.setItem('token', response.data.token);
  }

  return response.data;
};

export const logout = () => {
  sessionStorage.removeItem('token');
};

export const isAuthenticated = () => {
  return Boolean(sessionStorage.getItem('token'));
};