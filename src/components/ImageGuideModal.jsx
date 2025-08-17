import React, { useState, useRef, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import IconInfo from '../assets/img/icon_info.svg';
import IconCheck from '../assets/img/icon_check_green.svg';
import IconXRed from '../assets/img/icon_x_red.svg';
import Okay1 from '../assets/img/okay1.svg';
import Okay2 from '../assets/img/okay2.svg';
import NotOkay1 from '../assets/img/not_okay1.svg';
import NotOkay2 from '../assets/img/not_okay2.svg';

const MODAL_TOP_OFFSET = 10;

const goodExamples = [
  { img: Okay1, label: '정면 음식사진' },
  { img: Okay2, label: '전체가 보이는 사진' },
];

const badExamples = [
  { img: NotOkay1, label: '잘린 사진' },
  { img: NotOkay2, label: '방해물이 보이는 사진' },
];

const ImageGuideModal = ({ isOpen, onClose }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [yPosition, setYPosition] = useState(window.innerHeight);
  const dragInfo = useRef({ startY: 0, initialModalY: 0 });
  const modalRef = useRef(null);
  const topY = window.innerHeight * (MODAL_TOP_OFFSET / 100);
  const bottomY = window.innerHeight;
  useEffect(() => {
    setYPosition(isOpen ? topY : bottomY);
    document.body.style.overflow = isOpen ? 'hidden' : 'auto';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen, topY, bottomY]);
  const handleDragStart = useCallback(
    (e) => {
      setIsDragging(true);
      const y = e.touches ? e.touches[0].clientY : e.clientY;
      dragInfo.current = { startY: y, initialModalY: yPosition };
    },
    [yPosition]
  );
  const handleDragMove = useCallback(
    (e) => {
      if (!isDragging) return;
      const y = e.touches ? e.touches[0].clientY : e.clientY;
      const deltaY = y - dragInfo.current.startY;
      const newY = dragInfo.current.initialModalY + deltaY;
      setYPosition(Math.max(topY, newY));
    },
    [isDragging, topY]
  );
  const handleDragEnd = useCallback(() => {
    if (!isDragging) return;
    setIsDragging(false);
    const closeThreshold = window.innerHeight * 0.6;
    if (yPosition > closeThreshold) {
      onClose();
    } else {
      setYPosition(topY);
    }
  }, [isDragging, yPosition, topY, onClose]);
  useEffect(() => {
    if (!isDragging) return;
    window.addEventListener('mousemove', handleDragMove);
    window.addEventListener('touchmove', handleDragMove);
    window.addEventListener('mouseup', handleDragEnd);
    window.addEventListener('touchend', handleDragEnd);
    return () => {
      window.removeEventListener('mousemove', handleDragMove);
      window.removeEventListener('touchmove', handleDragMove);
      window.removeEventListener('mouseup', handleDragEnd);
      window.removeEventListener('touchend', handleDragEnd);
    };
  }, [isDragging, handleDragMove, handleDragEnd]);

  return (
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
              {goodExamples.map((example) => (
                <ExampleItem key={example.label}>
                  <ImageWrapper>
                    <ImagePlaceholder imgSrc={example.img} />
                    <StatusIcon isGood={true}>
                      <img src={IconCheck} alt="올바른 예시" />
                    </StatusIcon>
                  </ImageWrapper>
                  <Label>{example.label}</Label>
                </ExampleItem>
              ))}
            </ExampleGrid>
          </GuideSection>

          <GuideSection>
            <GuideTitle isAvoid>이런 사진은 피해주세요!</GuideTitle>
            <ExampleGrid>
              {badExamples.map((example) => (
                <ExampleItem key={example.label}>
                  <ImageWrapper>
                    <ImagePlaceholder imgSrc={example.img} />
                    <StatusIcon isGood={false}>
                      <img src={IconXRed} alt="잘못된 예시" />
                    </StatusIcon>
                  </ImageWrapper>
                  <Label>{example.label}</Label>
                </ExampleItem>
              ))}
            </ExampleGrid>
          </GuideSection>
        </ContentArea>
        <Footer>
          <ConfirmButton onClick={onClose}>확인</ConfirmButton>
        </Footer>
      </ModalWrapper>
    </ModalOverlay>
  );
};

export default ImageGuideModal;

// --- Styled Components ---

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
  top: 0;
  margin: auto;
  width: 100%;
  height: calc(100% - ${MODAL_TOP_OFFSET}vh);
  max-width: 600px;
  background-color: white;
  border-top-left-radius: 2rem;
  border-top-right-radius: 2rem;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  box-shadow: 0px -4px 20px rgba(0, 0, 0, 0.15);
  transition: ${(props) => (props.isDragging ? 'none' : 'transform 0.3s ease-out')};
  padding: 0;
`;

const DragHandleWrapper = styled.div`
  width: 100%;
  padding: 2rem 0 1.2rem 0;
  display: flex;
  justify-content: center;
  cursor: grab;
  flex-shrink: 0;
  touch-action: none;
`;

const DragHandle = styled.div`
  width: 4rem;
  height: 0.5rem;
  background-color: #e0e0e0;
  border-radius: 0.25rem;
`;

const ContentArea = styled.div`
  overflow-y: auto;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  gap: 3.2rem;
  padding: 0 2.4rem 2.4rem;
`;

const Footer = styled.div`
  padding: 1.6rem 2.4rem 2.4rem;
  background-color: #fff;
  flex-shrink: 0;
`;

const ConfirmButton = styled.button`
  width: 100%;
  padding: 1.6rem 0;
  background-color: #ff7300;
  color: white;
  border: none;
  border-radius: 1.2rem;
  font-family: 'Pretendard-Bold';
  cursor: pointer;
  transition: background-color 0.2s;
  font-size: clamp(1.6rem, 4vw, 1.8rem);
`;

const InfoSection = styled.div`
  background: #4d4d4d;
  border-radius: 1.2rem;
  padding: 1.6rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  font-size: clamp(1.3rem, 3.5vw, 1.4rem);
  color: #fff;
`;

const InfoItem = styled.div`
  color: #fff;
  display: flex;
  align-items: flex-start;
  gap: 0.8rem;
  line-height: 1.5;
  img {
    width: 2rem;
    height: 2rem;
    margin-top: 0.1rem;
  }
`;

const GuideSection = styled.section`
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
`;

const GuideTitle = styled.h3`
  display: flex;
  justify-content: center;
  font-family: 'Pretendard-Bold';
  color: '#464A4D';
  margin: 0;
  font-size: clamp(1.6rem, 4.2vw, 1.8rem);
`;

const ExampleGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.6rem;
`;

const ExampleItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.8rem;
`;

const ImageWrapper = styled.div`
  position: relative;
  width: 100%;
`;

const ImagePlaceholder = styled.div`
  width: 100%;
  aspect-ratio: 4 / 5;
  border-radius: 1.2rem;
  background-image: url(${(props) => props.imgSrc});
  background-size: cover;
  background-position: center;
`;

const Label = styled.p`
  margin: 0;
  color: #555;
  font-size: clamp(1.4rem, 3.8vw, 1.5rem);
`;

const StatusIcon = styled.div`
  position: absolute;
  top: 0.8rem;
  left: 0.8rem;
  width: 2.8rem;
  height: 2.8rem;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${(props) => (props.isGood ? '#00D26D' : '#FF5D5D')};
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.15);

  & > img {
    width: 1.6rem;
    height: 1.6rem;
  }
`;
