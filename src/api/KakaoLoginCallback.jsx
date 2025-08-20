import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const KakaoLoginCallback = () => {
  const navigate = useNavigate();
  const code = new URLSearchParams(window.location.search).get('code');
  const VITE_BACKEND_BASE_URL = import.meta.env.VITE_BACKEND_BASE_URL;

  useEffect(() => {
    const fetchToken = async () => {
      try {
        console.log('인가코드:', code);

        const usedCode = localStorage.getItem('usedKakaoCode');
        if (usedCode === code) {
          console.log('이미 처리된 인가코드입니다.');
          return;
        }
        localStorage.setItem('usedKakaoCode', code);

        const response = await axios.get(`${VITE_BACKEND_BASE_URL}/kakao/callback`, { params: { code } });

        const { accessToken, id, name } = response.data.result;

        localStorage.setItem('userId', id);
        localStorage.setItem('userName', name);
        localStorage.setItem('accessToken', accessToken);

        console.log('응답 데이터:', response.data);
        console.log('로그인 성공! 페이지 이동');
        navigate('/shopinfo');
      } catch (error) {
        console.error(error);
        alert('카카오 로그인 실패: ' + (error.response?.data?.message || '서버 오류'));
      }
    };

    if (code) {
      fetchToken();
    } else {
      alert('인가코드 없음');
      navigate('/loginstart');
    }
  }, [code, navigate]);

  return <div>카카오 로그인 처리 중...</div>;
};

export default KakaoLoginCallback;
