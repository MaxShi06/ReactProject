import { useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { isLoggedIn } from '../../servise/localStorageHelper';
import type { Book } from '../../types';
import authorsData from '../../fixtures/Authors.json';
import booksData from '../../fixtures/Books.json';
import categoriesData from '../../fixtures/Categories.json';
import Card from '../../components/Card/index';
import './style.css';

export default function Books() {
  const navigate = useNavigate();

  const mockBooks = useMemo(() => {
    const authorsMap = new Map(authorsData.map(a => [a.id, a.name]));
    const categoriesMap = new Map(categoriesData.map((category) => [category.id, category.name]));

    return booksData.map(b => ({
      id: b.id,
      title: b.title,
      author: authorsMap.get(b.authorId) || 'Unknown',
      type: categoriesMap.get(b.categoryId) || 'Other',
      price: b.discountPrice || b.price,
      image: b.image,
    }));
  }, []);

  useEffect(() => {
    if (!isLoggedIn()) {
      navigate('/login');
    }
  }, [navigate]);

  return (
    <div className="books-page">
      <section className="books-hero">
        <p className="books-eyebrow">BookStore Collection</p>
        <h2>Choose your next favorite story</h2>
      </section>
      <div className="books-grid">
        {mockBooks.map((book: Book, index) => (
          <Card key={book.id} book={book} index={index} />
        ))}
      </div>
    </div>
  );
}
