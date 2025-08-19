import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { getMyStores } from '../api/mypage';
import { Button } from '../components/Button';
import IconPlus from '../assets/img/icon_plus.svg';
import useHeaderStore from '../stores/headerStore';
import useAuthStore from '../stores/authStore';
import IconMyPage from '../assets/img/icon_profile.svg';

const MyPage = () => {
  const setHeaderConfig = useHeaderStore((state) => state.setHeaderConfig);
  const resetHeaderConfig = useHeaderStore((state) => state.resetHeaderConfig);
  const navigate = useNavigate();
  const [stores, setStores] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const { email, name, logout } = useAuthStore();

  useEffect(() => {
    setHeaderConfig({ showBackButton: true, title: '마이페이지' });
    return () => resetHeaderConfig();
  }, [setHeaderConfig, resetHeaderConfig]);

  useEffect(() => {
    const fetchStores = async () => {
      try {
        const data = await getMyStores();
        setStores(data.result || []);
      } catch (err) {
        setError('가게 목록을 불러오는 데 실패했습니다.');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchStores();
  }, []);

  const handleRegisterClick = () => {
    navigate('/shopinfo');
  };

  const handleStoreClick = (storeId) => {
    navigate(`/store/${storeId}`);
  };

  return (
    <PageWrapper>
      <ProfileSection>
        <ProfileIcon src={IconMyPage} alt="My Page Icon" />
        <UserInfo>
          <UserName>{name || '사용자'}</UserName>
          <UserEmail>{email}</UserEmail>
        </UserInfo>
      </ProfileSection>

      <StoreSection>
        <Header>
          <Button icon={IconPlus} text={'가게 등록하기'} onClick={handleRegisterClick} reverse={true} />
        </Header>
        <Title>가게 목록</Title>

        {isLoading && <StatusMessage>로딩 중...</StatusMessage>}
        {error && <StatusMessage>{error}</StatusMessage>}

        {!isLoading && !error && (
          <StoreList>
            {stores.length > 0 ? (
              stores.map((store) => (
                <StoreItem key={store.id} onClick={() => handleStoreClick(store.id)}>
                  <StoreName>{store.name}</StoreName>
                  <StoreAddress>{store.address}</StoreAddress>
                </StoreItem>
              ))
            ) : (
              <StatusMessage>등록된 가게가 없습니다.</StatusMessage>
            )}
          </StoreList>
        )}
      </StoreSection>
    </PageWrapper>
  );
};

export default MyPage;

// --- Styled Components ---

const PageWrapper = styled.div`
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const ProfileSection = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem 0 4rem;
  gap: 1.5rem;
`;

const ProfileIcon = styled.img`
  width: clamp(80px, 20vw, 100px);
  height: clamp(80px, 20vw, 100px);
  border-radius: 50%;
  background-color: #f0f0f0;
`;

const UserInfo = styled.div`
  text-align: center;
`;

const UserName = styled.p`
  font-family: 'Pretendard-Bold';
  font-size: clamp(1.2rem, 4vw, 1.5rem);
  color: #333;
  margin-bottom: 0.5rem;
`;

const UserEmail = styled.p`
  font-family: 'Pretendard-Regular';
  font-size: clamp(0.9rem, 3vw, 1rem);
  color: #868e96;
`;

const StoreSection = styled.section`
  flex: 1;
`;

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2.5rem;
  padding-bottom: 1.5rem;
  border-bottom: 1px solid #e0e0e0;
`;

const Title = styled.h1`
  font-family: 'Pretendard-Bold';
  font-size: clamp(1.5rem, 5vw, 1.8rem);
  color: #333;
  margin-bottom: 1.5rem;
`;

const StoreList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const StoreItem = styled.div`
  background-color: #f8f9fa;
  padding: 1.5rem 2rem;
  border-radius: 1rem;
  border: 1px solid #e9ecef;
  transition: transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out;
  cursor: pointer;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  }
`;

const StoreName = styled.h2`
  font-family: 'Pretendard-SemiBold';
  font-size: clamp(1.2rem, 4vw, 1.4rem);
  color: #212529;
  margin-bottom: 0.5rem;
`;

const StoreAddress = styled.p`
  font-family: 'Pretendard-Regular';
  font-size: clamp(0.9rem, 3vw, 1rem);
  color: #868e96;
`;

const StatusMessage = styled.p`
  text-align: center;
  padding: 4rem 0;
  color: #868e96;
  font-size: 1.1rem;
`;
