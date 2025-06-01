import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { domain } from '../../const/http';

export default function SignUp() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ username: '', password: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${domain}/api/v1/user/register`, formData);
      alert('회원가입 성공!');
      navigate('/login');
    } catch (err) {
      alert('회원가입 실패: ' + err.response?.data?.message);
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <Link to="/" style={{ fontSize: '1.5rem', fontWeight: 'bold', textDecoration: 'none', color: 'black' }}>도서관리시스템</Link>
      <form onSubmit={handleSubmit} style={{ marginTop: '20px' }}>
        <h2>회원가입</h2>
        <input name="username" value={formData.username} onChange={handleChange} placeholder="아이디" />
        <input name="password" type="password" value={formData.password} onChange={handleChange} placeholder="비밀번호" />
        <button type="submit">회원가입</button>
      </form>
    </div>
  );
}