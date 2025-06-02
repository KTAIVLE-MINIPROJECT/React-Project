import { Link, useNavigate } from 'react-router-dom';
import './MainHeader.css';
import { Button } from '@mui/material';

const MainHeader = () => {
  const navigate = useNavigate();
  const user = JSON.parse(sessionStorage.getItem('user'));

  const logout = () => {
    sessionStorage.removeItem('user');     // 세션 스토리지에서 사용자 정보 제거
    navigate('/');                         // 홈으로 이동
    window.location.reload();              // 새로고침으로 UI 반영
  };

  return (
    <header className="main-header">
      <Link to="/" className="logo">도서관리시스템</Link>
      <div className="auth-buttons">
        {user ? (
          <div className="user-info">
            <span className="welcome">{user.username}님 환영합니다</span>
            <Button onClick={logout} className="auth-button" variant='contained' color='success'>로그아웃</Button>
          </div>
        ) : (
          <>
            <Button onClick={() => navigate('/login')} className="auth-button" variant='contained' color='success'>로그인</Button>
            <Button onClick={() => navigate('/signup')} className="auth-button" variant='outlined' color='success'>회원가입</Button>
          </>
        )}
      </div>
    </header>
  );
};

export default MainHeader;
