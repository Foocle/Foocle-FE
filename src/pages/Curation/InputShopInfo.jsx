// 가게 정보 입력 페이지
// 카테고리 이미지는 public/img 폴더 안에 저장

import { useState, useEffect } from 'react';
import styled from 'styled-components';
import useHeaderStore from '../../stores/headerStore';
import { Button } from '../../components/Button';
import InstructionCard from '../../components/InstructionCard';
import { useNavigate } from 'react-router-dom';
import StepperComponent from '../../components/ProgressBar';

// Mock 데이터: 따로 관리하면 좋을듯
const categories = [
  { name: '한식', img: '/public/img/category_gogi.svg' },
  { name: '피자', img: '/img/category_gogi.svg' },
  { name: '돈까스', img: '/img/category_gogi.svg' },
  { name: '일식', img: '/img/category_gogi.svg' },
  { name: '분식', img: '/img/category_gogi.svg' },
  { name: '치킨', img: '/img/category_gogi.svg' },
  { name: '족발/보쌈', img: '/img/category_gogi.svg' },
  { name: '찜/탕', img: '/img/category_gogi.svg' },
  { name: '구이', img: '/img/category_gogi.svg' },
  { name: '중식', img: '/img/category_gogi.svg' },
  { name: '회/해물', img: '/img/category_gogi.svg' },
  { name: '양식', img: '/img/category_gogi.svg' },
  { name: '커피/차', img: '/img/category_gogi.svg' },
  { name: '디저트', img: '/img/category_gogi.svg' },
  { name: '아시안', img: '/img/category_gogi.svg' },
  { name: '샐러드', img: '/img/category_gogi.svg' },
  { name: '버거', img: '/img/category_gogi.svg' },
  { name: '멕시칸', img: '/img/category_gogi.svg' },
  { name: '도시락', img: '/img/category_gogi.svg' },
  { name: '죽', img: '/img/category_gogi.svg' },
];

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
  const [selectedCategory, setSelectedCategory] = useState(null);

  const handleNextClick = () => {
    console.log({
      shopName,
      location,
      hours,
      selectedCategory,
    });
    alert('콘솔에 정보 찍고 다음 페이지로 넘어갑니다');
    navigate('/imageupload');
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

const Form = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 2.5rem;
`;

const FormSection = styled.div`
  width: 100%;
`;

const Label = styled.label`
  font-weight: 600;
  font-size: 1.5rem;
  font-family: Pretendard;
  margin-bottom: 0.75rem;
  display: block;
`;

const InputWrapper = styled.div`
  display: flex;
  position: relative; // 자식 요소의 absolute 포지셔닝 기준
  height: 4.375rem;
  padding: 0.5rem 0.75rem;
  align-items: center;
  border-radius: 0.9375rem;
  border: 2px solid var(--Gray-scale-3, #d0d0d0); // border 임의 변경
  background: #fff;
  transition: border-color 0.2s ease-in-out, box-shadow 0.2s ease-in-out;

  /* 자식 요소(Input)가 포커스되면 InputWrapper의 스타일을 변경합니다. */
  &:focus-within {
    border-color: #ff7300;
  }
`;

const Input = styled.input`
  flex: 1;
  width: 100%;
  height: 100%;
  font-size: 1.5rem;
  box-sizing: border-box;
  border: none;
  outline: none;
  background-color: transparent;
  font-weight: 500;
  margin-right: 0.03rem;
  &::placeholder {
    color: #ccc;
  }
`;

const CharCounter = styled.span`
  color: var(--Gray-scale-2, #4d4d4d);
  text-align: right;

  font-family: Pretendard;
  font-size: 0.875rem;
  font-style: normal;
  font-weight: 500;
  line-height: 1.75rem;
`;

const TimeInputWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
`;

const TimeInput = styled.input`
  flex: 1;
  height: 4.375rem;
  padding: 0 1rem;
  border-radius: 0.9375rem;
  border: 2px solid var(--Gray-scale-3, #d0d0d0);
  background: #fff;
  transition: border-color 0.2s ease-in-out;
  outline: none;
  font-family: 'Pretendard', sans-serif;
  font-size: 1.5rem;
  font-weight: 500;
  text-align: center;
  color: #4d4d4d;

  &:focus {
    border-color: #ff7300;
  }

  &::-webkit-calendar-picker-indicator {
    display: none;
    -webkit-appearance: none;
  }
`;

const Tilde = styled.span`
  color: var(--Gray-scale-2, #4d4d4d);
  font-feature-settings: 'liga' off, 'clig' off;
  font-family: 'Pretendard', sans-serif;
  font-size: 1.54rem;
  font-style: normal;
  font-weight: 400;
  line-height: 2.31rem;
`;
const CategoryGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 0.75rem 1rem;
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
  width: 5rem;
  height: 5rem;
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
  margin-bottom: 5rem;
`;
