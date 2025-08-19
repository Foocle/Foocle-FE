// 헤더 바 (뒤로가기 버튼 + 페이지 제목) 담당
// Join/Login, Join/Signup, Curation/... 구현에 사용
import React from 'react';
import styled from 'styled-components';
import { useNavigate, useLocation } from 'react-router-dom';
import useHeaderStore from '../stores/headerStore';
import useAuthStore from '../stores/authStore';
import Logout from '../api/logout';
import IconDone from '../assets/img/icon_done.svg';
import XIcon from '../assets/img/icon_x.svg';
import IconMypage from '../assets/img/icon_mypagepage.svg';

const STEPS = ['/loginstart', '/login', '/shopinfo', '/imageupload', '/setvideo', '/videocomplete'];

export default function Header() {
  const navigate = useNavigate();
  const { pathname, state } = useLocation();
  const { showBackButton, showCloseButton, title, showCompleteButton, onComplete } = useHeaderStore();

  const { isLoggedIn, clearToken } = useAuthStore();

  const goBackByStep = () => {
    if (state && typeof state === 'object' && state.from) {
      navigate(String(state.from), { replace: true });
      return;
    }
    const i = STEPS.indexOf(pathname);
    const prev = i > 0 ? STEPS[i - 1] : STEPS[0];
    navigate(prev, { replace: true });
  };

  const handleLogout = async () => {
    const confirmed = window.confirm('정말 로그아웃 하시겠습니까?');
    if (confirmed) {
      try {
        await Logout();
        clearToken();
        window.alert('로그아웃 되었습니다.');
        navigate('/login');
      } catch (error) {
        console.error('로그아웃 실패:', error);
        window.alert('로그아웃 중 오류가 발생했습니다. 다시 시도해 주세요.');
      }
    }
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
        {isLoggedIn &&
          // 현재 경로가 마이페이지일 경우 로그아웃 버튼 표시
          (pathname === '/mypage' ? (
            <LogoutButton onClick={handleLogout}>로그아웃</LogoutButton>
          ) : (
            // 마이페이지가 아닐 경우 마이페이지 아이콘 표시
            <Button onClick={() => navigate('/mypage')}>
              <Img src={IconMypage} alt="마이페이지" />
            </Button>
          ))}
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
    display: flex;
    gap: 1rem; // 완료 버튼과 로그인/로그아웃 버튼 사이 간격 추가
    align-items: center;
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

const LogoutButton = styled.button`
  display: inline-block;
  background-color: var(--MainColor-1, #ff7300);
  color: #ffffff;
  border: none;
  border-radius: 10px;
  font-family: 'Pretendard-SemiBold';
  font-size: clamp(10px, 3.5vw, 14px);
  padding: 0.8rem 1.6rem;
  cursor: pointer;
  /* white-space: nowrap; */
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
