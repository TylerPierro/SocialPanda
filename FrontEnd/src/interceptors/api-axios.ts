import axios from 'axios';
export const demoApiAxios = axios.create();
demoApiAxios.interceptors.request.use((config) => {
  config.headers.Authorization = localStorage.getItem('token');
  return config;
});