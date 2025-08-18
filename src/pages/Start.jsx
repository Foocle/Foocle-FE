// 시작 페이지
import styled from 'styled-components';
import LogoText from '../assets/img/logo_text.svg';
import { useNavigate } from 'react-router-dom';

const StartWrapper = styled.div`
    width: 100%;
    max-width: 600px;
    height: 100vh;
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: clamp(10px, 7vw, 30px);
    box-sizing: border-box;
`;
const TitleWrapper = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: clamp(6rem, 45vh, 429px) 0;
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
    margin-top: 3.125rem;
`;
const Description = styled.div`
    font-size: clamp(12px, 5vw, 24px);
    font-family: "Pretendard-SemiBold";
`;
const HighlightText = styled(Description)`
    /* Description 스타일을 상속받아 사용 */
    color: #ff7300;
`;

const Start = () => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate('/onboarding');
    };

    return (
        <StartWrapper onClick={handleClick}>
            <TitleWrapper>
                <TitleLogo src={LogoText} alt="메인 로고 텍스트" />
                <SubtitleSection>
                    <Description>이미지와 텍스트로 만드는</Description>
                    <HighlightText>AI 쇼츠생성 플랫폼</HighlightText>
                </SubtitleSection>
            </TitleWrapper>
        </StartWrapper>
    );
};

export default Start;
