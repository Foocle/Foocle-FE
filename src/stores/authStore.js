import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useAuthStore = create(
  persist(
    (set) => ({
      token: null, // Access Token
      isLoggedIn: false, // 로그인 상태
      setToken: (token) => set({ token, isLoggedIn: !!token }), // 토큰이 있을 때 true로 설정
      clearToken: () => set({ token: null, isLoggedIn: false }), // 로그아웃 시 false로 설정
    }),
    {
      name: 'auth-storage',
    }
  )
);

export default useAuthStore;
