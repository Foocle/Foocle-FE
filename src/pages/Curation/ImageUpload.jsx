// 이미지(가게 외관, 가게 내부, 요리 등) 업로드 페이지

import { useEffect, useState } from 'react';
import styled from 'styled-components';
import useHeaderStore from '../../stores/headerStore';
import StepperComponent from '../../components/ProgressBar';
import ImageUploaderCard from '../../components/ImageUploaderCard';
import IconPlus from '../../assets/img/icon_plus.svg';
import InstructionCard from '../../components/InstructionCard';
import VideoModal from '../../components/VideoModal';
import IconImg from '../../assets/img/icon_image.svg';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../components/Button';
import IconShopOut from '../../assets/img/icon_shop_out.svg';
import IconShopIn from '../../assets/img/icon_shop_in.svg';
import IconCooking from '../../assets/img/icon_cooking.svg';
import IconFood from '../../assets/img/icon_food.svg';
// 각 섹션의 제목을 정의
const SECTIONS = {
  storeExterior: { title: '1. 가게 외관', icon: IconShopOut },
  storeInterior: { title: '2. 가게 내부', icon: IconShopIn },
  cookingProcess: { title: '3. 요리하는 모습', icon: IconCooking },
  foodPhotos: { title: '4. 음식 사진', icon: IconFood },
};
const ImageUpload = () => {
  const setHeaderConfig = useHeaderStore((state) => state.setHeaderConfig);
  const resetHeaderConfig = useHeaderStore((state) => state.resetHeaderConfig);
  const activeSteps = [1, 2];
  const navigate = useNavigate();

  const [isModalOpen, setIsModalOpen] = useState(false);
  useEffect(() => {
    setHeaderConfig({
      showBackButton: true,
      showCloseButton: false,
      title: '이미지 업로드',
      showCompleteButton: false,
    });
    return () => resetHeaderConfig();
  }, [setHeaderConfig, resetHeaderConfig]);

  // 모든 이미지 카드 데이터를 통합 관리하는 state
  const [cards, setCards] = useState({
    storeExterior: [{ id: Date.now() }],
    storeInterior: [{ id: Date.now() + 1 }],
    cookingProcess: [{ id: Date.now() + 2 }],
    foodPhotos: [{ id: Date.now() + 3 }],
  });

  //마지막 다음 버튼
  const handleNextClick = () => {
    console.log('요소 확인하는거 나중에 추가 예정');
    alert('다음 페이지로 넘어갑니다');
    navigate('/setvideo');
  };
  // 특정 섹션에 카드를 추가하는 함수
  const handleAddCard = (sectionKey) => {
    setCards((prevCards) => ({
      ...prevCards,
      [sectionKey]: [...prevCards[sectionKey], { id: Date.now() }],
    }));
  };
  // 특정 카드를 삭제하는 함수
  const handleDeleteCard = (sectionKey, cardId) => {
    setCards((prevCards) => ({
      ...prevCards,
      [sectionKey]: prevCards[sectionKey].filter((card) => card.id !== cardId),
    }));
  };
  // 카드 내의 데이터(이미지, 설명)가 변경될 때 호출되는 함수
  const handleUpdateCard = (sectionKey, cardId, data) => {
    setCards((prevCards) => ({
      ...prevCards,
      [sectionKey]: prevCards[sectionKey].map((card) => (card.id === cardId ? { ...card, ...data } : card)),
    }));
  };

  // 백엔드에 데이터를 전송하는 함수
  const handleSubmit = () => {
    console.log('전송할 데이터:', cards);
  };
  return (
    <PageWrapper>
      <StepperComponent activeSteps={activeSteps} />
      <InstructionCard text={'음식 사진은 최소 5장이 필요해요! 음식 사진은 필수'} />
      <ButtonWrapper>
        <GuideButton onClick={() => setIsModalOpen(true)}>
          <img src={IconImg} />
          사진 가이드 예시
        </GuideButton>
      </ButtonWrapper>
      {Object.entries(SECTIONS).map(([key, sectionData]) => (
        <SectionContainer key={key}>
          {cards[key].map((card, index) => (
            <ImageUploaderCard
              key={card.id}
              title={index === 0 ? sectionData.title : ''}
              icon={sectionData.icon}
              cardData={card}
              onUpdate={(data) => handleUpdateCard(key, card.id, data)}
              onDelete={() => handleDeleteCard(key, card.id)}
            />
          ))}
          <Button icon={IconPlus} text={'추가하기'} onClick={() => handleAddCard(key)}></Button>
        </SectionContainer>
      ))}
      <Button text={'다음'} reverse={true} onClick={handleNextClick}></Button>
      <VideoModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </PageWrapper>
  );
};
export default ImageUpload;

// --- Styled Components ---

const PageWrapper = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: center;
  gap: 1.6rem;
`;

const ButtonWrapper = styled.div`
  display: flex;
  width: 100%;
  justify-content: flex-end;
  margin-top: -1.6rem;
  margin-bottom: 1.6rem;
`;

const GuideButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.6rem;
  width: auto;
  background-color: #f0f4ff;
  color: #4a75e2;
  border: none;
  border-radius: 0.8rem;
  padding: 0.8rem 1.2rem;
  font-family: 'Pretendard-SemiBold';
  cursor: pointer;
  transition: background-color 0.2s;

  font-size: clamp(1.2rem, 3.2vw, 1.4rem);

  & > img {
    width: 1.4rem;
    height: 1.4rem;
  }

  &:hover {
    background-color: #e4eaff;
  }
`;

const SectionContainer = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  gap: 1.6rem;
  margin-bottom: 1.6rem;
  /* 768px 이상 태블릿 화면에서는 그리드 레이아웃으로 변경 */
  @media (min-width: 768px) {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 2.4rem;
  }
`;
