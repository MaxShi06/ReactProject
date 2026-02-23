import { Link, useNavigate } from 'react-router-dom';
import { getCurrentUser, logout } from '../../servise/localStorageHelper';
import { useAppSelector } from '../../hooks/reduxHooks';
import './style.css';

export default function Header() {
  const navigate = useNavigate();
  const currentUser = getCurrentUser();
  const cartCount = useAppSelector((state) =>
    state.cart.items.reduce((sum, item) => sum + item.quantity, 0)
  );

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="header">
      <div className="header-content">
        <h1 className="header-title">BookShop</h1>
        <nav className="nav">
          {!currentUser ? (
            <>
              <Link to="/login" className="nav-link">Login</Link>
              <Link to="/registration" className="nav-link">Registration</Link>
            </>
          ) : (
            <>
              <span className="user-name">Welcome, {currentUser.name}</span>
              <Link to="/books" className="nav-link">Books</Link>
              <Link to="/cart" className="nav-link nav-cart">Cart <span>{cartCount}</span></Link>
              <button onClick={handleLogout} className="logout-btn" type="button">Logout</button>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
