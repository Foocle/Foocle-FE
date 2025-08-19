import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useAuthStore = create(
  persist(
    (set) => ({
      token: null, // Access Token
      email: null, // 사용자 이메일
      name: null, // 사용자 이름
      isLoggedIn: false, // 로그인 상태

      // setter 함수
      setAuth: ({ token, email, name }) => set({ token, email, name, isLoggedIn: !!token }),
      setToken: (token) => set({ token, isLoggedIn: !!token }), // 토큰이 있을 때 true로 설정
      clearToken: () => set({ token: null, email: null, name: null, isLoggedIn: false }), // 로그아웃 시 false로 설정
    }),
    {
      name: 'auth-storage',
    }
  )
);

export default useAuthStore;
