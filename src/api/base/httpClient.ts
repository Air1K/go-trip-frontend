import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';
import Cookies from 'js-cookie';

export const API_URL = import.meta.env.VITE_API_URL;

// Создание экземпляра axios
const $api = axios.create({
  withCredentials: true,
  baseURL: API_URL + '/api',
});

// Интерцептор запросов
$api.interceptors.request.use(
  (config) => {
    const token = Cookies.get('accessToken');
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error: AxiosError): Promise<never> => {
    return Promise.reject(error);
  }
);

// Интерцептор ответов
$api.interceptors.response.use(
  (response: AxiosResponse): AxiosResponse => response,
  async (error: AxiosError): Promise<never> => {
    const originalRequest = error.config as AxiosRequestConfig & { _isRetry?: boolean };

    // Обработка ошибок 401 (например, истёкший токен)
    if (error.response?.status === 401 && originalRequest && !originalRequest._isRetry) {
      originalRequest._isRetry = true;

      try {
        // Обновление токена
        await axios.get(`${API_URL}/refresh`, {
          withCredentials: true,
        });

        // Повторный запрос
        return $api.request(originalRequest);
      } catch (e) {
        console.error('Ошибка обновления токена или пользователь не авторизован:', e);
      }
    }

    throw error;
  }
);

export default $api;
