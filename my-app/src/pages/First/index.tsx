import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { isLoggedIn } from '../../servise/localStorageHelper';
import { mockBikes } from '../../fixtures/product';
import Card from '../../components/Card';
import './style.css';

export default function Bikes() {
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn()) {
      navigate('/login');
    }
  }, [navigate]);

  return (
    <div className="bikes-page">
      <h2>Our Bikes</h2>
      <div className="bikes-grid">
        {mockBikes.map(bike => (
          <Card key={bike.id} bike={bike} />
        ))}
      </div>
    </div>
  );
}
