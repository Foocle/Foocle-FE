// src/api.js

import axios from 'axios';
import useAuthStore from '../stores/authStore';
const apiClient = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_BASE_URL,
});

const UploadImage = async ({ storeId, imageFile, type, description }) => {
  const formData = new FormData();

  formData.append('files', imageFile);
  formData.append(
    'meta',
    JSON.stringify({
      type: type,
      descriptions: [description || ''], // 설명이 없으면 빈 문자열을 배열에 담아 전송
    })
  );

  try {
    const { token } = useAuthStore.getState();

    const response = await apiClient.post(`/api/stores/${storeId}/images`, formData, {
      headers: {
        Authorization: `${token}`,
        'Content-Type': 'multipart/form-data',
      },
    });
    console.log(`${type} 이미지 업로드 성공:`, response.data);
    return response.data;
  } catch (error) {
    console.error(`${type} 이미지 업로드 실패:`, error.response ? error.response.data : error.message);
    throw error;
  }
};

export default UploadImage;
