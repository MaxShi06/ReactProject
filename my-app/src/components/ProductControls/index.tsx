import './style.css';

interface ProductControlsProps {
  isLoading: boolean;
  onRefresh: () => void;
  onAddProduct: () => void;
}

export default function ProductControls({ isLoading, onRefresh, onAddProduct }: ProductControlsProps) {
  // Top controls handlers.
  const handleRefreshClick = () => {
    onRefresh();
  };

  const handleAddClick = () => {
    onAddProduct();
  };

  return (
    <section className="product-controls">
      <button type="button" className="product-controls__button" onClick={handleAddClick}>
        Add Product
      </button>
      <button type="button" className="product-controls__button product-controls__button--ghost" onClick={handleRefreshClick} disabled={isLoading}>
        Refresh
      </button>
    </section>
  );
}
