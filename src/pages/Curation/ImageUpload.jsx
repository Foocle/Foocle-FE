// 이미지(가게 외관, 가게 내부, 요리 등) 업로드 페이지

import { useEffect, useState } from 'react';
import styled from 'styled-components';
import useHeaderStore from '../../stores/headerStore';
import StepperComponent from '../../components/ProgressBar';
import ImageUploaderCard from '../../components/ImageUploaderCard';
import IconPlus from '../../assets/img/icon_plus.svg';
import InstructionCard from '../../components/InstructionCard';

// 각 섹션의 제목을 정의
const SECTIONS = {
  storeExterior: '1. 가게 외관',
  storeInterior: '2. 가게 내부',
  cookingProcess: '3. 요리하는 모습',
  foodPhotos: '4. 음식 사진',
};

const ImageUpload = () => {
  const setHeaderConfig = useHeaderStore((state) => state.setHeaderConfig);
  const resetHeaderConfig = useHeaderStore((state) => state.resetHeaderConfig);
  const activeSteps = [1, 2];

  // 모든 이미지 카드 데이터를 통합 관리하는 state
  const [cards, setCards] = useState({
    storeExterior: [{ id: Date.now() }],
    storeInterior: [{ id: Date.now() + 1 }],
    cookingProcess: [{ id: Date.now() + 2 }],
    foodPhotos: [{ id: Date.now() + 3 }],
  });

  useEffect(() => {
    setHeaderConfig({
      showBackButton: true,
      showCloseButton: false,
      title: '이미지 업로드',
      showCompleteButton: false,
    });
    return () => resetHeaderConfig();
  }, [setHeaderConfig, resetHeaderConfig]);

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
    // 여기에 백엔드 API 호출 로직을 추가합니다 (아래 3번 항목 참조)
  };
  return (
    <PageWrapper>
      <StepperComponent activeSteps={activeSteps} />
      <InstructionCard text={'음식 사진은 최소 5장이 필요해요! 음식 사진은 필수'} />

      {Object.entries(SECTIONS).map(([key, title]) => (
        <SectionContainer key={key}>
          {cards[key].map((card, index) => (
            <ImageUploaderCard
              key={card.id}
              title={index === 0 ? title : ''} // 첫 번째 카드에만 제목 표시
              cardData={card} // 카드 데이터 전달
              onUpdate={(data) => handleUpdateCard(key, card.id, data)}
              onDelete={() => handleDeleteCard(key, card.id)}
            />
          ))}
          <AddButton onClick={() => handleAddCard(key)}>
            <img src={IconPlus} alt="추가하기" />
            추가하기
          </AddButton>
        </SectionContainer>
      ))}
    </PageWrapper>
  );
};
export default ImageUpload;

// 스타일 컴포넌트
const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  padding-bottom: 2rem;
`;

const SectionContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const AddButton = styled.button`
  width: 100%;
  max-width: 400px;
  height: 3.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  background-color: #fff2e6; /* 기존 색상보다 약간 연하게 조정 */
  border: 1px dashed #ff7300; /* 점선 테두리 추가 */
  border-radius: 8px;
  color: #ff7300;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s;
  margin: 0 auto;

  &:hover {
    background-color: #ffe8d0;
  }
`;
