// // 이미지 추가, 텍스트 입력 필드 카드 컴포넌트
// // 이미지 업로드 컴포넌트(Curation/ImageUpload)에 여러 번 사용될거임
import React, { useRef, useState, useEffect } from 'react';
import styled from 'styled-components';
import IconTrash from '../assets/img/icon_trashcan.svg';
import IconPlus from '../assets/img/icon_plus.svg';

const ImageUploaderCard = ({ title, cardData, onUpdate, onDelete, icon, isUploading, error }) => {
  const fileInputRef = useRef(null);
  const [description, setDescription] = useState(cardData.description || '');
  const [debounceTimer, setDebounceTimer] = useState(null);

  // 이미지 파일이 변경되면 즉시 onUpdate 호출
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      onUpdate({
        ...cardData,
        imageFile: file,
        preview: URL.createObjectURL(file),
        description,
      });
    }
  };

  // 설명이 변경될 때 호출 (디바운싱 적용)
  const handleDescriptionChange = (e) => {
    const newDescription = e.target.value;
    setDescription(newDescription);

    // 기존 타이머 클리어
    if (debounceTimer) {
      clearTimeout(debounceTimer);
    }

    // 500ms 후 onUpdate 호출
    const newTimer = setTimeout(() => {
      onUpdate({
        ...cardData,
        imageFile: cardData.imageFile,
        preview: cardData.preview,
        description: newDescription,
      });
    }, 500); // 0.5초 디바운스

    setDebounceTimer(newTimer);
  };

  useEffect(() => {
    return () => {
      if (debounceTimer) {
        clearTimeout(debounceTimer);
      }
    };
  }, [debounceTimer]);

  const triggerFileSelect = () => {
    fileInputRef.current.click();
  };

  const { preview } = cardData || {};

  return (
    <SectionWrapper>
      {title && <Title>{title}</Title>}
      <CardWrapper>
        <UploadArea>
          <ImagePreview onClick={!preview ? triggerFileSelect : undefined}>
            {preview ? (
              <StyledImage src={preview} alt="Preview" />
            ) : (
              <UploadPlaceholder>
                <img src={icon || IconPlus} alt="사진 추가" />
                <span>사진 추가</span>
              </UploadPlaceholder>
            )}
            {isUploading && (
              <Overlay>
                <span>업로드 중...</span>
              </Overlay>
            )}
            {error && (
              <Overlay $error>
                <span>업로드 실패</span>
              </Overlay>
            )}
          </ImagePreview>
          <HiddenInput type="file" accept="image/*" ref={fileInputRef} onChange={handleImageChange} />
        </UploadArea>
        <DescriptionInputWrapper>
          <DescriptionInput
            type="text"
            placeholder="위 사진에 대한 설명을 적어주세요."
            value={description}
            onChange={handleDescriptionChange}
            maxLength={50}
          />
          <CharCounter>{description.length}/50</CharCounter>
        </DescriptionInputWrapper>
        <Footer>
          <DeleteButton onClick={onDelete}>
            <img src={IconTrash} alt="삭제하기" />
            <span>삭제하기</span>
          </DeleteButton>
        </Footer>
      </CardWrapper>
    </SectionWrapper>
  );
};

export default ImageUploaderCard;

// --- Styled Components ---
const SectionWrapper = styled.div`
  width: 100%;
`;
const Title = styled.h3`
  font-family: 'Pretendard-SemiBold';
  font-size: clamp(1.8rem, 5vw, 2.2rem);
  margin-bottom: 1.2rem;
`;
const CardWrapper = styled.div`
  background-color: #f0f0f0;
  border-radius: 1.2rem;
  padding: 1.6rem;
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
`;
const UploadArea = styled.div`
  position: relative;
`;
const ImagePreview = styled.div`
  position: relative;
  width: clamp(11rem, 30vw, 15rem);
  height: clamp(11rem, 30vw, 15rem);
  border-radius: 1rem;
  background-color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  overflow: hidden;
  border: 1px solid #e0e0e0;
`;
const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: ${(props) => (props.$error ? 'rgba(255, 0, 0, 0.5)' : 'rgba(0, 0, 0, 0.5)')};
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.4rem;
  font-family: 'Pretendard-SemiBold';
`;
const UploadPlaceholder = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.8rem;
  color: #868686;
  font-size: clamp(1.2rem, 3vw, 1.4rem);
`;
const StyledImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;
const HiddenInput = styled.input`
  display: none;
`;
const DescriptionInputWrapper = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: 5.2rem;
  padding: 0 1.2rem;
  background-color: #fff;
  border-radius: 1rem;
  border: 1px solid #e0e0e0;
  box-sizing: border-box;
  &:focus-within {
    border-color: #ff7300;
  }
`;
const DescriptionInput = styled.input`
  flex: 1;
  border: none;
  outline: none;
  background-color: transparent;
  font-size: 1.5rem;
  &::placeholder {
    color: #bdbdbd;
  }
`;
const CharCounter = styled.span`
  color: #999;
  font-size: 1.3rem;
  padding-left: 1.2rem;
`;
const Footer = styled.div`
  display: flex;
  justify-content: flex-end;
`;
const DeleteButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.4rem;
  background: none;
  border: none;
  cursor: pointer;
  color: #868686;
  font-size: 1.3rem;
  & > img {
    width: 1.4rem;
  }
`;
