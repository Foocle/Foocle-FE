// 화면 전체를 덮는 영상 재생 모달 담당 컴포넌트

import { useEffect } from 'react';
import styled from 'styled-components';
import IconBack from '../assets/img/icon_back.svg';

const Overlay = styled.div`
  position: fixed;
  left: 50%;
  top: 0;
  width: 100%;
  max-width: ${(props) => props.$max || 600}px;
  height: 100vh;
  transform: translateX(-50%);
  background: rgba(0, 0, 0, 0.65);
  z-index: 2000;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Stage = styled.div`
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Video = styled.video`
  width: 100%;
  height: 100%;
  object-fit: contain;
  background: black;
`;

const CloseBtn = styled.button`
  position: absolute;
  /* left: 0;
    top: 16.92px; */
  left: clamp(0px, 0vw, 16px);
  top: calc(clamp(6px, 2vh, 16px));
  z-index: 1;
  border: none;
  cursor: pointer;
  background: none;
  padding: 0;
  img {
    width: clamp(18px, 15vw, 60px);
    height: clamp(18px, 15vw, 60px);
  }
`;

export default function VideoOverlay({ open, src, onClose, maxWidth = 600 }) {
  // ESC로 닫기 + 바디 스크롤 잠금
  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && onClose();

    if (open) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', onKey);
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <Overlay $max={maxWidth} onClick={onClose}>
      <Stage onClick={(e) => e.stopPropagation()}>
        <CloseBtn onClick={onClose}>
          <img src={IconBack} />
        </CloseBtn>
        <Video src={src} autoPlay controls playsInline />
      </Stage>
    </Overlay>
  );
}
