// 로그인 api

import axios from "axios";

export const login = async (email, password) => {
  const API_URL = `${import.meta.env.VITE_API_BASE_URL}/api/users/local/login`;
  const data = {
    email: email,
    password: password,
  };

  try {
    const response = await axios.post(API_URL, data, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.error("로그인 API 호출 실패:", error);
    throw error;
  }
};