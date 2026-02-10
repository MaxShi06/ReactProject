import { useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { isLoggedIn } from '../../servise/localStorageHelper';
import type { Book } from '../../types';
import authorsData from '../../fixtures/Authors.json';
import booksData from '../../fixtures/Books.json';
import Card from '../../components/Card';
import './style.css';

export default function Books() {
  const navigate = useNavigate();

  const mockBooks = useMemo(() => {
    const authorsMap = new Map(authorsData.map(a => [a.id, a.name]));
    return booksData.map(b => ({
      id: b.id,
      title: b.title,
      author: authorsMap.get(b.authorId) || 'Unknown',
      price: b.discountPrice || b.price,
    }));
  }, []);

  useEffect(() => {
    if (!isLoggedIn()) {
      navigate('/login');
    }
  }, [navigate]);

  return (
    <div className="books-page">
      <h2>Our Books</h2>
      <div className="books-grid">
        {mockBooks.map((book: Book) => (
          <Card key={book.id} book={book} />
        ))}
      </div>
    </div>
  );
}
