// 이미지(가게 외관, 가게 내부, 요리 등) 업로드 페이지

import { useEffect, useState, useMemo } from 'react'; // useMemo 추가
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

const SECTIONS = {
  storeExterior: { title: '1. 가게 외관', icon: IconShopOut, type: 'EXTERIOR' },
  storeInterior: { title: '2. 가게 내부', icon: IconShopIn, type: 'INTERIOR' },
  cookingProcess: { title: '3. 요리하는 모습', icon: IconCooking, type: 'KITCHEN' },
  foodPhotos: { title: '4. 결과물 (음식 사진)', icon: IconFood, type: 'FOOD' },
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

  const isFormValid = useMemo(() => {
    // 조건 1: 모든 섹션에 이미지가 최소 1개 이상 있는지 확인
    const allSectionsHaveImages = Object.keys(SECTIONS).every((key) => cards[key].some((card) => card.imageFile));

    if (!allSectionsHaveImages) return false;

    // 조건 2: 업로드될 모든 이미지에 설명이 있는지 확인
    const imagesToUpload = Object.values(cards)
      .flat()
      .filter((card) => card.imageFile);
    const allDescriptionsArePresent = imagesToUpload.every(
      (card) => card.description && card.description.trim() !== ''
    );

    // 두 조건을 모두 만족해야 유효함
    return allDescriptionsArePresent;
  }, [cards]); // cards 상태가 바뀔 때만 재계산됩니다.

  const handleUpdateCard = (sectionKey, cardId, data) => {
    setCards((prev) => ({
      ...prev,
      [sectionKey]: prev[sectionKey].map((card) => (card.id === cardId ? { ...card, ...data } : card)),
    }));
  };

  // ✨ 1. '다음' 버튼이 비활성화될 때 실행되지 않으므로 내부의 유효성 검사 로직 제거
  const handleNextClick = async () => {
    const uploadTasks = [];
    Object.entries(cards).forEach(([sectionKey, cardArray]) => {
      cardArray.forEach((card) => {
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

    if (uploadTasks.length > 5) {
      alert('6장 이상은 비용문제로 일시 제한합니다. 최대 5장으로 요청해주세요.');
      return;
    }

    setIsLoading(true);

    try {
      console.log(`${uploadTasks.length}개의 이미지 업로드를 시작합니다.`);
      const uploadResults = await Promise.all(uploadTasks);

      // 성공 응답에서 필요한 데이터(UUID와 설명) 추출
      const uploadedData = uploadResults.map((result) => ({
        id: result.result.id,
        uuid: result.result.imageUuid, // UUID 추출
        description: result.result.description, // description 추출
      }));

      navigate(`/setvideo/${storeId}`, { state: { uploadedData } });
    } catch (error) {
      console.error('이미지 업로드 중 오류 발생:', error);
      alert('이미지 업로드 중 오류가 발생했습니다. 다시 시도해주세요.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddCard = (sectionKey) => {
    const totalCards = Object.values(cards).flat().length;
    if (totalCards >= 10) {
      alert('최대 10장까지만 추가할 수 있습니다.');
      return;
    }

    setCards((prevCards) => ({
      ...prevCards,
      [sectionKey]: [...prevCards[sectionKey], { id: Date.now() }],
    }));
  };

  const handleDeleteCard = (sectionKey, cardId) => {
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
      <InstructionCard text={'각 섹션별로 최소 1장의 사진, 설명을 필수로 등록해주세요!'} />
      <ButtonWrapper>
        <GuideButton onClick={() => setIsModalOpen(true)}>
          <img src={IconImg} alt="사진 가이드 아이콘" />
          사진 가이드 예시
        </GuideButton>
      </ButtonWrapper>
      {Object.entries(SECTIONS).map(([key, sectionData]) => (
        <SectionContainer key={key}>
          <SectionTitle>{sectionData.title}</SectionTitle>
          {key === 'foodPhotos' && (
            <DescriptionGuide>
              <GuideHeader>
                <GuideTitle>음식 설명 가이드</GuideTitle>
                <RequiredBadge>가격은 필수로 적어주세요!</RequiredBadge>
              </GuideHeader>
              <GuideContent>
                <div>감각적 표현 - 색감·질감·향·맛</div>
                <div>차별화 포인트 - 특별한 재료·전통·조리법·미디어·충성도</div>
                <div>감정적 어필 - 향수·즐거움·건강·편의성·프리미엄</div>
                <div>상황별 - 아침·저녁·야식·날씨·기념일</div>
              </GuideContent>
            </DescriptionGuide>
          )}
          {cards[key].map((card) => (
            <ImageUploaderCard
              key={card.id}
              icon={sectionData.icon}
              cardData={card}
              placeholder={
                key === 'foodPhotos'
                  ? '12,000원에 신선한 재료로 만든 가성비 탕수육을 점심, 저녁 메뉴로 먹을 수 있습니다.'
                  : '위 사진에 대한 설명을 적어주세요.'
              }
              onUpdate={(data) => handleUpdateCard(key, card.id, data)}
              onDelete={() => handleDeleteCard(key, card.id)}
            />
          ))}
          <Button icon={IconPlus} text={'추가하기'} onClick={() => handleAddCard(key)} />
        </SectionContainer>
      ))}

      {/* 2. '다음' 버튼에 isFormValid와 연결된 disabled 속성 추가 */}
      <Button text={'다음'} reverse={true} onClick={handleNextClick} disabled={!isFormValid} />

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

  @media (min-width: 768px) {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 2.4rem;
  }
`;

const SectionTitle = styled.h3`
  font-family: 'Pretendard-Bold';
  font-size: clamp(1.8rem, 5vw, 2.2rem);
  color: #333;
  margin-bottom: -0.8rem;
  grid-column: 1 / -1;
`;

const DescriptionGuide = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  background-color: #f8f9fa;
  padding: 1.6rem;
  border-radius: 1rem;
  border: 1px solid #e9ecef;
  grid-column: 1 / -1;
`;

const GuideHeader = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 0.8rem;
`;

const GuideTitle = styled.span`
  font-family: 'Pretendard-Bold';
  font-size: clamp(1.2rem, 3.9vw, 1.4rem);
  color: #212529;
`;

const RequiredBadge = styled.span`
  background-color: #868686;
  color: #fff;
  font-family: 'Pretendard-Bold';
  padding: 0.4rem 0.8rem;
  border-radius: 2rem;
  font-size: clamp(0.85rem, 3vw, 0.9rem);
`;

const GuideContent = styled.div`
  color: #495057;
  font-size: clamp(1rem, 3.7vw, 1.2rem);
  line-height: 1.7;

  & > div {
    margin-bottom: 0.2rem;
  }
`;
