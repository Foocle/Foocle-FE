import axios from 'axios';
import useAuthStore from '../stores/authStore';
const CreateStore = async (storeData) => {
  try {
    const { token } = useAuthStore.getState();
    const response = await axios.post(`${import.meta.env.VITE_BACKEND_BASE_URL}/api/stores`, storeData, {
      headers: {
        Authorization: `${token}`,
        'Content-Type': 'application/json',
      },
    });

    return response.data;
  } catch (error) {
    console.error('가게 등록 실패:', error);
    throw error.response?.data || error;
  }
};

export default CreateStore;
