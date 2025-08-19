import axios from 'axios';
import useAuthStore from '../stores/authStore';

const getMyStores = async () => {
  try {
    const { token } = useAuthStore.getState();
    const response = await axios.get(`${import.meta.env.VITE_BACKEND_BASE_URL}/api/stores/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('내 가게 목록 조회 실패:', error);
    throw error;
  }
};

const getStoreDetails = async (storeId) => {
  try {
    const { token } = useAuthStore.getState(); // 인증이 필요한 경우 토큰을 가져옵니다.
    const response = await axios.get(`${import.meta.env.VITE_BACKEND_BASE_URL}/api/stores/${storeId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log('가게 상세 정보 응답:', response);
    return response.data;
  } catch (error) {
    console.error('가게 상세 정보 조회 실패:', error);
    throw error;
  }
};
export default getStoreDetails;
