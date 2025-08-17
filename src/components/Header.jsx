// 헤더 바 (뒤로가기 버튼 + 페이지 제목) 담당
// Join/Login, Join/Signup, Curation/... 구현에 사용

import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import useHeaderStore from '../stores/headerStore';
import IconDone from '../assets/img/icon_done.svg';
import XIcon from '../assets/img/icon_x.svg';

const HeaderWrapper = styled.header`
  max-width: 600px;
  height: 5.625rem;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1.875rem;
  box-sizing: border-box;
  position: relative;
  border-bottom: 1px solid #EDEDED;
`;
const SideContainer = styled.div`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);

  // 왼쪽, 오른쪽 위치 지정
  &.left {
    left: 1.875rem;
  }
  &.right {
    right: 1.875rem;
  }
`;
const Button = styled.button`
  width: 1.875rem;
  height: 1.875rem;
  border: none;
  background-color: white;
  cursor: pointer;
  padding: 0;
`;

const CompleteButton = styled.button`
  display: inline-block;
  background-color: #fff;
  border: none;
  color: var(--Maincolor-1, #ff7300);
  text-align: center;
  font-size: 1.5rem;
  font-family: "Pretendard-Medium";
  padding: 0;
`;

const Title = styled.div`
  font-weight: 600;
  font-size: 1.5rem;
  color: var(--Gray-scale-2, #4d4d4d);
  font-family: "Pretendard-SemiBold";
  line-height: 1.875rem;
`;

const Img = styled.img`
  width: 100%;
  height: 100%;
`;

export default function Header() {
  const navigate = useNavigate();
  const { showBackButton, showCloseButton, title, showCompleteButton, onComplete } = useHeaderStore();

  return (
    <HeaderWrapper>
      <SideContainer className="left">
        {showBackButton && (
          <Button onClick={() => navigate(-1)}>
            <Img src={IconDone} alt="뒤로 가기" />
          </Button>
        )}
        {showCloseButton && (
          <Button onClick={() => navigate('/shopinfo')}>
            <Img src={XIcon} alt="닫기" />
          </Button>
        )}
      </SideContainer>

      <Title>{title}</Title>

      <SideContainer className="right">
        {showCompleteButton && <CompleteButton onClick={onComplete}>완료</CompleteButton>}
      </SideContainer>
    </HeaderWrapper>
  );
}
