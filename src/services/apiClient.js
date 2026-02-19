import axios from 'axios';
import { store } from '../app/store';
// import { logout } from '../features/auth/authSlice';

const baseURL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

export const USE_MOCK_API = import.meta.env.VITE_USE_MOCK_API === 'true';

const apiClient = axios.create({
  baseURL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.request.use(
  (config) => {
    const state = store.getState();
    const token = state.auth?.token;

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// apiClient.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     if (error.response?.status === 401) {
//       store.dispatch(logout());
//     }

//     return Promise.reject(error);
//   }
// );



export default apiClient;
