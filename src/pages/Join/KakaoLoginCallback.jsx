import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import useAuthStore from '../../stores/authStore';
const KakaoLoginCallback = () => {
  const navigate = useNavigate();
  const setAuth = useAuthStore((state) => state.setAuth);
  const code = new URLSearchParams(window.location.search).get('code');
  console.log(code);
  useEffect(() => {
    const fetchToken = async () => {
      try {
        console.log('인가코드:', code);

        const usedCode = localStorage.getItem('usedKakaoCode');
        if (usedCode === code) {
          console.log('이미 처리된 인가코드입니다.');
          // 이미 처리된 경우, 홈 또는 다른 페이지로 이동시킬 수 있습니다.
          navigate('/shopinfo');
          return;
        }

        const response = await axios.get(`${import.meta.env.VITE_BACKEND_BASE_URL}/kakao/callback`, {
          params: { code },
        });
        console.log(code);
        // API 요청이 성공적으로 완료된 후에 인가코드를 저장합니다.
        localStorage.setItem('usedKakaoCode', code);

        console.log('응답 데이터:', response.data);
        console.log('로그인 성공! 페이지 이동');

        // 응답에서 email을 함께 추출합니다.
        const { accessToken, id, email, name } = response.data.result;

        // 추출한 email 변수를 사용하여 상태를 업데이트합니다.
        setAuth({ accessToken, email, name });

        navigate('/shopinfo');
      } catch (error) {
        console.error('카카오 로그인 처리 중 오류 발생:', error);
        alert('카카오 로그인에 실패했습니다: ' + (error.response?.data?.message || '서버 오류가 발생했습니다.'));
        navigate('/loginstart'); // 실패 시 로그인 페이지로 이동
      }
    };

    if (code) {
      fetchToken();
    } else {
      alert('카카오 인가코드를 받아오지 못했습니다.');
      navigate('/loginstart');
    }
  }, [code, navigate, setAuth]); // useEffect 의존성 배열에 setAuth 추가

  return <div>카카오 로그인 처리 중...</div>;
};

export default KakaoLoginCallback;
