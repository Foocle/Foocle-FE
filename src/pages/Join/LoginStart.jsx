import styled from 'styled-components';
import LogoText from '../../assets/img/logo_text.svg';
import KakaoLogo from '../../assets/img/kakao_logo.svg';
import { useNavigate } from 'react-router-dom';

const StartWrapper = styled.div`
  width: 100%;
  max-width: 600px;
  height: 100vh;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  padding: clamp(10px, 7vw, 30px);
  box-sizing: border-box;
`;
const TitleWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: clamp(60px, 23vh, 208px);
`;
const TitleLogo = styled.img`
  width: 100%;
  max-width: 540px;
`;
const SubtitleSection = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
  gap: clamp(1px, 0.5vw, 3px);
  margin-top: 3rem;
`;
const Description = styled.div`
  font-size: clamp(12px, 5vw, 24px);
  font-family: 'Pretendard-SemiBold';
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
  gap: clamp(10px, 3vw, 30px);
  margin-top: clamp(30px, 5.5vh, 50px);

  a {
    font-size: clamp(9px, 3.5vw, 15px);
    font-family: 'Pretendard-SemiBold';
    color: #4d4d4d;
    cursor: pointer;
    text-decoration: none; /* 밑줄 제거 */
  }
`;
const BaseBtn = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: clamp(30px, 11vw, 45px);
  border-radius: 0.9rem;
  cursor: pointer;

  p {
    font-family: Pretendard-Medium;
    font-size: clamp(1rem, 4vw, 1.5rem);
  }
`;
const KakaoBtn = styled(BaseBtn)`
  /* BaseBtn 스타일을 상속받아 사용 */
  background-color: #fae100;
  gap: 1.25rem;

  img {
    height: 1.7rem;
    width: clamp(10px, 5vw, 20px);
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
  max-width: 278px;
  text-align: center;
  line-height: clamp(12px, 4vw, 17px);
  /* margin: 1.875rem 0 30px 0; */
  margin-top: clamp(10px, 2.5vh, 30px);
  font-size: clamp(7px, 3vw, 15px);
  font-family: 'Pretendard-SemiBold';
  color: #d0d0d0;
`;

const LoginStart = () => {
  const navigate = useNavigate();
  // 1. 버튼 눌러 카카오 로그인 화면 띄우기
  const REST_API_KEY = import.meta.env.VITE_KAKAO_API_KEY;
  const REDIRECT_URI = import.meta.env.VITE_REDIRECT_URI_KAKAO;
  // 카카오에서 제공하는 로그인 화면 링크
  const KAKAO_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;

  const KakaoLogin = () => {
    window.location.href = KAKAO_URL;
  };
  console.log(KAKAO_URL);

  return (
    <StartWrapper>
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
          <p onClick={KakaoLogin}>카카오로 3초 만에 시작하기</p>
        </KakaoBtn>
        <LoginBtn>
          <p onClick={() => navigate('/login')}>이메일로 로그인하기</p>
        </LoginBtn>
        <SignupBtn>
          <p onClick={() => navigate('/signup')}>회원가입하기</p>
        </SignupBtn>
        <a onClick={() => navigate('/shopinfo')}>비회원으로 시작하기</a>
      </BtnWrapper>
      <Disclaimer>가입을 진행할 경우, 이용약관과 개인정보 수집 및 이용에 대해 동의한 것으로 간주됩니다.</Disclaimer>
    </StartWrapper>
  );
};

export default LoginStart;
