import React, { useState } from 'react';
import './index.css';
import { createPortal } from "react-dom";
import { CircularProgress } from "@mui/material";

const CoverGeneratePopup = ({ onClose, onCoverSelect, apiKey, prompt }) => {
  const [imageUrls, setImageUrls] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const generateImages = async () => {
    setIsLoading(true);
    setErrorMsg('');
    setImageUrls([]); // 이전 이미지 초기화

    try {
      // 단일 이미지 생성 함수 정의
      const generateSingleImage = async () => {
        const response = await fetch('https://api.openai.com/v1/images/generations', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${apiKey}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            model: 'dall-e-3',
            prompt,
            n: 1,
            size: '1024x1024',
            quality: 'standard',
            style: 'vivid',
          }),
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error?.message || '이미지 생성 실패');
        }

        return data.data[0].url;
      };

      // 병렬로 3개 요청
      const urls = await Promise.all([
        generateSingleImage(),
        generateSingleImage(),
        generateSingleImage(),
      ]);

      setImageUrls(urls);
    } catch (err) {
      setErrorMsg('API 호출 오류: ' + err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const makeHandleSelectCover = (url) => () => onCoverSelect(url);

  return createPortal(
    <div className="generate-popup">
      <h1>도서 표지 이미지 생성</h1>
      {isLoading ? (
        <div><p>이미지 생성 중...</p><CircularProgress /></div>
      ) : errorMsg ? (
        <p className="error">{errorMsg}</p>
      ) : (
        imageUrls.length > 0 ? (
          <div className="image-list">
            {imageUrls.map((url, index) => (
              <div
                key={index}
                className="image-box"
                onClick={makeHandleSelectCover(url)}
              >
                <img src={url} alt={`샘플${index + 1}`} className="image-placeholder" />
              </div>
            ))}
          </div>
        ) : <span>"생성 하기"를 눌러 표지 이미지를 생성하세요.</span>
      )}
      <div style={{ marginTop: 'auto', marginBottom: '5rem' }}>
        <button className="refresh-btn" onClick={generateImages} disabled={isLoading}>
          생성 하기
        </button>
        <button className="cancel-btn" onClick={onClose} disabled={isLoading}>
          취소
        </button>
      </div>
    </div>,
    document.querySelector('#root'),
  );
};

export default CoverGeneratePopup;
