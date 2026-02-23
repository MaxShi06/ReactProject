import type { Book } from '../../types';
import { addToCart } from '../../store/cartSlice';
import { useAppDispatch } from '../../hooks/reduxHooks';
import './style.css';

interface CardProps {
  book: Book;
  index: number;
}

export default function Card({ book, index }: CardProps) {
  const dispatch = useAppDispatch();

  const handleAddToCart = () => {
    dispatch(
      addToCart({
        id: book.id,
        title: book.title,
        type: book.type,
        price: book.price,
      })
    );
  };

  return (
    <article className="card" style={{ animationDelay: `${index * 80}ms` }}>
      <div className="card-cover-wrap">
        <img className="card-cover" src={book.image} alt={book.title} loading="lazy" />
        <span className="card-type">{book.type}</span>
      </div>
      <div className="card-content">
      <h3 className="card-title">{book.title}</h3>
      <p className="card-author">{book.author}</p>
      <div className="card-footer">
        <p className="card-price">${book.price.toFixed(2)}</p>
        <button className="card-btn" type="button" onClick={handleAddToCart}>Add to Cart</button>
      </div>
      </div>
    </article>
  );
}
