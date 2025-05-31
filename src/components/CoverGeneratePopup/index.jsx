import React, { useState, useEffect } from 'react';
import './index.css';

const CoverGeneratePopup = ({ onClose }) => {
  const [selected, setSelected] = useState(null);
  const [imageUrls, setImageUrls] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const TEMP_API_KEY = ''; // 실제 키로 대체

  const generateImages = async () => {
    setIsLoading(true);
    setErrorMsg('');
    try {
      const response = await fetch('https://api.openai.com/v1/images/generations', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${TEMP_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prompt: '책 제목과 내용을 기반으로 한 도서 표지 이미지',
          n: 3,
          size: '512x512',
        }),
      });

      const data = await response.json();

      if (response.ok) {
        const urls = data.data.map(img => img.url);
        setImageUrls(urls);
      } else {
        setErrorMsg(data.error?.message || '이미지 생성 실패');
      }
    } catch (err) {
      setErrorMsg('API 호출 오류: ' + err.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    generateImages();
  }, []);

  const handleSelect = (index) => {
    setSelected(index);
    setTimeout(() => {
      onClose(imageUrls[index]);
    }, 300);
  };

  return (
    <div className="generate-popup">
      <h1>도서 표지 이미지 생성</h1>
      {isLoading ? (
        <p>이미지 생성 중...</p>
      ) : errorMsg ? (
        <p className="error">{errorMsg}</p>
      ) : (
        <div className="image-list">
          {imageUrls.map((url, index) => (
            <div
              key={index}
              className={`image-box ${selected === index ? 'selected' : ''}`}
              onClick={() => handleSelect(index)}
            >
              <img src={url} alt={`샘플${index + 1}`} className="image-placeholder" />
            </div>
          ))}
        </div>
      )}
      <button className="refresh-btn" onClick={generateImages} disabled={isLoading}>
        새로 고침
      </button>
    </div>
  );
};

export default CoverGeneratePopup;
