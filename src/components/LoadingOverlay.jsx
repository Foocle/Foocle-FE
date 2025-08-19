import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { PacmanLoader } from 'react-spinners';

const OverlayWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 9999;
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1.5rem;

  transform: scale(0.9);

  @media (min-width: 768px) {
    transform: scale(1);
    gap: 2rem;
  }
`;

const LoadingText = styled.div`
  display: flex;
  flex-direction: row;
  align-items: baseline;

  p {
    font-size: clamp(1.5rem, 6vw, 2rem);
    font-family: 'Pretendard-Medium';
    color: #ffffff;
    white-space: nowrap;
  }

  span {
    font-size: clamp(1.5rem, 6vw, 2rem);
    letter-spacing: clamp(4px, 1.2vw, 6px);
    padding-left: 0.7rem;
    color: #ffffff;
    min-width: 4.5rem;
  }
`;

const LoadingOverlay = ({ isLoading }) => {
  const [dots, setDots] = useState('');

  useEffect(() => {
    if (isLoading) {
      const interval = setInterval(() => {
        setDots((prev) => (prev.length < 3 ? prev + '.' : ''));
      }, 500);
      return () => clearInterval(interval);
    }
  }, [isLoading]);

  if (!isLoading) {
    return null;
  }

  return (
    <OverlayWrapper>
      <ContentWrapper>
        {/* 로더 크기 지정 */}
        <PacmanLoader color="#FFFFFF" size={35} />

        <LoadingText>
          <p>이미지 업로드 중</p>
          <span>{dots}</span>
        </LoadingText>
      </ContentWrapper>
    </OverlayWrapper>
  );
};

export default LoadingOverlay;
