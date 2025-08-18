// 헤더 바 (뒤로가기 버튼 + 페이지 제목) 담당
// Join/Login, Join/Signup, Curation/... 구현에 사용
import React from 'react';
import styled from 'styled-components';
import { useNavigate, useLocation } from 'react-router-dom';
import useHeaderStore from '../stores/headerStore';
import IconDone from '../assets/img/icon_done.svg';
import XIcon from '../assets/img/icon_x.svg';

const STEPS = ["/loginstart", "/shopinfo", "/imageupload", "/setvideo", "/videocomplete"];

export default function Header() {
  const navigate = useNavigate();
  const { pathname, state } = useLocation();
  const { showBackButton, showCloseButton, title, showCompleteButton, onComplete } = useHeaderStore();

  const goBackByStep = () => {
    // 1) 명시적 출처 우선
    if (state && typeof state === "object" && state.from) {
      navigate(String(state.from), { replace: true });
      return;
    }
    // 2) 스텝 테이블 기준
    const i = STEPS.indexOf(pathname);
    const prev = i > 0 ? STEPS[i - 1] : STEPS[0];
    navigate(prev, { replace: true });
  };


  return (
    <HeaderWrapper>
      <SideContainer className="left">
        {showBackButton && (
          <Button onClick={goBackByStep}>
            <Img src={IconDone} alt="뒤로 가기" />
          </Button>
        )}
        {showCloseButton && (
          <Button onClick={() => navigate('/setvideo')}>
            <Img src={XIcon} alt="닫기" />
          </Button>
        )}
      </SideContainer>

      <Title>{title}</Title>

      <SideContainer className="right">
        {showCompleteButton && <CompleteButton onClick={() => navigate('/')}>완료</CompleteButton>}
      </SideContainer>
    </HeaderWrapper>
  );
}

// --- Styled Components ---

const HeaderWrapper = styled.header`
  position: fixed;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  z-index: 100;
  max-width: 600px;
  width: 100%;
  height: 5.6rem;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 1.6rem;
  background-color: #fff;
  border-bottom: 1px solid #ededed;
  box-sizing: border-box;
`;

const SideContainer = styled.div`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);

  &.left {
    left: 1.6rem;
  }
  &.right {
    right: 1.6rem;
  }
`;

const Button = styled.button`
  width: 2.4rem;
  height: 2.4rem;
  border: none;
  background-color: transparent;
  cursor: pointer;
  padding: 0;
`;

const CompleteButton = styled.button`
  display: inline-block;
  background-color: transparent;
  border: none;
  color: var(--Maincolor-1, #ff7300);
  font-family: 'Pretendard-Medium';
  padding: 0;
  font-size: clamp(1.5rem, 4vw, 1.7rem);
  cursor: pointer;
`;

const Title = styled.div`
  color: var(--Gray-scale-2, #4d4d4d);
  font-family: 'Pretendard-SemiBold';
  line-height: 1.4;
  font-size: clamp(1.6rem, 4.2vw, 1.8rem);
`;

const Img = styled.img`
  width: 100%;
  height: 100%;
`;
