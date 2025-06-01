import { Link, useNavigate } from 'react-router-dom';
import './MainHeader.css';

const MainHeader = () => {
  const navigate = useNavigate();
  const user = JSON.parse(sessionStorage.getItem('user'));

  const logout = () => {
    sessionStorage.removeItem('user');
    navigate('/');
  };

  return (
    <header className="main-header">
      <Link to="/" className="logo">도서관리시스템</Link>
      <div className="auth-buttons">
        {user ? (
          <div className="user-info">
            <span className="welcome">{user.username}님 환영합니다</span>
            <button onClick={logout} className="auth-button">로그아웃</button>
          </div>
        ) : (
          <>
            <button onClick={() => navigate('/login')} className="auth-button">로그인</button>
            <button onClick={() => navigate('/signup')} className="auth-button">회원가입</button>
          </>
        )}
      </div>
    </header>
  );
};

export default MainHeader;