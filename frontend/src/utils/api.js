import axios from 'axios';

const api = axios.create({
  baseURL: 'http://192.168.0.114:8080',
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

export default api;
