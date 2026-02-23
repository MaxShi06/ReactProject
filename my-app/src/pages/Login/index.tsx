import { useState, type ChangeEvent, type FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { loginUser } from '../../servise/localStorageHelper';
import './style.css';

export default function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');

    if (!formData.email.trim() || !formData.password.trim()) {
      setError('All fields are required');
      return;
    }

    if (loginUser(formData.email, formData.password)) {
      navigate('/books');
      return;
    }

    setError('Invalid email or password');
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <h2>Login</h2>
        {error ? <div className="error-message">{error}</div> : null}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="your@email.com"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Your password"
              required
            />
          </div>
          <button type="submit" className="submit-btn">Login</button>
        </form>
        <p className="register-link">
          No account? <Link to="/registration">Create one</Link>
        </p>
      </div>
    </div>
  );
}
