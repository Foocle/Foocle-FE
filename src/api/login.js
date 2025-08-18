// 로그인 api

import { useState } from "react";
import axios from "axios";

const useLogin = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [data, setData] = useState(null);

    const login = async (email, password) => {
        setIsLoading(true);
        setError(null);
        setData(null);

        const API_URL = `${import.meta.env.VITE_BACKEND_BASE_URL}/api/users/local/login`;
        const userData = {
            email,
            password,
        };

        try {
            const response = await axios.post(API_URL, userData, {
                headers: {
                    "Content-Type": "application/json",
                },
            });
            setData(response.data);
            return response.data;
        } catch (err) {
            setError(err);
            console.error("로그인 API 호출 실패:", err);
            throw err;
        } finally {
            setIsLoading(false);
        }
    };

    return { login, isLoading, error, data };
};

export default useLogin;