// src/api/createshortform.js

import axios from 'axios';
import useAuthStore from '../stores/authStore';

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_BASE_URL,
});

/**
 * 저장된 이미지를 이용해 숏폼 영상 생성을 요청합니다.
 * @param {Array<string>} imageIds 사용할 이미지의 UUID 배열
 * @param {string} ttsGender TTS 음성 성별 (MALE 또는 FEMALE)
 * @returns {Promise<object>} API 응답 데이터를 담은 Promise를 반환
 */
export const createShortsFromStored = async (storeId, imageIds, ttsGender) => {
  const data = {
    imageIds,
    ttsGender,
  };

  try {
    const { token } = useAuthStore.getState();
    console.log(data);
    const response = await apiClient.post(`/api/v1/stores/${storeId}/shorts:from-stored-ids`, data, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('숏폼 생성 오류:', error.response ? error.response.data : error.message);
    throw error;
  }
};

/**
 * 숏츠 생성 상태를 조회하는 API 함수입니다.
 * @param {string} shortsUuid
 * @returns {Promise<object>}
 */
export const getShortsStatus = async (shortsUuid) => {
  try {
    const { token } = useAuthStore.getState();

    const response = await apiClient.get(`/api/v1/shorts/${shortsUuid}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('숏츠 상태 조회 실패:', error.response ? error.response.data : error.message);
    throw error;
  }
};
