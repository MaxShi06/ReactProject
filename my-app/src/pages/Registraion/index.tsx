import { useState, type ChangeEvent, type FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getUserByEmail, saveUser } from '../../servise/localStorageHelper';
import type { User } from '../../types';
import './style.css';

export default function Registration() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
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
        <h2>Registration</h2>
        {error ? <div className="error-message">{error}</div> : null}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              id="name"
              name="name"
              type="text"
              value={formData.name}
              onChange={handleChange}
              placeholder="Your name"
              required
            />
          </div>
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
          <button type="submit" className="submit-btn">Register</button>
        </form>
        <p className="login-link">
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
}
