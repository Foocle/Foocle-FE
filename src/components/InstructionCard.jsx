// 가이드 지시 메시지 (회색 배경에 체크 아이콘과 설명 텍스트가 있는 카드 형태) 컴포넌트

import styled from 'styled-components';
import IconCheck from '../assets/img/icon_check.svg';
const InstructionCard = ({ text }) => {
  return (
    <InfoBar>
      <Gap>
        <img src={IconCheck} alt="icon_check" />
        {text}
      </Gap>
    </InfoBar>
  );
};

export default InstructionCard;

const InfoBar = styled.div`
  width: 100%;
  background-color: #f2f2f2;
  border-radius: 8px;
  padding: 0.8rem;
  color: #555;
  margin-bottom: 2.5rem;
  box-sizing: border-box;
  color: var(--Gray-scale-5, #868686);
  font-family: Pretendard;
  font-size: 1.125rem;
  font-style: normal;
  font-weight: 600;
  line-height: 1.75rem;
`;

const Gap = styled.div`
  display: flex;
  gap: 0.5rem;
`;
