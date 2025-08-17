// 영상 스타일 설정 페이지
import React, { useEffect, useState } from 'react';
import useHeaderStore from '../../stores/headerStore';
import StepperComponent from '../../components/ProgressBar';
import styled, { css } from 'styled-components'; // styled-components import 추가

// 각 섹션의 옵션 데이터를 배열로 관리합니다.
const TONE_OPTIONS = ['표준어', '사투리'];
const VOICE_OPTIONS = ['여성', '남성'];
const SEASON_OPTIONS = ['봄', '여름', '가을', '겨울'];
const TARGET_OPTIONS = ['청소년', 'MZ (2030대)', '직장인', '시니어'];
const STYLE_OPTIONS = [
  '#진근한',
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
  const setHeaderConfig = useHeaderStore((state) => state.setHeaderConfig);
  const resetHeaderConfig = useHeaderStore((state) => state.resetHeaderConfig);
  const activeSteps = [1, 2, 3];

  // 각 선택 항목에 대한 상태(state) 관리
  const [snsType, setSnsType] = useState('instagram');
  const [tone, setTone] = useState('표준어');
  const [voice, setVoice] = useState('여성');
  const [season, setSeason] = useState('봄');
  const [targets, setTargets] = useState(['청소년', 'MZ (2030대)']);
  const [styles, setStyles] = useState(['#진근한', '#트렌디·힙한']);

  // 헤더 설정 useEffect
  useEffect(() => {
    setHeaderConfig({
      showBackButton: true,
      showCloseButton: false,
      title: '영상스타일 설정',
      showCompleteButton: false,
    });
    return () => resetHeaderConfig();
  }, [setHeaderConfig, resetHeaderConfig]);

  // 다중 선택 항목을 처리하는 핸들러 함수
  const handleMultiSelect = (item, selectedItems, setSelectedItems) => {
    if (selectedItems.includes(item)) {
      setSelectedItems(selectedItems.filter((i) => i !== item));
    } else {
      setSelectedItems([...selectedItems, item]);
    }
  };

  return (
    <div>
      <StepperComponent activeSteps={activeSteps} />

      <SettingsForm>
        {/* SNS 종류 섹션 */}
        <SectionWrapper>
          <SectionTitle>SNS 종류</SectionTitle>
          <StyledSelect value={snsType} onChange={(e) => setSnsType(e.target.value)}>
            <option value="instagram">인스타그램</option>
            <option value="youtube">유튜브</option>
            <option value="tiktok">틱톡</option>
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
          <OptionsGrid columns={3} isTagStyle={true}>
            {STYLE_OPTIONS.map((option) => (
              <OptionButton
                key={option}
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
      <SubmitButton>쇼츠 생성하기</SubmitButton>
    </div>
  );
};

export default SetVideoStyle;

// --- Styled Components ---

const rem = (px) => `${px / 16}rem`;

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  background-color: #fffbf5;
  padding: ${rem(20)} ${rem(24)};
  box-sizing: border-box;
`;

const SettingsForm = styled.div`
  flex-grow: 1;
  margin-top: ${rem(30)};
`;

const SectionWrapper = styled.div`
  margin-bottom: ${rem(32)};
`;

const SectionTitle = styled.h2`
  font-size: ${rem(18)};
  font-weight: 700;
  color: #1c1c1c;
  margin: 0 0 ${rem(12)} 0;
  display: flex;
  align-items: center;
`;

const MultiSelectTag = styled.span`
  background-color: #ebf4ff;
  color: #4a90e2;
  font-size: ${rem(11)};
  font-weight: 500;
  padding: ${rem(4)} ${rem(8)};
  border-radius: ${rem(8)};
  margin-left: ${rem(8)};
`;

const StyledSelect = styled.select`
  width: 100%;
  padding: ${rem(16)};
  font-size: ${rem(16)};
  border: 1px solid #eaeaea;
  border-radius: ${rem(12)};
  background-color: #ffffff;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg width='16' height='16' viewBox='0 0 16 16' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M4 6L8 10L12 6' stroke='%23888888' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right ${rem(16)} center;
`;

const OptionsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(${(props) => props.columns}, 1fr);
  gap: ${rem(12)};

  ${(props) =>
    props.isTagStyle &&
    css`
      grid-template-columns: repeat(auto-fill, minmax(${rem(90)}, 1fr));
    `}
`;

const OptionButton = styled.button`
  padding: ${rem(16)} ${rem(10)};
  font-size: ${rem(15)};
  font-weight: 500;
  border-radius: ${rem(12)};
  cursor: pointer;
  transition: background-color 0.2s, border-color 0.2s, color 0.2s;

  background-color: #f8f8f8;
  border: 1px solid #eaeaea;
  color: #888888;

  ${(props) =>
    props.selected &&
    css`
      background-color: #fff0e6;
      border-color: #ffd3b8;
      color: #e57a44;
      font-weight: 700;
    `}
`;

const SubmitButton = styled.button`
  width: 100%;
  padding: ${rem(18)} 0;
  background-color: #ff8a3d;
  color: white;
  border: none;
  border-radius: ${rem(12)};
  font-size: ${rem(17)};
  font-weight: 700;
  cursor: pointer;
  margin-top: auto;

  &:active {
    background-color: #e57a44;
  }
`;
