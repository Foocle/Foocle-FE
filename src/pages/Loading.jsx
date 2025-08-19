// 쇼츠 생성 로딩중 페이지
import { useState, useEffect } from 'react';
import { PacmanLoader } from 'react-spinners';
import { useNavigate, useSearchParams } from 'react-router-dom';
import styled from 'styled-components';
import { getShortsStatus } from '../api/createshortform.js';

const LoadingWrapper = styled.div`
  width: 100%;
  max-width: 600px;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  overflow: hidden;
  padding: 0 !important;
`;
const Loadingtext = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: clamp(8px, 2vh, 16px) 0;
  p {
    font-size: clamp(16px, 6vw, 25px);
    font-family: 'Pretendard-Medium';
    line-height: 1.6;
    color: #757b80;
  }
  span {
    width: clamp(24px, 8vw, 40px);
    letter-spacing: clamp(4px, 1.5vw, 10px);
    padding-left: clamp(2px, 1vw, 5px);
    line-height: 1.6;
    color: #757b80;
  }
`;

const Loading = () => {
  const [dots, setDots] = useState('');
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const shortsUuid = searchParams.get('shortsUuid'); // URL에서 shortsUuid 가져오기
  const storeId = searchParams.get('storeId');
  // 점(...) 애니메이션
  useEffect(() => {
    const interval = setInterval(() => {
      setDots((prev) => (prev.length < 3 ? prev + '.' : ''));
    }, 1000); // 1초 간격
    return () => clearInterval(interval);
  }, []);

  //5초 뒤 쇼츠 완성 페이지로 자동 이동
  useEffect(() => {
    // shortsUuid가 없으면 로직을 중단
    if (!shortsUuid) {
      console.error('shortsUuid가 URL에 없습니다.');
      alert('영상 정보를 찾을 수 없습니다. 다시 시도해 주세요.');
      navigate(-1); // 이전 페이지로 돌아가기
      return;
    }

    const pollStatus = async () => {
      try {
        const response = await getShortsStatus(shortsUuid);
        const status = response.result.status;

        console.log(`폴링 상태: ${status}`);

        if (status === 'DONE') {
          // 생성이 완료된 경우
          const videoUrl = response.result.url;
          const promotionText = response.result.promotionText;
          const suggestTitle = response.result.title;
          console.log(response);
          // 영상 URL과 텍스트를 state에 담아 다음 페이지로 이동
          navigate('/videocomplete', {
            state: {
              suggestTitle,
              videoUrl,
              promotionText,
            },
            replace: true, // 이전 페이지 히스토리를 대체하여 뒤로가기 방지
          });
          return; // 함수 실행 중단
        }

        if (status === 'FAILED') {
          // 생성이 실패한 경우
          alert('영상 생성에 실패했습니다. 다시 시도해 주세요.');
          navigate(`/setvideo/${storeId}`, { replace: true });
          return;
        }

        // 상태가 DONE 또는 FAILED가 아니면 2초 후에 다시 폴링
        setTimeout(pollStatus, 2000);
      } catch (error) {
        console.error('폴링 중 오류 발생:', error);
        alert('영상 상태를 확인하는 중 오류가 발생했습니다.');
        navigate('/setvideo');
      }
    };

    // 컴포넌트 마운트 시 폴링 시작
    pollStatus();
  }, [navigate, shortsUuid, storeId]);

  return (
    <LoadingWrapper>
      <PacmanLoader color="#A5A5A5" />
      <Loadingtext>
        <p>쇼츠 생성하는 중</p>
        <span>{dots}</span>
      </Loadingtext>
    </LoadingWrapper>
  );
};

export default Loading;
