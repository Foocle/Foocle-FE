// 쇼츠 생성 로딩중 페이지
import { useState, useEffect } from "react";
import { PacmanLoader } from "react-spinners";
import { useNavigate } from "react-router-dom";
// import { FadeLoader } from "react-spinners";
import styled from "styled-components";

const LoadingWrapper = styled.div`
    width: 100%;
    max-width: 600px;
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    box-sizing: border-box;
    overflow: hidden;
    padding: 0 !important;
`;
const Loadingtext = styled.div`
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    padding: clamp(8px, 2vh, 16px) 0;
    p {
        font-size: clamp(16px, 6vw, 25px);;
        font-family: "Pretendard-Medium";
        line-height: 1.6;
        color: #757B80;
    }
    span {
        width: clamp(24px, 8vw, 40px);
        letter-spacing: clamp(4px, 1.5vw, 10px);
        padding-left: clamp(2px, 1vw, 5px);
        line-height: 1.6;
        color: #757B80;
    }
`

const Loading = () => {
    const [dots, setDots] = useState("");
    const navigate = useNavigate();

    // 점(...) 애니메이션
    useEffect(() => {
        const interval = setInterval(() => {
            setDots((prev) => (prev.length < 3 ? prev + "." : ""));
        }, 1000); // 1초 간격
        return () => clearInterval(interval);
    }, []);

    //5초 뒤 쇼츠 완성 페이지로 자동 이동
    useEffect(() => {
        const timer = setTimeout(() => {
            navigate("/videocomplete");
        }, 5000);
        return () => clearTimeout(timer);
    }, [navigate]);

    return (
        <LoadingWrapper>
            <PacmanLoader
                color="#A5A5A5"
            />
            <Loadingtext>
                <p>쇼츠 생성하는 중</p>
                <span>{dots}</span>
            </Loadingtext>
        </LoadingWrapper>
    )
}

export default Loading;