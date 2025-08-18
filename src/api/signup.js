// 회원가입 api
import { useState } from 'react';
import axios from 'axios';

const useSignup = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [data, setData] = useState(null);

    const signup = async (userData) => {
        setIsLoading(true);
        setError(null);
        setData(null);
        
        const API_URL = `${import.meta.env.VITE_API_BASE_URL}/api/users/local/signup`;

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
            console.error("회원가입 실패:", err.response ? err.response.data.message : err.message);
            throw err;
        } finally {
            setIsLoading(false);
        }
    };
    
    return { signup, isLoading, error, data };
};

export default useSignup;