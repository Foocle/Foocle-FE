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
  //기본값을 빈 배열로 설정
  return (
    <Stepper>
      {steps.map((step, index) => {
        // activeSteps 배열에 현재 단계의 번호가 포함되어 있는지 확인하여 활성화 여부를 결정 (여러개 숫자 받으려고)
        const isActive = activeSteps.includes(step.number);

        return (
          <React.Fragment key={step.number}>
            <Step active={isActive}>
              <StepNumber active={isActive}>{step.number}</StepNumber>
              {step.label}
            </Step>
            {index < steps.length - 1 && <StepSeparator>---</StepSeparator>}
          </React.Fragment>
        );
      })}
    </Stepper>
  );
};
export default StepperComponent;

const Stepper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin-bottom: 0.38rem;
  color: #cccccc;
`;

const Step = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: ${(props) => (props.active ? '#FF7300' : '#cccccc')};
  font-weight: bold;
  font-size: 1.125rem;
  padding: 0.625rem 0.5rem;
`;

const StepNumber = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 1.9375rem;
  height: 1.875rem;
  border-radius: 50%;
  color: white;
  font-weight: bold;
  font-size: 1.125rem;
  background-color: ${(props) => (props.active ? '#FF7300' : '#cccccc')};
`;

const StepSeparator = styled.span`
  color: #cccccc;
  font-weight: bold;
`;
