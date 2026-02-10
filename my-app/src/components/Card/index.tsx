import type { Bike } from '../../types';
import './style.css';

interface CardProps {
  bike: Bike;
}

export default function Card({ bike }: CardProps) {
  return (
    <div className="card">
      <h3 className="card-title">{bike.name}</h3>
      <p className="card-price">${bike.price}</p>
      <button className="card-btn">Add to Cart</button>
    </div>
  );
}
