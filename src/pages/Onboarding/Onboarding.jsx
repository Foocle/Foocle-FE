import React, { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import OnboardingData from "./OnboardingData";
import Button from "../../components/Button"; 
import Container from "../../styles/Container.style";

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
            navigate("/")
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
                <Dots>
                    {OnboardingData.map((_, i) => (
                        <Dots key={i} $active={i === index} />
                    ))}
                </Dots>
                <Card_Body>
                    <Card_Body_Title>{data.title}</Card_Body_Title>
                    <Card_Body_Desc>{data.description}</Card_Body_Desc>
                </Card_Body>
                <Button onClick={handleNext} reverse={"true"}>
                    {data.ctaLabel}
                </Button>
            </Card>
        </OnboardingWrapper>
    );
};
 

const OnboardingWrapper = styled.div`
    width: 100%;
    max-width: 600px;
    flex-grow: 1; // 남은 공간 모두 차지
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    /* align-items: center; */
    border: 1px solid black;
`
const SkipHeader = styled.header`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-end;
    padding: 1.3rem 2rem;
`;
const SkipButton = styled.button`
    width: 143px;
    height: 60px;
    border: none;
    border-radius: 10px;
    background-color: #F0F0F0;
    cursor: pointer;

    p {
        font-size: 24px;
        font-family: Pretendard-Medium;
        color: #4D4D4D;
    }
`;
const Body = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 97px;
`
const Image = styled.img`
    width: 100%;
`;
const Card = styled.main`
    height: 363.46px;
    margin-inline: calc(0* 2rem);
    background: #ffffff;
    border: 1px solid red;
    border-radius: 40px 40px 0 0;
    display: grid;
    position: relative;
    overflow: hidden;
    padding: 1rem 2rem 2rem 2rem;
`;
const Dots = styled.span`
  width: 8px;
  height: 8px;
  border-radius: 999px;
  background: ${({ $active }) => ($active ? "#ff8a00" : "#e9d8c8")};
  transition: background 0.2s ease;
`;
const Card_Body = styled.div`
  padding: 20px 24px 28px;
`;

const Card_Body_Title = styled.h2`
  font-size: 20px;
  font-weight: 800;
  color: #262626;
  margin: 8px 0 10px;
`;

const Card_Body_Desc = styled.p`
  font-size: 14px;
  line-height: 1.55;
  color: #6b6b6b;
`;

export default Onboarding;