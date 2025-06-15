import axios from 'axios';

const API = axios.create({
  baseURL: 'https://travel-journal-api-bootcamp.do.dibimbing.id',
});

API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default API;