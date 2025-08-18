// 회원가입 페이지

import { useNavigate } from "react-router-dom"
import React, { useState, useEffect } from "react";
import useHeaderStore from '../../stores/headerStore';
import styled from "styled-components"
import axios from "axios";

export default function Signup () {
    // Header 상태 관리
    const navigate = useNavigate();
    const setHeaderConfig = useHeaderStore((state) => state.setHeaderConfig);
    const resetHeaderConfig = useHeaderStore((state) => state.resetHeaderConfig);
    
    useEffect(() => {
        setHeaderConfig({
            showBackButton: true,
            showCloseButton: false,
            title: "회원가입",
            showCompleteButton: false,
        });
        return () => resetHeaderConfig();
    }, [setHeaderConfig, resetHeaderConfig]);
    
    // 이메일, 패스워드, 패스워드 재확인 상태 관리
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");

    // 버튼 활성화 조건
    const isFormValid = email && password && name;

    const handleSignup = async (e) => {
        e.preventDefault();
        console.log(email, password, name);

        if (!isFormValid) {
            alert("모든 정보를 입력해주세요.");
            return;
        }
    };

    return (
        <SignupWrapper onSubmit={handleSignup}>

                <InputWrapper>
                    <Name>
                        <InputTitle>이름</InputTitle>
                        <input 
                            type="text"
                            placeholder="이름을 입력해주세요."
                            name="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            autoComplete="name" 
                        />
                    </Name>
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
                            autoComplete="new-password"
                        />
                    </Password>
                    {/* <PasswordCheck>
                        <InputTitle>비밀번호 재확인</InputTitle>
                        <input 
                            type="password"
                            placeholder="비밀번호를 다시 입력해주세요."                                
                            name="passwordCheck"
                            value={passwordCheck}
                            onChange={(e) => setPasswordCheck(e.target.value)}
                            autoComplete="new-password"
                        />
                        {passwordCheck && ( // passwordCheck가 입력되었을 때만 표시
                            <p style={{ color: isPasswordMatch ? 'green' : 'red', fontSize: '1.2rem', fontFamily: 'Pretendard-Medium' }}>
                                {isPasswordMatch ? '' : '비밀번호가 일치하지 않습니다.'}
                            </p>
                        )}
                    </PasswordCheck> */}
                </InputWrapper>

                <SignupBtn type="submit" disabled={!isFormValid}>
                    <p>회원가입</p>
                </SignupBtn>

                <AlreadySignup>
                    이미 계정이 있으신가요? <span onClick={() => navigate('/login')}>로그인하기</span>
                </AlreadySignup>

        </SignupWrapper>
    );
}

const SignupWrapper = styled.form`
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

const Name = styled.div`
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
const ID = styled(Name)``;
const Password = styled(Name)``;
// const PasswordCheck = styled(ID)``;

const InputTitle = styled.label`
    font-size: clamp(14px, 3.5vw, 24px);
    font-family: "Pretendard-SemiBold"
`;

const AlreadySignup = styled.a`
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
        cursor: pointer;
    }
`;

const SignupBtn = styled.button`
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