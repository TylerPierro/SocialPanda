import axios from 'axios';
export const ApiAxios = axios.create();
ApiAxios.interceptors.request.use((config) => {
  config.headers.Authorization = localStorage.getItem('token');
  return config;
});