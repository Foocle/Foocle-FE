// 이미지(가게 외관, 가게 내부, 요리 등) 업로드 페이지

import { useEffect, useState } from 'react';
import styled from 'styled-components';
import useHeaderStore from '../../stores/headerStore';
import StepperComponent from '../../components/ProgressBar';
import ImageUploaderCard from '../../components/ImageUploaderCard';
import IconPlus from '../../assets/img/icon_plus.svg';
import InstructionCard from '../../components/InstructionCard';
import ImageGuideModal from '../../components/ImageGuideModal';
import IconImg from '../../assets/img/icon_image.svg';
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from '../../components/Button';
import IconShopOut from '../../assets/img/icon_shop_out.svg';
import IconShopIn from '../../assets/img/icon_shop_in.svg';
import IconCooking from '../../assets/img/icon_cooking.svg';
import IconFood from '../../assets/img/icon_food.svg';
import UploadImage from '../../api/image';
import LoadingOverlay from '../../components/LoadingOverlay';
// 각 섹션의 제목을 정의
const SECTIONS = {
  storeExterior: { title: '1. 가게 외관', icon: IconShopOut, type: 'EXTERIOR' },
  storeInterior: { title: '2. 가게 내부', icon: IconShopIn, type: 'INTERIOR' },
  cookingProcess: { title: '3. 요리하는 모습', icon: IconCooking, type: 'KITCHEN' },
  foodPhotos: { title: '4. 음식 사진', icon: IconFood, type: 'FOOD' },
};

const ImageUpload = () => {
  const setHeaderConfig = useHeaderStore((state) => state.setHeaderConfig);
  const resetHeaderConfig = useHeaderStore((state) => state.resetHeaderConfig);
  const activeSteps = [1, 2];
  const navigate = useNavigate();
  const { storeId } = useParams();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    setHeaderConfig({ showBackButton: true, title: '이미지 업로드' });
    return () => resetHeaderConfig();
  }, [setHeaderConfig, resetHeaderConfig]);

  const [cards, setCards] = useState({
    storeExterior: [{ id: Date.now() }],
    storeInterior: [{ id: Date.now() + 1 }],
    cookingProcess: [{ id: Date.now() + 2 }],
    foodPhotos: [{ id: Date.now() + 3 }],
  });

  //  API 호출 없이 상태만 업데이트
  const handleUpdateCard = (sectionKey, cardId, data) => {
    setCards((prev) => ({
      ...prev,
      [sectionKey]: prev[sectionKey].map((card) => (card.id === cardId ? { ...card, ...data } : card)),
    }));
  };

  // 모든 API 호출을 담당
  const handleNextClick = async () => {
    // 유효성 검사 (섹션 이미지 갯수 확인)
    const allSectionsHaveImages = Object.keys(SECTIONS).every((key) => cards[key].some((card) => card.imageFile));

    if (!allSectionsHaveImages) {
      alert('각 섹션에 최소 하나 이상의 이미지를 업로드해야 합니다.');
      return;
    }
    setIsLoading(true);
    // 1. 업로드해야 할 모든 이미지 작업을 배열에 담기
    const uploadTasks = [];
    Object.entries(cards).forEach(([sectionKey, cardArray]) => {
      cardArray.forEach((card) => {
        // 이미지 파일이 있는 카드만 대상
        if (card.imageFile) {
          uploadTasks.push(
            UploadImage({
              storeId,
              imageFile: card.imageFile,
              type: SECTIONS[sectionKey].type,
              description: card.description,
            })
          );
        }
      });
    });

    try {
      // 2. 이미지 동시에 업로드
      console.log(`${uploadTasks.length}개의 이미지 업로드를 시작합니다.`);
      await Promise.all(uploadTasks);

      alert('모든 이미지가 성공적으로 업로드되었습니다.');
      navigate(`/setvideo/${storeId}`);
    } catch (error) {
      // 3. 실패
      console.error('이미지 업로드 중 오류 발생:', error);
      alert('이미지 업로드 중 오류가 발생했습니다. 다시 시도해주세요.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddCard = (sectionKey) => {
    setCards((prevCards) => ({
      ...prevCards,
      [sectionKey]: [...prevCards[sectionKey], { id: Date.now() }],
    }));
  };

  const handleDeleteCard = (sectionKey, cardId) => {
    // 삭제 유효성 검사
    if (cards[sectionKey].length <= 1) {
      alert('더 이상 삭제할 수 없습니다.');
      return;
    }
    setCards((prevCards) => ({
      ...prevCards,
      [sectionKey]: prevCards[sectionKey].filter((card) => card.id !== cardId),
    }));
  };

  return (
    <PageWrapper>
      <StepperComponent activeSteps={activeSteps} />
      <InstructionCard text={'음식 사진은 최소 4장이 필요해요! 음식 사진은 필수'} />
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
      <ImageGuideModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      <LoadingOverlay isLoading={isLoading} />
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
  position: relative;
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
