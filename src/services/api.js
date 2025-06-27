import axios from 'axios';

const API = axios.create({
  baseURL: 'https://travel-journal-api-bootcamp.do.dibimbing.id',
  headers: {
    apiKey: '24405e01-fbc1-45a5-9f5a-be13afcd757c',
    'Content-Type': 'application/json',
  },
});

API.interceptors.request.use((config) => {
  // Tambahkan API Key WAJIB
  config.headers.apiKey = '24405e01-fbc1-45a5-9f5a-be13afcd757c';

  // Tambahkan Content-Type
  config.headers['Content-Type'] = 'application/json';

  // Tambahkan Authorization jika ada token
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
}, (error) => {
  return Promise.reject(error);
});

export default API;
