// // 이미지 추가, 텍스트 입력 필드 카드 컴포넌트
// // 이미지 업로드 컴포넌트(Curation/ImageUpload)에 여러 번 사용될거임

import React, { useState, useRef } from 'react';
import styled from 'styled-components';
import IconTrash from '../assets/img/icon_trashcan.svg';
import IconPlus from '../assets/img/icon_plus.svg';

const ImageUploaderCard = ({ title, cardData, onUpdate, onDelete }) => {
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
      {/* title이 있을 때만 렌더링 */}
      {title && <Title>{title}</Title>}
      <CardWrapper>
        <UploadArea>
          {/* preview가 있으면 이미지를, 없으면 플레이스홀더를 보여줍니다. */}
          <ImagePreview onClick={!preview ? triggerFileSelect : undefined}>
            {preview ? (
              <StyledImage src={preview} alt="Preview" />
            ) : (
              <UploadPlaceholder>
                <img src={IconPlus} alt="사진 추가" />
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

const SectionWrapper = styled.div`
  width: 100%;
  max-width: 400px;
  margin-bottom: 1.5rem;
`;

const Title = styled.h3`
  font-size: 1.25rem;
  font-weight: 600;
  color: #333;
  margin-bottom: 0.75rem;
`;

const CardWrapper = styled.div`
  background-color: #f7f7f7;
  border-radius: 12px;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

const UploadArea = styled.div`
  width: 100%;
`;

const ImagePreview = styled.div`
  width: 120px;
  height: 120px;
  border-radius: 8px;
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
  font-size: 0.9rem;
  gap: 8px;
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
  height: 3.5rem;
  padding: 0 1rem;
  background-color: #fff;
  border-radius: 8px;
  border: 1px solid #e0e0e0;
  box-sizing: border-box;
`;

const DescriptionInput = styled.input`
  flex: 1;
  border: none;
  outline: none;
  font-size: 1rem;
  background-color: transparent;
  &::placeholder {
    color: #ccc;
  }
`;

const CharCounter = styled.span`
  color: #999;
  font-size: 0.9rem;
`;

const Footer = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 100%;
`;

const DeleteButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.25rem;
  background: none;
  border: none;
  cursor: pointer;
  color: #868686;
  font-size: 0.9rem;
  padding: 0.25rem;

  &:hover {
    color: #333;
  }
`;
