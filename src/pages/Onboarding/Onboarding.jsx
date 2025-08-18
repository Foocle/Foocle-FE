import React, { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import OnboardingData from "./OnboardingData";
import { Button } from "../../components/Button"; 

const Onboarding = () => {
    const navigate = useNavigate();
    const [index, setIndex] = useState(0)
    const last = OnboardingData.length -1;
    const data = OnboardingData[index];

    const goNext = useCallback(() => {
        setIndex((i) => Math.min(i + 1, last));
    }, [last]);

    const handleNext = useCallback(() => {
        if (index === last) {
            navigate("/loginstart")
        } else {
            goNext();
        }
    }, [index, last, navigate, goNext]);

    const handleSkip = useCallback(() => {
        setIndex(last);
    }, [last]);

    return (
        <OnboardingWrapper>
            <SkipHeader>
                <SkipButton type="button" onClick={handleSkip}>
                    <p>건너뛰기</p>
                </SkipButton>
            </SkipHeader>
            <Body>
                <Image alt={data.title} src={data.image}></Image>
            </Body>
            <Card>
                <DotsWrapper>
                    {OnboardingData.map((_, i) => (
                        <Dots key={i} $active={i === index} />
                    ))}
                </DotsWrapper>
                <CardTitleSection>
                    <CardTitle>{data.title}</CardTitle>
                    <CardDesc>{data.description}</CardDesc>
                </CardTitleSection>
                <Button text={data.ctaLabel} onClick={handleNext} reverse={"true"}/>
            </Card>
        </OnboardingWrapper>
    );
};
 

const OnboardingWrapper = styled.div`
    width: 100%;
    max-width: 600px;
    height: 100vh;
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    position: relative;
    overflow: hidden;
`
const SkipHeader = styled.header`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-end;
    padding: clamp(7px, 4vw, 20px) clamp(10px, 4vw, 30px);
    border-bottom: 1px solid #D0D0D0;
`;
const SkipButton = styled.button`
    width: clamp(60px, 20vw, 90px);
    height: clamp(25px, 9vw, 50px);
    border: none;
    border-radius: 10px;
    background-color: #F0F0F0;
    cursor: pointer;

    p {
        font-size: clamp(10px, 3.5vw, 14px);
        font-family: "Pretendard-Medium";
        color: #4D4D4D;
    }
`;
const Body = styled.div`
    width: 100%;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
`
const Image = styled.img`
    width: 100%;
    max-height: clamp(250px, 45vh, 400px);
    object-fit: contain;
`;
const R = 40;
const Card = styled.main`
    height: clamp(220px, 45vh, 400px);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    position: relative;
    padding: clamp(15px, 5vw, 30px);
    border-radius: ${R}rem ${R}rem 0 0;
    overflow: visible;

    &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: ${R * 2}px;
    border-radius: ${R}px ${R}px 0 0;
    box-shadow: 0 -1px 10px rgba(0, 0, 0, 0.1);
    clip-path: inset(-20px -20px 50% -20px round ${R+4}px ${R+4}px 0 0);
    pointer-events: none;
    }
  
`;
const DotsWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    gap: clamp(3px, 1.3vw, 6px);
`;
const Dots = styled.span`
    width: clamp(30px, 12vw, 50px);
    height: clamp(1.5px, 0.8vw, 3px);
    display: inline-block;
    border-radius: 5px;
    background: ${({ $active }) => ($active ? "#FF7300" : "#FFBF8A8C")};
    transition: background 0.05s ease;
`;
const CardTitleSection = styled.div`
    width: 100%;
    height: clamp(60px, 12vh, 175px);
    padding: 20px 0;
    display: flex;
    flex-direction: column;
    /* gap: 20px; */
    justify-content: space-between;
    text-align: center;
`;
const CardTitle = styled.p`
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: clamp(20px, 7vw, 30px);
    font-family: "Pretendard-SemiBold";
    color: #222222;
    line-height: clamp(20px, 6vw, 30px);
`;

const CardDesc = styled.p`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: clamp(30px, 6vh, 50px);
    font-size: clamp(10px, 4vw, 18px);
    font-family: "Pretendard-Medium";
    line-height: clamp(15px, 6vw, 30px);
    color: #4D4D4D;
    white-space: pre-line; /* \n을 줄바꿈으로 렌더링 */
`;

export default Onboarding;