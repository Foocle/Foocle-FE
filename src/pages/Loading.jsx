// 쇼츠 생성 로딩중 페이지
import { useState, useEffect } from "react";
import { PacmanLoader } from "react-spinners";
// import { FadeLoader } from "react-spinners";
import styled from "styled-components";

const LoadingWrapper = styled.div`
    width: 100%;
    max-width: 600px;
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    box-sizing: border-box;
    border: 1px solid black;
    padding: 25rem 0;
`;
const Title = styled.div`
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    padding: 12.31px 0;
    p {
        font-size: 25px;
        font-family: "Pretendard-Medium";
        line-height: 40px;
        color: #757B80;
    }
    span {
        width: 40px;
        letter-spacing: 10px;
        padding-left: 5px;
        line-height: 40px;
        color: #757B80;
    }
`

const Loading = () => {
    const [dots, setDots] = useState("");

    useEffect(() => {
        const interval = setInterval(() => {
            setDots((prev) => (prev.length < 3 ? prev + "." : ""));
        }, 1000); // 1초 간격
        return () => clearInterval(interval);
    }, []);

    return (
        <LoadingWrapper>
            <PacmanLoader
                color="#A5A5A5"
            />
            <Title>
                <p>쇼츠 생성하는 중</p>
                <span>{dots}</span>
            </Title>
        </LoadingWrapper>
    )
}

export default Loading;