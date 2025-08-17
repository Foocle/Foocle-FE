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
`;
const Icon = styled.img`
  height: 2rem;
  width: auto;
  margin-right: 0.5rem;
`;
export const Button = ({ text, icon, onClick, reverse, height, fontSize }) => {
  return (
    <FooterBtn
      onClick={onClick}
      reverse={reverse ? 'true' : 'false'}
      height={height ? height : '4.375rem'}
      fontSize={fontSize ? fontSize : '1.5rem'}
    >
      {icon && <Icon src={icon}></Icon>}
      {text}
    </FooterBtn>
  );
};
