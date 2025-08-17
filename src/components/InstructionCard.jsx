// 가이드 지시 메시지 (회색 배경에 체크 아이콘과 설명 텍스트가 있는 카드 형태) 컴포넌트
import styled from 'styled-components';
import IconCheck from '../assets/img/icon_check.svg';

const InstructionCard = ({ text }) => {
  return (
    <InfoBar>
      <ContentWrapper>
        {' '}
        <img src={IconCheck} alt="체크 아이콘" />
        <span>{text}</span>
      </ContentWrapper>
    </InfoBar>
  );
};

export default InstructionCard;

// --- Styled Components ---

const InfoBar = styled.div`
  width: 100%;
  background-color: #f0f0f0;
  border-radius: 1.2rem;
  padding: 1.4rem 1.6rem;
  margin-bottom: 1rem;
  box-sizing: border-box;
  color: var(--Gray-scale-4, #868686);
  font-family: 'Pretendard-Medium';
  font-size: clamp(1.1rem, 3vw, 1.2rem);
  line-height: 1.6;
`;

const ContentWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 0.3rem;

  & > img {
    width: 1.4rem;
    height: 1.4rem;
    flex-shrink: 0;
  }
`;
