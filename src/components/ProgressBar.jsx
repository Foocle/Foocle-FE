// 큐레이션 페이지 주황색 진행 상태 표시줄 담당 컴포넌트
// 진행 상태만 담당
import React from 'react';
import styled from 'styled-components';

const steps = [
  { number: 1, label: '가게 정보 입력' },
  { number: 2, label: '이미지 업로드' },
  { number: 3, label: '영상스타일 설정' },
];

const StepperComponent = ({ activeSteps = [] }) => {
  return (
    <Stepper>
      {steps.map((step, index) => {
        const isActive = activeSteps.includes(step.number);

        return (
          <React.Fragment key={step.number}>
            <Step active={isActive}>
              <StepNumber active={isActive}>{step.number}</StepNumber>
              <StepLabel>{step.label}</StepLabel>
            </Step>
            {index < steps.length - 1 && <StepSeparator active={isActive}>----</StepSeparator>}
          </React.Fragment>
        );
      })}
    </Stepper>
  );
};

export default StepperComponent;

// --- Styled Components ---

const Stepper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 1.2rem 0;
`;

const Step = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.8rem;
  color: ${(props) => (props.active ? '#FF7300' : '#FFBF8A8C')};
  text-align: center;
  font-family: 'Pretendard-SemiBold';
`;

const StepNumber = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2.2rem;
  height: 2.2rem;
  border-radius: 50%;
  color: white;
  font-size: 1.3rem;
  background-color: ${(props) => (props.active ? '#FF7300' : '#FFBF8A8C')};
  transition: background-color 0.3s ease;
  font-family: 'Pretendard-Bold';
`;

const StepLabel = styled.span`
  font-size: clamp(1.1rem, 3vw, 1.3rem);
  white-space: nowrap;
`;

const StepSeparator = styled.span`
  flex-grow: 1;
  text-align: center;
  color: #FF9B4A;
  transition: color 0.3s ease;
  font-family: 'Pretendard-SemiBold';
  font-size: 1.8rem;
  margin: 0 1rem;
`;
