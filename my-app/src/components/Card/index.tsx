import type { Book } from '../../types';
import './style.css';

interface CardProps {
  book: Book;
}

export default function Card({ book }: CardProps) {
  return (
    <div className="card">
      <h3 className="card-title">{book.title}</h3>
      <p className="card-author">{book.author}</p>
      <p className="card-price">${book.price}</p>
      <button className="card-btn">Add to Cart</button>
    </div>
  );
}
