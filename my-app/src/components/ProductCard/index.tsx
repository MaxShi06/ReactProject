import type { Product } from '../../types';
import './style.css';

interface ProductCardProps {
  product: Product;
  animationDelay?: string;
  onEdit: (product: Product) => void;
  onDelete: (product: Product) => void;
}

export default function ProductCard({
  product,
  animationDelay = '0ms',
  onEdit,
  onDelete,
}: ProductCardProps) {
  // Card action handlers.
  const handleEditClick = () => {
    onEdit(product);
  };

  const handleDeleteClick = () => {
    onDelete(product);
  };

  return (
    <article className="product-card" style={{ animationDelay }}>
      <img className="product-card__image" src={product.image} alt={product.title} loading="lazy" />
      <h3 className="product-card__title">{product.title}</h3>
      <p className="product-card__category">{product.category}</p>
      <p className="product-card__description">{product.description}</p>
      <p className="product-card__price">${product.price.toFixed(2)}</p>

      <div className="product-card__actions">
        <button type="button" className="product-card__button" onClick={handleEditClick}>
          Edit
        </button>
        <button
          type="button"
          className="product-card__button product-card__button--danger"
          onClick={handleDeleteClick}
        >
          Delete
        </button>
      </div>
    </article>
  );
}
