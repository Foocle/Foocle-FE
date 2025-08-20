import styled from 'styled-components';

const FooterBtn = styled.button`
  display: flex;
  width: 100%;
  height: ${(props) => props.height};
  text-align: center;
  align-items: center;
  justify-content: center;
  font-family: 'Pretendard-SemiBold';
  font-size: ${(props) => props.fontSize};
  color: ${(props) => (props.reverse == 'true' ? '#FFFFFF' : '#FF9B4A')};
  background-color: ${(props) => (props.reverse == 'true' ? '#FF7300' : '#FFBF8A8C')};
  border: none;
  border-radius: 0.9375rem;
  cursor: pointer;
  &:disabled {
    background-color: #e0e0e0; /* 비활성화 시 배경색 */
    color: #9e9e9e; /* 비활성화 시 글자색 */
    border-color: #e0e0e0; /* 비활성화 시 테두리색 */
    cursor: not-allowed; /* 커서 모양 변경 */
    opacity: 1; /* hover 효과 덮어쓰기 */
  }

  & > img {
    width: 2rem;
    height: 2rem;
  }
`;
const Icon = styled.img`
  height: 2rem;
  width: auto;
  margin-right: 0.5rem;
`;
export const Button = ({ text, icon, onClick, reverse, height, fontSize, disabled }) => {
  return (
    <FooterBtn
      onClick={onClick}
      reverse={reverse ? 'true' : 'false'}
      height={height ? height : '4.375rem'}
      fontSize={fontSize ? fontSize : '1.5rem'}
      disabled={disabled}
    >
      {icon && <Icon src={icon}></Icon>}
      {text}
    </FooterBtn>
  );
};
