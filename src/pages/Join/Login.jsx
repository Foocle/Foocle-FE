// 로그인 페이지
import { useNavigate } from "react-router-dom"
import React, { useState, useEffect } from "react";
import useHeaderStore from '../../stores/headerStore';
import styled from "styled-components"
import axios from "axios";

export default function Login () {
    // Header 상태 관리
    const navigate = useNavigate();
    const setHeaderConfig = useHeaderStore((state) => state.setHeaderConfig);
    const resetHeaderConfig = useHeaderStore((state) => state.resetHeaderConfig);
    
    useEffect(() => {
        setHeaderConfig({
            showBackButton: true,
            showCloseButton: false,
            title: "로그인",
            showCompleteButton: false,
        });
        return () => resetHeaderConfig();
    }, [setHeaderConfig, resetHeaderConfig]);
    
    // 이메일, 패스워드 상태 관리
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async (e) => {
        e.preventDefault();
        console.log(email, password);
    };

    return (
        <LoginWrapper onSubmit={handleLogin}>

                <InputWrapper>
                    <ID>
                        <InputTitle>이메일</InputTitle>
                        <input 
                            type="email"
                            placeholder="이메일을 입력해주세요."
                            name="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            autoComplete="username"                            />
                    </ID>
                    <Password>
                        <InputTitle>비밀번호</InputTitle>
                        <input 
                            type="password"
                            placeholder="비밀번호를 입력해주세요."                                
                            name="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            autoComplete="current-password"
                        />
                    </Password>
                </InputWrapper>

                <ForgotPassword
                    href="#"
                    onClick={(e) => {
                        e.preventDefault();
                        alert("비밀번호 찾기는 구현되지 않았습니다.")
                    }}
                >
                    비밀번호를 잊으셨나요? <span>비밀번호 찾기</span>
                </ForgotPassword>

                <LoginBtn type="submit" disabled={!email || !password}>
                    <p>로그인</p>
                </LoginBtn>
        </LoginWrapper>
    );
}

const LoginWrapper = styled.form`
    width: 100%;
    max-width: 540px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: clamp(16px, 7vw, 30px);
    margin-top: 2rem;
`;
const InputWrapper = styled.div`
    width: 100%;
    max-width: 540px;
    display: flex;
    flex-direction: column;
    gap: clamp(16px, 7vw, 30px);
`;

const ID = styled.div`
    display: flex;
    flex-direction: column;
    gap: clamp(8px, 3vw, 12px);

    input {
        padding: clamp(10px, 3vw, 15px) clamp(10px, 2.7vw, 12px);
        border: 1.54px solid #D0D0D0;
        border-radius: 15px;
        outline: none;
        font-size: clamp(14px, 4vw, 16px);
        background-color: #FFFFFF;
    }

    input::placeholder {
        color: #D0D0D0;
    }
`;
const Password = styled(ID)``;
const InputTitle = styled.label`
    font-size: clamp(14px, 3.5vw, 24px);
    font-family: "Pretendard-SemiBold"
`;

const ForgotPassword = styled.a`
    font-size: clamp(14px, 3.5vw, 24px);
    font-family: "Pretendard-SemiBold";
    color: #868686;
    text-decoration: none;

    span {
        margin-left: 0.5rem;
        font-size: clamp(14px, 3.5vw, 24px);
        font-family: "Pretendard-SemiBold";
        color: #D0D0D0;
        border-bottom: 1px solid #D0D0D0;
    }
`;

const LoginBtn = styled.button`
    width: 100%;
    max-width: 540px;
    height: clamp(40px, 12.5vw, 55px);
    border: none;
    border-radius: 8px;
    background-color: ${({ disabled }) => (disabled ? "#D0D0D0" : "#FF7300")};
    cursor: pointer;
    
    &:disabled {
        cursor: not-allowed;
    }

    p {
        font-size: clamp(18px, 2.5vw, 24px);
        font-family: "Pretendard-SemiBold";
        color: #FFFFFF;
    }
`;