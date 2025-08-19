import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import { getStoreDetails } from '../api/mypage';
import useHeaderStore from '../stores/headerStore';

const StoreDetailPage = () => {
  const { storeId } = useParams();
  const { setHeaderConfig, resetHeaderConfig } = useHeaderStore();
  const [store, setStore] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setHeaderConfig({ showBackButton: true, title: '가게 상세 정보' });
    return () => resetHeaderConfig();
  }, [setHeaderConfig, resetHeaderConfig]);

  useEffect(() => {
    const fetchStoreDetails = async () => {
      try {
        const data = await getStoreDetails(storeId);
        setStore(data.result);
      } catch (err) {
        setError('가게 정보를 불러오는 데 실패했습니다.');
      } finally {
        setIsLoading(false);
      }
    };
    fetchStoreDetails();
  }, [storeId]);

  if (isLoading) return <StatusMessage>로딩 중...</StatusMessage>;
  if (error) return <StatusMessage>{error}</StatusMessage>;
  if (!store) return <StatusMessage>가게 정보가 없습니다.</StatusMessage>;

  return (
    <PageWrapper>
      <InfoSection>
        <StoreName>{store.name}</StoreName>
        <InfoText>
          <strong>주소:</strong> {store.address}
        </InfoText>
        <InfoText>
          <strong>영업시간:</strong> {store.openTime} ~ {store.closeTime}
        </InfoText>
      </InfoSection>

      <MediaSection>
        <SectionTitle>저장된 이미지</SectionTitle>
        <ImageGrid>
          {store.images?.map((image, index) => (
            <ImageItem key={index} src={image.url} alt={`${store.name} 이미지 ${index + 1}`} />
          ))}
        </ImageGrid>
      </MediaSection>

      <MediaSection>
        <SectionTitle>생성된 쇼츠</SectionTitle>
        {store.shorts?.length > 0 ? (
          <ShortsGrid>
            {store.shorts.map((short, index) => (
              <ShortsItem key={index}>
                {/* 비디오 플레이어 컴포넌트나 video 태그 사용 */}
                <video controls src={short.url} width="100%"></video>
              </ShortsItem>
            ))}
          </ShortsGrid>
        ) : (
          <p>생성된 쇼츠가 없습니다.</p>
        )}
      </MediaSection>
    </PageWrapper>
  );
};

export default StoreDetailPage;

// --- Styled Components ---
const PageWrapper = styled.div`
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
  box-sizing: border-box;
`;

const InfoSection = styled.section`
  margin-bottom: 3rem;
  padding-bottom: 2rem;
  border-bottom: 1px solid #e0e0e0;
`;

const StoreName = styled.h1`
  font-family: 'Pretendard-Bold';
  font-size: clamp(1.8rem, 5vw, 2.2rem);
  color: #333;
  margin-bottom: 1.5rem;
`;

const InfoText = styled.p`
  font-family: 'Pretendard-Regular';
  font-size: clamp(1rem, 3.5vw, 1.1rem);
  color: #555;
  line-height: 1.6;
`;

const MediaSection = styled.section`
  margin-bottom: 3rem;
`;

const SectionTitle = styled.h2`
  font-family: 'Pretendard-Bold';
  font-size: clamp(1.5rem, 4.5vw, 1.8rem);
  color: #333;
  margin-bottom: 1.5rem;
`;

const ImageGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: 1rem;
`;

const ImageItem = styled.img`
  width: 100%;
  aspect-ratio: 1 / 1;
  object-fit: cover;
  border-radius: 0.5rem;
`;

const ShortsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 1.5rem;
`;

const ShortsItem = styled.div`
  width: 100%;
  border-radius: 0.5rem;
  overflow: hidden;
`;

const StatusMessage = styled.p`
  text-align: center;
  padding: 4rem 0;
  color: #868e96;
  font-size: 1.1rem;
`;
