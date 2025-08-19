// src/api/logout.js
import axios from 'axios';
import useAuthStore from '../stores/authStore';

const Logout = async () => {
    const { token, clearToken } = useAuthStore.getState();

    if (!token) {
        console.warn("이미 로그아웃된 상태입니다.");
        return;
    }

    try {
        const response = await axios.post(
            `${import.meta.env.VITE_BACKEND_BASE_URL}/api/users/logout`,
            {},
            {
                headers: {
                    Authorization: `${token}`,
                },
            }
        );

        console.log("로그아웃 성공:", response.data);
        clearToken();

        return response.data;

    } catch (error) {
        console.error("로그아웃 API 호출 실패:", error);
        throw error;
    }
};

export default Logout;