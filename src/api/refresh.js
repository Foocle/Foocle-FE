import axios from 'axios';
import useAuthStore from '../stores/authStore';

const Refresh = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_BASE_URL,
  withCredentials: true, // RT HttpOnly 쿠키 포함
});

// 요청 시 Authorization 헤더 자동 붙이기
api.interceptors.request.use((config) => {
  const { token } = useAuthStore.getState();
  if (token) config.headers.Authorization = `${token}`;
  return config;
});

// 응답 401 시 자동 AT 재발급
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        // /refresh 호출 → 서버가 쿠키 RT로 새 AT 발급
        const res = await api.post(`${VITE_BACKEND_BASE_URL}/api/users/refresh`);
        const newToken = res.data.result.accessToken;

        // zustand에 새 AT 저장
        useAuthStore.getState().setToken(newToken);

        // 원래 요청 다시 시도
        originalRequest.headers.Authorization = `${newToken}`;
        return api(originalRequest);
      } catch (refreshError) {
        useAuthStore.getState().clearToken();
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default Refresh;
