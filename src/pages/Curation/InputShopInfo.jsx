// 가게 정보 입력 페이지
// 카테고리 이미지는 public/img 폴더 안에 저장
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import useHeaderStore from '../../stores/headerStore';
import { Button } from '../../components/Button';
import InstructionCard from '../../components/InstructionCard';
// Mock 데이터:
const categories = [
  { name: '한식', img: '/img/category-korean.png' },
  { name: '피자', img: '/img/category-pizza.png' },
  { name: '돈까스', img: '/img/category-porkcutlet.png' },
  { name: '일식', img: '/img/category-japanese.png' },
  { name: '분식', img: '/img/category-snack.png' },
  { name: '치킨', img: '/img/category-chicken.png' },
  { name: '족발/보쌈', img: '/img/category-jokbal.png' },
  { name: '찜/탕', img: '/img/category-steam.png' },
  { name: '구이', img: '/img/category-grill.png' },
  { name: '중식', img: '/img/category-chinese.png' },
  { name: '회/해물', img: '/img/category-sushi.png' },
  { name: '양식', img: '/img/category-western.png' },
  { name: '커피/차', img: '/img/category-cafe.png' },
  { name: '디저트', img: '/img/category-dessert.png' },
  { name: '아시안', img: '/img/category-asian.png' },
  { name: '샐러드', img: '/img/category-salad.png' },
  { name: '버거', img: '/img/category-burger.png' },
  { name: '멕시칸', img: '/img/category-mexican.png' },
  { name: '도시락', img: '/img/category-lunchbox.png' },
  { name: '죽', img: '/img/category-porridge.png' },
];

const InputShopInfo = () => {
  // Header 상태 관리
  const setHeaderConfig = useHeaderStore((state) => state.setHeaderConfig);
  const resetHeaderConfig = useHeaderStore((state) => state.resetHeaderConfig);

  const steps = [
    { number: 1, label: '가게 정보 입력' },
    { number: 2, label: '이미지 업로드' },
    { number: 3, label: '영상스타일 설정' },
  ];

  const activeStep = 1; // 현재 활성화된 스텝

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
  const [selectedCategory, setSelectedCategory] = useState(null);

  const handleNextClick = () => {
    console.log({
      shopName,
      location,
      hours,
      selectedCategory,
    });
    alert('콘솔에서 입력된 정보를 확인하세요!');
  };

  return (
    <PageWrapper>
      <Stepper>
        {steps.map((step, index) => (
          <React.Fragment key={step.number}>
            <Step active={step.number === activeStep}>
              <StepNumber active={step.number === activeStep}>{step.number}</StepNumber>
              {step.label}
            </Step>
            {index < steps.length - 1 && <StepSeparator>----</StepSeparator>}
          </React.Fragment>
        ))}
      </Stepper>

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
            <span>~</span>
            <TimeInput type="time" value={hours.end} onChange={(e) => setHours({ ...hours, end: e.target.value })} />
          </TimeInputWrapper>
        </FormSection>

        <FormSection>
          <Label>카테고리</Label>
          <CategoryGrid>
            {categories.map((cat) => (
              <CategoryItem
                key={cat.name}
                onClick={() => setSelectedCategory(cat.name)}
                selected={selectedCategory === cat.name}
              >
                <CategoryImage src={cat.img} alt={cat.name} />
                <CategoryName>{cat.name}</CategoryName>
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

const Stepper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin-bottom: 1rem;
  color: #cccccc;
  font-weight: bold;
  gap: 0.5rem;
`;

const Step = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem; /* 숫자와 텍스트 사이 간격 */
  color: ${(props) => (props.active ? '#333' : '#cccccc')};
  font-weight: bold;
`;

const StepNumber = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 1.5rem; /* 24px */
  height: 1.5rem; /* 24px */
  border-radius: 50%;
  color: white;
  font-weight: bold;
  font-size: 0.9rem;
  background-color: ${(props) => (props.active ? '#FF7300' : '#cccccc')};
`;

const StepSeparator = styled.span`
  color: #cccccc;
  font-weight: bold;
`;

const InfoBar = styled.div`
  width: 100%;
  background-color: #f2f2f2;
  border-radius: 8px;
  padding: 0.8rem;
  text-align: center;
  font-size: 0.9rem;
  color: #555;
  margin-bottom: 2rem;
  box-sizing: border-box;
`;

const Form = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const FormSection = styled.div`
  width: 100%;
`;

const Label = styled.label`
  font-weight: bold;
  font-size: 1.1rem;
  margin-bottom: 0.75rem;
  display: block;
`;

const InputWrapper = styled.div`
  position: relative;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.8rem;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  font-size: 1rem;
  box-sizing: border-box;

  &::placeholder {
    color: #ccc;
  }
`;

const CharCounter = styled.span`
  position: absolute;
  right: 1rem;
  top: 50%;
  transform: translateY(-50%);
  color: #999;
  font-size: 0.9rem;
`;

const TimeInputWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;

  span {
    color: #999;
    font-size: 1.2rem;
  }
`;

const TimeInput = styled(Input)`
  text-align: center;
`;

const CategoryGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1rem;
`;

const CategoryItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 12px;
  border: 2px solid ${(props) => (props.selected ? '#FF7300' : 'transparent')};
  transition: all 0.2s ease-in-out;

  &:hover {
    background-color: #f0eadd;
  }
`;

const CategoryImage = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.08);
  margin-bottom: 0.75rem;
`;

const CategoryName = styled.span`
  font-size: 0.9rem;
  color: #333;
`;

const MarginBottom = styled.div`
  margin-bottom: 2rem;
`;
