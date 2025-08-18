import React, { useState } from 'react';

// 간단한 스타일 객체
const styles = {
  container: {
    maxWidth: '400px',
    margin: '40px auto',
    padding: '20px',
    border: '1px solid #ddd',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    fontFamily: 'sans-serif',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px',
  },
  formGroup: {
    display: 'flex',
    flexDirection: 'column',
  },
  label: {
    marginBottom: '5px',
    fontWeight: 'bold',
  },
  input: {
    padding: '10px',
    border: '1px solid #ccc',
    borderRadius: '4px',
    fontSize: '16px',
  },
  button: {
    padding: '10px 15px',
    border: 'none',
    borderRadius: '4px',
    backgroundColor: '#007bff',
    color: 'white',
    fontSize: '16px',
    cursor: 'pointer',
    marginTop: '10px',
  },
  message: {
    marginTop: '15px',
    padding: '10px',
    borderRadius: '4px',
    textAlign: 'center',
  },
  success: {
    backgroundColor: '#d4edda',
    color: '#155724',
  },
  error: {
    backgroundColor: '#f8d7da',
    color: '#721c24',
  },
};

const SignUpForm = () => {
  // 폼 데이터를 관리하는 state
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
  });

  // API 응답 메시지를 관리하는 state
  const [message, setMessage] = useState('');
  const [isError, setIsError] = useState(false);

  // 입력 필드 값이 변경될 때마다 formData state를 업데이트하는 함수
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // 폼 제출 시 실행될 함수
  const handleSubmit = async (e) => {
    e.preventDefault(); // 폼의 기본 제출 동작(새로고침) 방지
    console.log(formData);
    setMessage(''); // 이전 메시지 초기화
    setIsError(false);

    try {
      const response = await fetch('https://api.refrigerator.asia/api/users/local/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      // API 응답이 성공적이지 않을 경우 에러 처리
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ message: '알 수 없는 오류가 발생했습니다.' }));
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
      }

      // 성공 처리
      const result = await response.json();
      console.log('회원가입 성공:', result);
      setMessage('회원가입이 성공적으로 완료되었습니다! 🎉');
      setIsError(false);
      // 성공 후 폼 데이터 초기화
      setFormData({ email: '', password: '', name: '' });
    } catch (error) {
      // 실패 처리
      console.error('회원가입 실패:', error);
      setMessage(error.message || '회원가입 중 오류가 발생했습니다.');
      setIsError(true);
    }
  };

  return (
    <div style={styles.container}>
      <h2>회원가입</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <div style={styles.formGroup}>
          <label htmlFor="email" style={styles.label}>
            이메일
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            style={styles.input}
          />
        </div>
        <div style={styles.formGroup}>
          <label htmlFor="password" style={styles.label}>
            비밀번호
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            style={styles.input}
          />
        </div>
        <div style={styles.formGroup}>
          <label htmlFor="name" style={styles.label}>
            이름
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            style={styles.input}
          />
        </div>
        <button type="submit" style={styles.button}>
          가입하기
        </button>
      </form>
      {message && <div style={{ ...styles.message, ...(isError ? styles.error : styles.success) }}>{message}</div>}
    </div>
  );
};

export default SignUpForm;
