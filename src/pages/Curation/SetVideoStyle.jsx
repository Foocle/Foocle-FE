// 영상 스타일 설정 페이지
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useHeaderStore from '../../stores/headerStore';
import StepperComponent from '../../components/ProgressBar';
import styled, { css } from 'styled-components';
import { Button } from '../../components/Button';
// 섹션 옵션 데이터
const TONE_OPTIONS = ['표준어', '사투리'];
const VOICE_OPTIONS = ['여성', '남성'];
const SEASON_OPTIONS = ['봄', '여름', '가을', '겨울'];
const TARGET_OPTIONS = ['청소년', 'MZ (2030대)', '직장인', '시니어'];
const STYLE_OPTIONS = [
  '#친근한',
  '#편안한',
  '#전통적',
  '#프리미엄',
  '#고급스러운',
  '#건강·웰빙',
  '#트렌디·힙한',
  '#코미디',
  '#자연 친화적',
];

const SetVideoStyle = () => {
  const navigate = useNavigate();
  const setHeaderConfig = useHeaderStore((state) => state.setHeaderConfig);
  const resetHeaderConfig = useHeaderStore((state) => state.resetHeaderConfig);
  const activeSteps = [1, 2, 3];

  // 선택 항목
  const [snsType, setSnsType] = useState('instagram');
  const [tone, setTone] = useState('표준어');
  const [voice, setVoice] = useState('여성');
  const [season, setSeason] = useState('봄');
  const [targets, setTargets] = useState(['청소년', '시니어']);
  const [styles, setStyles] = useState(['#친근한', '#편안한', '#트렌디·힙한']);

  // 헤더 설정
  useEffect(() => {
    setHeaderConfig({
      showBackButton: true,
      showCloseButton: false,
      title: '영상스타일 설정',
      showCompleteButton: false,
    });
    return () => resetHeaderConfig();
  }, [setHeaderConfig, resetHeaderConfig]);

  // 다중 선택 항목
  const handleMultiSelect = (item, selectedItems, setSelectedItems) => {
    const newSelection = selectedItems.includes(item)
      ? selectedItems.filter((i) => i !== item)
      : [...selectedItems, item];
    setSelectedItems(newSelection);
  };

  return (
    <PageWrapper>
      <StepperComponent activeSteps={activeSteps} />

      <SettingsForm>
        {/* SNS 종류 섹션 */}
        <SectionWrapper>
          <SectionTitle>SNS 종류</SectionTitle>
          <StyledSelect value={snsType} onChange={(e) => setSnsType(e.target.value)}>
            <option value="instagram">인스타그램</option>
            <option value="kakao">카카오톡</option>
            <option value="naver">네이버 블로그</option>
          </StyledSelect>
        </SectionWrapper>

        {/* 말투 섹션 */}
        <SectionWrapper>
          <SectionTitle>말투</SectionTitle>
          <OptionsGrid columns={2}>
            {TONE_OPTIONS.map((option) => (
              <OptionButton key={option} selected={tone === option} onClick={() => setTone(option)}>
                {option}
              </OptionButton>
            ))}
          </OptionsGrid>
        </SectionWrapper>

        {/* 목소리(TTS) 섹션 */}
        <SectionWrapper>
          <SectionTitle>목소리(TTS)</SectionTitle>
          <OptionsGrid columns={2}>
            {VOICE_OPTIONS.map((option) => (
              <OptionButton key={option} selected={voice === option} onClick={() => setVoice(option)}>
                {option}
              </OptionButton>
            ))}
          </OptionsGrid>
        </SectionWrapper>

        {/* 계절감 섹션 */}
        <SectionWrapper>
          <SectionTitle>계절감</SectionTitle>
          <OptionsGrid columns={2}>
            {' '}
            {SEASON_OPTIONS.map((option) => (
              <OptionButton key={option} selected={season === option} onClick={() => setSeason(option)}>
                {option}
              </OptionButton>
            ))}
          </OptionsGrid>
        </SectionWrapper>

        {/* 타겟층 섹션 */}
        <SectionWrapper>
          <SectionTitle>
            타겟층
            <MultiSelectTag>복수선택 가능</MultiSelectTag>
          </SectionTitle>
          <OptionsGrid columns={2}>
            {TARGET_OPTIONS.map((option) => (
              <OptionButton
                key={option}
                selected={targets.includes(option)}
                onClick={() => handleMultiSelect(option, targets, setTargets)}
              >
                {option}
              </OptionButton>
            ))}
          </OptionsGrid>
        </SectionWrapper>

        {/* 영상 스타일 섹션 */}
        <SectionWrapper>
          <SectionTitle>
            영상 스타일
            <MultiSelectTag>복수선택 가능</MultiSelectTag>
          </SectionTitle>
          <OptionsGrid isTagStyle={true}>
            {' '}
            {/* isTagStyle prop으로 스타일 분기 */}
            {STYLE_OPTIONS.map((option) => (
              <OptionButton
                key={option}
                isTagStyle={true}
                selected={styles.includes(option)}
                onClick={() => handleMultiSelect(option, styles, setStyles)}
              >
                {option}
              </OptionButton>
            ))}
          </OptionsGrid>
        </SectionWrapper>
      </SettingsForm>

      {/* 쇼츠 생성하기 버튼 */}
      <Button text={'쇼츠 생성하기'} onClick={() => navigate('/loading')} reverse={true}></Button>
    </PageWrapper>
  );
};

export default SetVideoStyle;

// --- Styled Components ---

const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const SettingsForm = styled.div`
  flex-grow: 1;
  margin-top: 2.4rem;
`;

const SectionWrapper = styled.div`
  margin-bottom: 3.2rem;
`;

const SectionTitle = styled.h2`
  display: flex;
  align-items: center;
  color: #1c1c1c;
  font-family: 'Pretendard-Bold';
  margin: 0 0 1.2rem 0;
  font-size: clamp(1.8rem, 5vw, 2rem);
`;

const MultiSelectTag = styled.span`
  background-color: #eaf2ff;
  color: #4a75e2;
  font-family: 'Pretendard-Medium';
  padding: 0.4rem 0.8rem;
  border-radius: 0.8rem;
  margin-left: 0.8rem;
  font-size: clamp(1.1rem, 3vw, 1.2rem);
`;

const StyledSelect = styled.select`
  width: 100%;
  padding: 1.4rem 4rem 1.4rem 1.6rem;
  font-family: 'Pretendard', sans-serif;
  border: 1px solid #e0e0e0;
  border-radius: 1.2rem;
  background-color: #ffffff;
  color: #333;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  font-size: clamp(1.5rem, 4vw, 1.6rem);

  /* 기본 화살표 숨기기 */
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;

  /* 커스텀 화살표 아이콘 */
  background-image: url("data:image/svg+xml,%3Csvg width='16' height='16' viewBox='0 0 16 16' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M4 6L8 10L12 6' stroke='%23888888' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 1.6rem center;
`;

const OptionsGrid = styled.div`
  display: grid;
  /* isTagStyle이 아닐 때만 columns prop 사용 */
  grid-template-columns: repeat(${(props) => (props.isTagStyle ? '1' : props.columns || '2')}, 1fr);
  gap: 1.2rem;

  /* isTagStyle일 때 태그 레이아웃 적용 */
  ${(props) =>
    props.isTagStyle &&
    css`
      display: flex;
      flex-wrap: wrap;
      gap: 1rem;
    `}
`;

const OptionButton = styled.button`
  padding: 1.6rem 1rem;
  font-family: 'Pretendard-Medium';
  border-radius: 1.2rem;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  background-color: #f8f8f8;
  border: 1px solid #eaeaea;
  color: #4d4d4d;
  font-family: 'Pretendard', sans-serif;
  font-size: clamp(1.5rem, 4vw, 1.6rem);

  ${(props) =>
    props.selected &&
    css`
      background-color: rgba(255, 191, 138, 0.55);
      color: #ff7300;
    `}

  ${(props) =>
    props.isTagStyle &&
    css`
      width: auto;
      border-radius: 2rem;
      padding: 0.8rem 1.6rem;
      font-size: clamp(1.3rem, 3.5vw, 1.4rem);
      background-color: #f5f5f5;
      color: #d0d0d0;

      /* 태그 선택 시 스타일 */
      ${props.selected &&
      css`
        background-color: #ffe8d9;
        color: #ff7300;
      `}
    `}
`;
