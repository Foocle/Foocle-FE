// // 이미지 추가, 텍스트 입력 필드 카드 컴포넌트
// // 이미지 업로드 컴포넌트(Curation/ImageUpload)에 여러 번 사용될거임

import React, { useState, useRef } from 'react';
import styled from 'styled-components';
import IconTrash from '../assets/img/icon_trashcan.svg';
import IconPlus from '../assets/img/icon_plus.svg';

const ImageUploaderCard = ({ title, cardData, onUpdate, onDelete, icon }) => {
  const fileInputRef = useRef(null);

  // 이미지나 파일이 변경되면 부모의 onUpdate 함수를 호출합니다.
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      onUpdate({
        file: file, // 실제 파일 객체 저장
        preview: URL.createObjectURL(file), // 미리보기 URL 저장
      });
    }
  };

  const handleDescriptionChange = (e) => {
    const text = e.target.value;
    if (text.length <= 50) {
      // 글자 수 50으로 수정
      onUpdate({ description: text });
    }
  };

  const triggerFileSelect = () => {
    fileInputRef.current.click();
  };
  const { preview, description = '' } = cardData || {};
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
  color: #333;
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
  flex-shrink: 0;
`;

const ImagePreview = styled.div`
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

const UploadPlaceholder = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: #868686;
  gap: 0.8rem;
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
  transition: all 0.2s ease-in-out;

  &:focus-within {
    border-color: #ff7300;
    box-shadow: 0 0 0 2px rgba(255, 115, 0, 0.2);
  }
`;

const DescriptionInput = styled.input`
  flex: 1;
  border: none;
  outline: none;
  background-color: transparent;
  font-family: 'Pretendard', sans-serif;
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
  width: 100%;
`;

const DeleteButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.4rem;
  background: none;
  border: none;
  cursor: pointer;
  color: #868686;
  padding: 0.4rem;
  border-radius: 0.4rem;
  transition: all 0.2s ease;
  font-size: 1.3rem;

  & > img {
    width: 1.4rem;
  }
`;
