import React from 'react';
import styled from 'styled-components';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import useHeaderStore from '../stores/headerStore';
import useAuthStore from '../stores/authStore';
import Logout from '../api/logout';
import IconDone from '../assets/img/icon_done.svg';
import XIcon from '../assets/img/icon_x.svg';
import IconMypage from '../assets/img/icon_mypagepage.svg';

// 동적 라우트 반영
const STEPS = [
  '/loginstart',
  '/login',
  '/shopinfo',
  '/imageupload/:storeId',
  '/setvideo/:storeId',
  '/videocomplete',
  '/mypage',
];

export default function Header() {
  const navigate = useNavigate();
  const { pathname, state } = useLocation();
  const { storeId } = useParams(); // 현재 경로에서 storeId 추출
  const { showBackButton, showCloseButton, title } = useHeaderStore();

  const { isLoggedIn, clearToken } = useAuthStore();

  const goBackByStep = () => {
    // state.from 우선 적용
    if (state && typeof state === 'object' && state.from) {
      navigate(String(state.from), { replace: true });
      return;
    }

    // 현재 경로가 STEPS 중 어디에 해당하는지 찾기
    const i = STEPS.findIndex((step) => {
      // /imageupload/:storeId 같은 경우는 prefix 매칭
      if (step.includes(':storeId')) {
        return pathname.startsWith(step.split('/:')[0]);
      }
      return pathname === step;
    });

    if (i > 0) {
      let prev = STEPS[i - 1];
      // prev 경로에 :storeId 있으면 치환
      if (prev.includes(':storeId') && storeId) {
        prev = prev.replace(':storeId', storeId);
      }
      navigate(prev, { replace: true });
    } else {
      // fallback: 첫 스텝으로
      navigate(STEPS[0], { replace: true });
    }
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
          <Button onClick={() => navigate(`/setvideo/${storeId || ''}`)}>
            <Img src={XIcon} alt="닫기" />
          </Button>
        )}
      </SideContainer>

      <Title>{title}</Title>

      <SideContainer className="right">
        {isLoggedIn &&
          (pathname === '/mypage' ? (
            <LogoutButton onClick={handleLogout}>로그아웃</LogoutButton>
          ) : (
            <Button onClick={() => navigate('/mypage')}>
              <Img src={IconMypage} alt="마이페이지" />
            </Button>
          ))}
      </SideContainer>
    </HeaderWrapper>
  );
}

// --- Styled Components (기존 코드 그대로) ---
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
    gap: 1rem;
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
