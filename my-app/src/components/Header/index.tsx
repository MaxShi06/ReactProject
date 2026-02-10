import { Link, useNavigate } from 'react-router-dom';
import { getCurrentUser, logout } from '../../servise/localStorageHelper';
import './style.css';

export default function Header() {
  const navigate = useNavigate();
  const currentUser = getCurrentUser();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="header">
      <div className="header-content">
        <h1 className="header-title">� BookShop</h1>
        <nav className="nav">
          {!currentUser ? (
            <>
              <Link to="/login" className="nav-link">Login</Link>
              <Link to="/registration" className="nav-link">Register</Link>
            </>
          ) : (
            <>
              <span className="user-name">Welcome, {currentUser.name}</span>
              <Link to="/books" className="nav-link">Books</Link>
              <button onClick={handleLogout} className="logout-btn">Logout</button>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
