import type { Product } from '../../types';
import './style.css';

interface ProductCardProps {
  product: Product;
  selected?: boolean;
  animationDelay?: string;
}

export default function ProductCard({ product, selected = false, animationDelay = '0ms' }: ProductCardProps) {
  return (
    <article
      className={`product-card${selected ? ' product-card--selected' : ''}`}
      style={{ animationDelay }}
    >
      <img className="product-card__image" src={product.image} alt={product.title} loading="lazy" />
      <h3 className="product-card__title">{selected ? `Selected: ${product.title}` : product.title}</h3>
      <p className="product-card__category">{product.category}</p>
      <p className="product-card__description">{product.description}</p>
      <p className="product-card__price">${product.price.toFixed(2)}</p>
    </article>
  );
}
