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
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    border: 1px solid black;
    position: relative;
    overflow: hidden;
`
const SkipHeader = styled.header`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-end;
    padding: 1.3rem 2rem;
    border-bottom: 1px solid #D0D0D0;
`;
const SkipButton = styled.button`
    width: 9rem;
    height: 3.75rem;
    border: none;
    border-radius: 10px;
    background-color: #F0F0F0;
    cursor: pointer;

    p {
        font-size: 1.5rem;
        font-family: "Pretendard-Medium";
        color: #4D4D4D;
    }
`;
const Body = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 6rem 0 2.5rem 0;
`
const Image = styled.img`
    width: 100%;
`;
const R = 40;
const Card = styled.main`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    position: relative;
    padding: 1.5rem 2rem 2rem 2rem;
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
    gap: 0.5rem;
    justify-content: center;
    align-items: center;
`;
const Dots = styled.span`
    width: 4.375rem;
    height: 0.25rem;
    display: inline-block;
    border-radius: 0.3125rem;
    background: ${({ $active }) => ($active ? "#FF7300" : "#FFBF8A8C")};
    transition: background 0.05s ease;
`;
const CardTitleSection = styled.div`
    width: 100%;
    height: 10.75rem;
    padding: 1.875rem 0;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    text-align: center;
`;
const CardTitle = styled.p`
    font-size: 2.6rem;
    font-family: "Pretendard-SemiBold";
    color: #222222;
    line-height: 3.1rem;
`;

const CardDesc = styled.p`
    width: 100%;
    height: 5rem;
    font-size: 1.5rem;
    font-family: "Pretendard-Medium";
    line-height: 2.5rem;
    color: #4D4D4D;
    white-space: pre-line; /* \n을 줄바꿈으로 렌더링 */
`;

export default Onboarding;