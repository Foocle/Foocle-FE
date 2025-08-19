// 가게 정보 입력 페이지
// 카테고리 이미지는 public/img 폴더 안에 저장

import { useState, useEffect } from 'react';
import styled from 'styled-components';
import useHeaderStore from '../../stores/headerStore';
import { Button } from '../../components/Button';
import InstructionCard from '../../components/InstructionCard';
import { useNavigate } from 'react-router-dom';
import StepperComponent from '../../components/ProgressBar';
import CurationData from './CurationData';
import CreateStore from '../../api/store';
const InputShopInfo = () => {
  // Header 상태 관리
  const navigate = useNavigate();
  const setHeaderConfig = useHeaderStore((state) => state.setHeaderConfig);
  const resetHeaderConfig = useHeaderStore((state) => state.resetHeaderConfig);

  const activeSteps = [1]; // 현재 활성화된 스텝

  useEffect(() => {
    setHeaderConfig({
      showBackButton: true,
      showCloseButton: false,
      title: '가게 정보 입력하기',
      showCompleteButton: false,
    });
    return () => resetHeaderConfig();
  }, [setHeaderConfig, resetHeaderConfig]);

  // Form 입력 값 상태 관리
  const [shopName, setShopName] = useState('');
  const [location, setLocation] = useState('');
  const [hours, setHours] = useState({ start: '', end: '' });
  const [selectedCategory, setSelectedCategory] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);

  // 카테고리 클릭 핸들러
  const handleCategoryClick = (id) => {
    if (selectedCategories.includes(id)) {
      setSelectedCategories(selectedCategories.filter((cid) => cid !== id));
    } else {
      setSelectedCategories([...selectedCategories, id]);
    }
  };

  const handleNextClick = async () => {
    const payload = {
      name: shopName,
      address: location,
      openTime: hours.start,
      closeTime: hours.end,
      categoryIds: selectedCategories,
    };
    try {
      const res = await CreateStore(payload);
      const storeId = res.result.storeId;

      if (!storeId) {
        alert('가게 ID를 받아오지 못했습니다.');
        console.log(storeId);
        return;
      }
      console.log('등록 성공:', res);
      navigate(`/imageupload/${storeId}`);
    } catch (err) {
      alert(`등록 실패: ${err.message}`);
    }
  };

  return (
    <PageWrapper>
      <StepperComponent activeSteps={activeSteps} />

      <InstructionCard text={'상호명, 위치, 영업시간, 음식 카테고리만 입력하면 준비 완료!'} />
      <Form>
        <FormSection>
          <Label>상호명</Label>
          <InputWrapper>
            <Input
              type="text"
              placeholder="가게이름을 입력해주세요."
              value={shopName}
              onChange={(e) => setShopName(e.target.value)}
              maxLength={20}
            />
            <CharCounter>{shopName.length}/20</CharCounter>
          </InputWrapper>
        </FormSection>

        <FormSection>
          <Label>음식점 위치</Label>
          <InputWrapper>
            <Input
              type="text"
              placeholder="음식점 위치를 입력해주세요."
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              maxLength={50}
            />
            <CharCounter>{location.length}/50</CharCounter>
          </InputWrapper>
        </FormSection>

        <FormSection>
          <Label>영업시간</Label>
          <TimeInputWrapper>
            <TimeInput
              type="time"
              value={hours.start}
              onChange={(e) => setHours({ ...hours, start: e.target.value })}
            />
            <Tilde>~</Tilde>
            <TimeInput type="time" value={hours.end} onChange={(e) => setHours({ ...hours, end: e.target.value })} />
          </TimeInputWrapper>
        </FormSection>

        <FormSection>
          <Label>카테고리</Label>
          <CategoryGrid>
            {CurationData.map((item) => (
              <CategoryItem
                key={item.id}
                onClick={() => handleCategoryClick(item.id)}
                selected={selectedCategories.includes(item.id)}
              >
                <CategoryImage src={item.img} alt={item.name} />
                <CategoryName>{item.name}</CategoryName>
              </CategoryItem>
            ))}
          </CategoryGrid>
        </FormSection>
      </Form>
      <MarginBottom />
      <Button text={'다음'} reverse={true} onClick={handleNextClick}></Button>
    </PageWrapper>
  );
};

export default InputShopInfo;

// --- Styled Components ---

const PageWrapper = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: center;
`;

const Form = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const FormSection = styled.div`
  width: 100%;
`;

const Label = styled.label`
  display: block;
  font-family: 'Pretendard-SemiBold';
  font-size: clamp(1.6rem, 4.5vw, 2rem);
  margin-bottom: 1.2rem;
`;

const InputWrapper = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  height: 5.2rem;
  padding: 0 1.6rem;
  border-radius: 1rem;
  border: 1px solid var(--Gray-scale-3, #d0d0d0);
  background: #fff;
  transition: all 0.2s ease-in-out;

  &:focus-within {
    border-color: #ff7300;
    box-shadow: 0 0 0 2px rgba(255, 115, 0, 0.2);
  }
`;

const Input = styled.input`
  flex: 1;
  width: 100%;
  height: 100%;
  border: none;
  outline: none;
  background-color: transparent;
  font-family: 'Pretendard-Medium';
  font-size: 1.6rem;
  &::placeholder {
    color: #bdbdbd;
  }
`;

const CharCounter = styled.span`
  color: var(--Gray-scale-3, #d0d0d0);
  text-align: right;
  font-family: 'Pretendard-Medium';
  white-space: nowrap;
  padding-left: 1.2rem;
  font-size: 1.3rem;
`;

const TimeInputWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 1.2rem;
`;

const TimeInput = styled.input`
  flex: 1;
  height: 5.2rem;
  padding: 0 1.6rem;
  border-radius: 1rem;
  border: 1px solid var(--Gray-scale-3, #d0d0d0);
  background: #fff;
  transition: all 0.2s ease-in-out;
  font-family: 'Pretendard-Medium';
  outline: none;
  font-size: 1.6rem;
  text-align: center;
  color: #4d4d4d;

  &::-webkit-calendar-picker-indicator {
    display: none;
    -webkit-appearance: none;
  }
`;

const Tilde = styled.span`
  color: #868686;
  font-family: 'Pretendard', sans-serif;
  font-size: 2rem;
  font-family: 'Pretendard-Regular';
`;

const CategoryGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1.6rem 1.2rem;

  /* 768px 이상 태블릿 화면에서는 5열로 변경 */
  @media (min-width: 768px) {
    grid-template-columns: repeat(5, 1fr);
  }
`;
const CategoryItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
  padding: 0.8rem 0.4rem;
  border-radius: 1.2rem;
  border: 2px solid ${(props) => (props.selected ? '#FF7300' : 'transparent')};
  transition: all 0.2s ease-in-out;

  &:hover {
    background-color: #f9f9f9;
  }
`;

const CategoryImage = styled.img`
  width: clamp(5rem, 14vw, 6.5rem);
  height: clamp(5rem, 14vw, 6.5rem);
  border-radius: 50%;
  background-color: #f0f0f0;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.08);
  margin-bottom: 0.8rem;
`;

const CategoryName = styled.span`
  font-size: clamp(1.2rem, 3vw, 1.4rem);
  color: #333;
  text-align: center;
  word-break: keep-all;
`;

const MarginBottom = styled.div`
  height: 10rem;
`;
