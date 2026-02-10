import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { saveUser, getUserByEmail } from '../../servise/localStorageHelper';
import type { User } from '../../types';
import './style.css';

export default function Registration() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!formData.name.trim() || !formData.email.trim() || !formData.password.trim()) {
      setError('All fields are required');
      return;
    }

    if (!formData.email.includes('@')) {
      setError('Email must contain @');
      return;
    }

    if (getUserByEmail(formData.email)) {
      setError('User with this email already exists');
      return;
    }

    const newUser: User = {
      id: 0,
      name: formData.name,
      email: formData.email,
      password: formData.password,
      token: '',
    };

    saveUser(newUser);
    navigate('/login');
  };

  return (
    <div className="registration-page">
      <div className="registration-container">
        <h2>Register</h2>
        {error && <div className="error-message">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Your name"
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="your@email.com"
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Your password"
            />
          </div>
          <button type="submit" className="submit-btn">Register</button>
        </form>
        <p className="login-link">
          Already have an account? <Link to="/login">Login here</Link>
        </p>
      </div>
    </div>
  );
}
