import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, MenuItem } from '@mui/material';
import axios from 'axios';
import { domain } from '../../const/http';
import './index.css';

export default function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: '',
    author: '',
    publisher: '',
    content: '',
    api_key: '',
    cover_url: '',
    category_id: '',
  });

  const [categories, setCategories] = useState([]);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axios.get(domain + '/api/v1/category');
        setCategories(res.data); // [{ id: 800, name: '문학' }, ...]
      } catch (err) {
        console.error('카테고리 불러오기 실패:', err);
      }
    };
    fetchCategories();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'category_id' ? Number(value) : value,
    }));
  };

  const handleCoverSelect = (imagePath) => {
    setFormData((prev) => ({
      ...prev,
      cover_url: imagePath,
    }));
    setIsPopupOpen(false);
  };

  const postData = async () => {
    try {
      const payload = {
        title: formData.title,
        author: formData.author,    
        publisher: formData.publisher,
        content: formData.content,
        cover_url: null,
        category_id: formData.category_id,
      };
      console.log('POST 요청 payload:', payload);

      await axios.post(domain + '/api/v1/book', payload);
      alert('도서가 등록되었습니다.');
      navigate('/book');
    } catch (err) {
      console.error('도서 등록 실패:', err.response?.data || err.message);
      alert('도서 등록에 실패했습니다.');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    postData();
  };

  return (
    <div className="register-container">
      <div className="register-box">
        <form onSubmit={handleSubmit} className="register-form">
          <div className="form-left">
            <TextField
              label="1. 작품 제목을 입력해주세요."
              name="title"
              value={formData.title}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
            <TextField
              label="2. 저자명을 입력해주세요."
              name="author"
              value={formData.author}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
            <TextField
              label="3. 출판사를 입력해주세요."
              name="publisher"
              value={formData.publisher}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
            <TextField
              select
              label="4. 작품 카테고리를 선택해주세요."
              name="category_id"
              value={formData.category_id}
              onChange={handleChange}
              fullWidth
              margin="normal"
            >
              {categories.map((cat) => (
                <MenuItem key={cat.id} value={cat.id}>
                  {cat.name}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              label="5. 작품에 대한 소개를 입력해주세요."
              name="content"
              value={formData.content}
              onChange={handleChange}
              multiline
              rows={4}
              fullWidth
              margin="normal"
            />
            <TextField
              label="6. API 키를 입력해주세요."
              name="api_key"
              value={formData.api_key}
              onChange={handleChange}
              fullWidth
              margin="normal"
              type="password"
            />
            <Button type="submit" variant="contained" color="primary" className="submit-button">
              등록
            </Button>
          </div>

          <div className="form-right">
            <p><strong>7. 표지 등록하기</strong></p>
            <div
              onClick={() => setIsPopupOpen(true)}
              className="cover-preview"
            >
              {formData.cover_url ? (
                <img
                  src={formData.cover_url}
                  alt="표지"
                  width="100%"
                  height="100%"
                  style={{ objectFit: 'cover' }}
                />
              ) : (
                <span style={{ fontSize: '2rem', color: '#888' }}>+</span>
              )}
            </div>
          </div>
        </form>
      </div>

      {isPopupOpen && (
        <div className="cover-popup-overlay">
          <div className="cover-popup-box">
            <h2>도서 표지 이미지 생성</h2>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', margin: '20px 0' }}>
              {['cover1.png', 'cover2.png', 'cover3.png'].map((fileName, idx) => (
                <div
                  key={idx}
                  onClick={() => handleCoverSelect(`/${fileName}`)}
                  className="cover-option"
                >
                  샘플{idx + 1}
                </div>
              ))}
            </div>
            <Button variant="contained" onClick={() => setIsPopupOpen(false)}>
              닫기
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
