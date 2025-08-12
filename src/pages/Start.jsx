// 시작 페이지
import styled from "styled-components";
import { Container } from "../styles/Container.style.js";
import LogoText from "../../public/logo_text.svg";
import { useNavigate } from "react-router-dom"; 

const TitleWrapper = styled.div` 
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: 25rem 0;
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
const HighlightText = styled(Description)`/* Description 스타일을 상속받아 사용 */
    color: #FF7300;
`;

const Start = () => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate("/onboarding");
    };
    
    return (
        <Container>
            <TitleWrapper onClick={handleClick}>
                <TitleLogo src={LogoText} alt="메인 로고 텍스트" />
                <SubtitleSection>
                    <Description>이미지와 텍스트로 만드는</Description>
                    <HighlightText>AI 쇼츠생성 플랫폼</HighlightText>
                </SubtitleSection>
            </TitleWrapper>
        </Container>
    );
};

export default Start;