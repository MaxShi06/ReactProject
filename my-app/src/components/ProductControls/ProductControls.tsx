import type { ChangeEvent } from 'react';
import './style.css';

interface ProductControlsProps {
  productId: string;
  deleteId: string;
  onProductIdChange: (value: string) => void;
  onDeleteIdChange: (value: string) => void;
  onGetAll: () => void;
  onGetOne: () => void;
  onDelete: () => void;
}

export default function ProductControls({
  productId,
  deleteId,
  onProductIdChange,
  onDeleteIdChange,
  onGetAll,
  onGetOne,
  onDelete,
}: ProductControlsProps) {
  return (
    <section className="product-controls">
      <button type="button" className="product-controls__button" onClick={onGetAll}>Refresh products</button>
      <div className="product-controls__row">
        <input className="product-controls__input" type="number" min={1} value={productId} onChange={(e: ChangeEvent<HTMLInputElement>) => onProductIdChange(e.target.value)} placeholder="Product id" />
        <button type="button" className="product-controls__button" onClick={onGetOne}>Get one</button>
      </div>
      <div className="product-controls__row">
        <input className="product-controls__input" type="number" min={1} value={deleteId} onChange={(e: ChangeEvent<HTMLInputElement>) => onDeleteIdChange(e.target.value)} placeholder="Id to delete" />
        <button type="button" className="product-controls__button product-controls__button--danger" onClick={onDelete}>Delete</button>
      </div>
    </section>
  );
}
