import React, { useState, useRef, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import IconInfo from '../assets/img/icon_info.svg';
import IconCheck from '../assets/img/icon_check_green.svg';

// 모달이 화면 상단에서 얼마나 떨어질지 설정 (vh 단위)
const MODAL_TOP_OFFSET = 10; // 10vh (화면의 90% 높이를 차지)

const VideoModal = ({ isOpen, onClose }) => {
  const [isDragging, setIsDragging] = useState(false);
  // 모달의 Y축 위치를 상태로 관리 (px 단위)
  const [yPosition, setYPosition] = useState(window.innerHeight);
  const dragInfo = useRef({ startY: 0, initialModalY: 0 });
  const modalRef = useRef(null);

  // 화면 상단과 하단의 Y 좌표 계산
  const topY = window.innerHeight * (MODAL_TOP_OFFSET / 100);
  const bottomY = window.innerHeight;

  // 모달이 열리거나 닫힐 때 부드럽게 애니메이션 처리
  useEffect(() => {
    setYPosition(isOpen ? topY : bottomY);

    // 배경 스크롤 방지
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

    // 컴포넌트 언마운트 시 스크롤 복원
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen, topY, bottomY]);

  // 드래그 시작: 시작점과 현재 모달 위치 기록
  const handleDragStart = useCallback(
    (e) => {
      setIsDragging(true);
      const y = e.touches ? e.touches[0].clientY : e.clientY;
      dragInfo.current = { startY: y, initialModalY: yPosition };
    },
    [yPosition]
  );

  // 드래그 중: 손가락 움직임에 따라 모달 위치 실시간 업데이트
  const handleDragMove = useCallback(
    (e) => {
      if (!isDragging) return;
      const y = e.touches ? e.touches[0].clientY : e.clientY;
      const deltaY = y - dragInfo.current.startY;
      const newY = dragInfo.current.initialModalY + deltaY;
      // 모달이 상단 밖으로 나가지 않도록 제한
      setYPosition(Math.max(topY, newY));
    },
    [isDragging, topY]
  );

  // 드래그 종료: 최종 위치에 따라 닫거나 위로 스냅
  const handleDragEnd = useCallback(() => {
    if (!isDragging) return;
    setIsDragging(false);

    // 화면의 60% 지점을 기준으로 닫을지 결정
    const closeThreshold = window.innerHeight * 0.6;
    if (yPosition > closeThreshold) {
      onClose(); // 60%보다 아래에 있으면 닫기
    } else {
      setYPosition(topY); // 60%보다 위에 있으면 맨 위로 스냅
    }
  }, [isDragging, yPosition, topY, onClose]);

  // 드래그 상태에 따라 필요한 이벤트 리스너를 동적으로 추가/제거
  useEffect(() => {
    if (!isDragging) return;
    const moveListener = (e) => handleDragMove(e);
    const endListener = () => handleDragEnd();
    window.addEventListener('mousemove', moveListener);
    window.addEventListener('touchmove', moveListener);
    window.addEventListener('mouseup', endListener);
    window.addEventListener('touchend', endListener);
    return () => {
      window.removeEventListener('mousemove', moveListener);
      window.removeEventListener('touchmove', moveListener);
      window.removeEventListener('mouseup', endListener);
      window.removeEventListener('touchend', endListener);
    };
  }, [isDragging, handleDragMove, handleDragEnd]);

  return (
    // isOpen 상태에 따라 투명도 조절하여 부드러운 등장/사라짐 효과
    <ModalOverlay isOpen={isOpen} onClick={onClose}>
      <ModalWrapper
        ref={modalRef}
        onClick={(e) => e.stopPropagation()}
        style={{ transform: `translateY(${yPosition}px)` }}
        isDragging={isDragging}
      >
        <DragHandleWrapper onMouseDown={handleDragStart} onTouchStart={handleDragStart}>
          <DragHandle />
        </DragHandleWrapper>
        <ContentArea>
          {/* 기존 컨텐츠 내용 */}
          <InfoSection>
            <InfoItem>
              <img src={IconInfo} alt="정보" />타 가게의 사진을 도용할 경우, 형사 처벌의 대상이 될 수 있습니다.
            </InfoItem>
            <InfoItem>
              <img src={IconInfo} alt="정보" />
              사진은 가로 또는 세로 중 한 형태로 통일하여 업로드하세요.
            </InfoItem>
          </InfoSection>
          <GuideSection>
            <GuideTitle>이런 사진을 넣어주세요!</GuideTitle>
            <ExampleGrid>
              <ExampleItem>
                <ImagePlaceholder>
                  <Checkmark src={IconCheck} alt="올바른 예시" />
                </ImagePlaceholder>
                <Label>정면 음식사진</Label>
              </ExampleItem>
              <ExampleItem>
                <ImagePlaceholder>
                  <Checkmark src={IconCheck} alt="올바른 예시" />
                </ImagePlaceholder>
                <Label>전체가 보이는 사진</Label>
              </ExampleItem>
            </ExampleGrid>
          </GuideSection>
          <GuideSection>
            <GuideTitle isAvoid>이런 사진은 피해주세요!</GuideTitle>
            <ExampleGrid>
              <ExampleItem>
                <ImagePlaceholder isBadExample />
                <Label>너무 어두운 사진</Label>
              </ExampleItem>
              <ExampleItem>
                <ImagePlaceholder isBadExample />
                <Label>흔들린 사진</Label>
              </ExampleItem>
            </ExampleGrid>
          </GuideSection>
        </ContentArea>
        <ConfirmButton onClick={onClose}>확인</ConfirmButton>
      </ModalWrapper>
    </ModalOverlay>
  );
};

export default VideoModal;

// --- Styled Components ---

const rem = (px) => `${px / 16}rem`;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.6);
  z-index: 1000;
  opacity: ${(props) => (props.isOpen ? 1 : 0)};
  pointer-events: ${(props) => (props.isOpen ? 'auto' : 'none')};
  transition: opacity 0.3s ease-out;
`;

const ModalWrapper = styled.div`
  position: fixed;
  left: 0;
  right: 0;
  top: 0; /* top 기준으로 transform 적용 */
  margin: auto;
  width: 100%;
  height: calc(100% - ${MODAL_TOP_OFFSET}vh + 40px); /* 추가 높이 확보 */
  max-width: 500px;
  background-color: white;
  border-top-left-radius: ${rem(20)};
  border-top-right-radius: ${rem(20)};
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  padding: ${rem(12)} ${rem(24)} ${rem(24)};
  box-shadow: 0px -4px C20px rgba(0, 0, 0, 0.15);

  /* 드래그 중에는 transition을 없애고, 놓았을 때만 부드럽게 적용 */
  transition: ${(props) => (props.isDragging ? 'none' : 'transform 0.3s ease-out')};
`;

const DragHandleWrapper = styled.div`
  width: 100%;
  padding: ${rem(8)} 0;
  display: flex;
  justify-content: center;
  cursor: grab;
  flex-shrink: 0;
  touch-action: none; /* 모바일에서 드래그 시 페이지 전체가 움직이는 현상 방지 */
`;

const DragHandle = styled.div`
  width: ${rem(40)};
  height: ${rem(5)};
  background-color: #e0e0e0;
  border-radius: ${rem(2.5)};
`;

const ContentArea = styled.div`
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: ${rem(20)};
  padding-right: ${rem(5)};
  margin-right: -${rem(5)};
`;

const ConfirmButton = styled.button`
  width: 100%;
  padding: ${rem(16)} 0;
  background-color: #ff7300;
  color: white;
  border: none;
  border-radius: ${rem(12)};
  font-size: ${rem(16)};
  font-weight: 700;
  cursor: pointer;
  transition: background-color 0.2s;
  margin-top: ${rem(16)};
  flex-shrink: 0;

  &:hover {
    background-color: #e66800;
  }
`;

// --- 이하 스타일은 이전과 동일 ---
const InfoSection = styled.div`
  background-color: #4a4a4a;
  border-radius: ${rem(8)};
  padding: ${rem(14)};
  color: white;
  font-size: ${rem(13)};
  display: flex;
  flex-direction: column;
  gap: ${rem(10)};
`;
const InfoItem = styled.div`
  display: flex;
  align-items: center;
  gap: ${rem(8)};
  line-height: 1.4;
  img {
    width: ${rem(16)};
    height: ${rem(16)};
  }
`;
const GuideSection = styled.section`
  display: flex;
  flex-direction: column;
  gap: ${rem(12)};
`;
const GuideTitle = styled.h3`
  font-size: ${rem(16)};
  font-weight: 700;
  color: ${(props) => (props.isAvoid ? '#FF6B6B' : '#333')};
  margin: 0;
`;
const ExampleGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: ${rem(16)};
`;
const ExampleItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${rem(8)};
`;
const ImagePlaceholder = styled.div`
  width: 100%;
  aspect-ratio: 1 / 1;
  background-color: #f0f0f0;
  border-radius: ${rem(8)};
  position: relative;
  background-image: linear-gradient(45deg, #e0e0e0 25%, transparent 25%),
    linear-gradient(-45deg, #e0e0e0 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #e0e0e0 75%),
    linear-gradient(-45deg, transparent 75%, #e0e0e0 75%);
  background-size: 20px 20px;
  border: ${(props) => (props.isBadExample ? `2px solid #FF6B6B` : `none`)};
`;
const Checkmark = styled.img`
  position: absolute;
  top: ${rem(8)};
  left: ${rem(8)};
  width: ${rem(24)};
  height: ${rem(24)};
`;
const Label = styled.p`
  margin: 0;
  font-size: ${rem(14)};
  color: #555;
`;
