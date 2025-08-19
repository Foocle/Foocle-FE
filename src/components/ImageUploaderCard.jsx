import React, { useRef, useLayoutEffect } from 'react';
import styled from 'styled-components';
import IconTrash from '../assets/img/icon_trashcan.svg';
import IconPlus from '../assets/img/icon_plus.svg';

const ImageUploaderCard = ({ icon, cardData, onUpdate, onDelete, placeholder }) => {
  const fileInputRef = useRef(null);
  const textareaRef = useRef(null);
  const { preview, description = '' } = cardData || {};

  useLayoutEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = 'auto';
      textarea.style.height = `${textarea.scrollHeight}px`;
    }
  }, [description, placeholder]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      onUpdate({
        ...cardData,
        imageFile: file,
        preview: URL.createObjectURL(file),
      });
    }
  };

  const handleDescriptionChange = (e) => {
    onUpdate({
      ...cardData,
      description: e.target.value,
    });
  };

  const triggerFileSelect = () => {
    fileInputRef.current.click();
  };

  return (
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
          ref={textareaRef}
          as="textarea"
          rows={1}
          placeholder={placeholder}
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
  );
};

export default ImageUploaderCard;

// --- Styled Components ---

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
  align-items: flex-start;
  width: 100%;
  min-height: 5.2rem;
  height: auto;
  background-color: #fff;
  border-radius: 1rem;
  border: 1px solid #e0e0e0;
  box-sizing: border-box;
  transition: all 0.2s ease-in-out;
  padding: 1.5rem 1.2rem;

  &:focus-within {
    border-color: #ff7300;
    box-shadow: 0 0 0 2px rgba(255, 115, 0, 0.2);
  }
`;

const DescriptionInput = styled.textarea`
  flex: 1;
  border: none;
  outline: none;
  background-color: transparent;
  font-family: 'Pretendard-SemiBold';
  font-size: 1.5rem;
  padding: 0;
  margin: 0;
  resize: none;
  overflow-y: hidden;
  line-height: 1.5;

  &::placeholder {
    color: #bdbdbd;
  }
`;

const CharCounter = styled.span`
  color: #999;
  font-size: 1.3rem;
  padding-left: 0.8rem;
  line-height: 1.5;
  white-space: nowrap;
  align-self: flex-end;
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
