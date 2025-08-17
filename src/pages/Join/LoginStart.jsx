import styled from 'styled-components';
import { Container } from '../../styles/Container.style.js';
import LogoText from '../../assets/img/logo_text.svg';
import KakaoLogo from '../../assets/img/kakao_logo.svg';
import { useNavigate } from 'react-router-dom';

const TitleWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 20.875rem;
`;
const TitleLogo = styled.img`
  width: 100%;
  max-width: 540px;
`;
const SubtitleSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  margin-top: 3.125rem;
`;
const Description = styled.div`
  font-size: 2rem;
  font-family: Pretendard-SemiBold;
`;
const HighlightText = styled(Description)`
  /* Description 스타일을 상속받아 사용 */
  color: #ff7300;
`;
const BtnWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.25rem;
  margin-top: 5.67rem;

  a {
    font-size: 1.125rem;
    font-family: Pretendard-SemiBold;
    color: #4d4d4d;
    padding-top: 0.625rem;
    cursor: pointer;
    text-decoration: none; /* 밑줄 제거 */
  }
`;
const BaseBtn = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 4.375rem;
  border-radius: 0.9375rem;
  cursor: pointer;

  p {
    font-family: Pretendard-Medium;
    font-size: 1.5rem;
  }
`;
const KakaoBtn = styled(BaseBtn)`
  /* BaseBtn 스타일을 상속받아 사용 */
  background-color: #fae100;
  gap: 1.25rem;

  img {
    width: 1.875rem;
    height: 1.73rem;
  }

  p {
    color: #222222;
  }

  &:hover {
    background-color: #fdef73;
  }
`;
const LoginBtn = styled(BaseBtn)`
  /* BaseBtn 스타일을 상속받아 사용 */
  background-color: #f0f0f0;

  p {
    color: #222222;
  }
`;
const SignupBtn = styled(BaseBtn)`
  /* BaseBtn 스타일을 상속받아 사용 */
  background-color: #4d4d4d;

  p {
    color: #ffffff;
  }
`;
const Disclaimer = styled.p`
  width: 100%;
  max-width: 27.875rem;
  text-align: center;
  line-height: 1.75rem;
  margin-top: 1.875rem;
  font-size: 1.125rem;
  font-family: 'Pretendard-SemiBold';
  color: #d0d0d0;
`;

const LoginStart = () => {
  const navigate = useNavigate();
  return (
    <Container>
      <TitleWrapper>
        <TitleLogo src={LogoText} alt="메인 로고 텍스트" />
        <SubtitleSection>
          <Description>이미지와 텍스트로 만드는</Description>
          <HighlightText>AI 쇼츠생성 플랫폼</HighlightText>
        </SubtitleSection>
      </TitleWrapper>
      <BtnWrapper>
        <KakaoBtn>
          <img src={KakaoLogo} alt="카카오 로그인 로고" />
          <p>카카오로 3초 만에 시작하기</p>
        </KakaoBtn>
        <LoginBtn>
          <p>이메일로 로그인하기</p>
        </LoginBtn>
        <SignupBtn>
          <p>회원가입하기</p>
        </SignupBtn>
        <a onClick={() => navigate('/shopinfo')}>비회원으로 시작하기</a>
      </BtnWrapper>
      <Disclaimer>가입을 진행할 경우, 이용약관과 개인정보 수집 및 이용에 대해 동의한 것으로 간주됩니다.</Disclaimer>
    </Container>
  );
};

export default LoginStart;
