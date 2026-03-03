import type { ChangeEvent } from 'react';
import type { ProductFormValues } from '../../redux/productSlice';
import './style.css';

interface ProductFormProps {
  isOpen: boolean;
  mode: 'create' | 'edit';
  formData: ProductFormValues;
  isSubmitting: boolean;
  onFormChange: (payload: ProductFormValues) => void;
  onSubmit: () => void;
  onClose: () => void;
}

export default function ProductForm({
  isOpen,
  mode,
  formData,
  isSubmitting,
  onFormChange,
  onSubmit,
  onClose,
}: ProductFormProps) {
  // Field updater for controlled form inputs.
  const setField = <K extends keyof ProductFormValues>(key: K, value: ProductFormValues[K]) => {
    onFormChange({ ...formData, [key]: value });
  };

  const handleSubmit = () => {
    onSubmit();
  };

  const handleClose = () => {
    onClose();
  };

  if (!isOpen) {
    return null;
  }

  return (
    <section className="product-form">
      <div className="product-form__header">
        <h3 className="product-form__title">{mode === 'edit' ? 'Edit Product' : 'Create Product'}</h3>
      </div>

      <div className="product-form__fields">
        <input
          className="product-form__input"
          value={formData.title}
          placeholder="Title"
          onChange={(e: ChangeEvent<HTMLInputElement>) => setField('title', e.target.value)}
        />
        <input
          className="product-form__input"
          type="number"
          min={0}
          step="0.01"
          value={formData.price || ''}
          placeholder="Price"
          onChange={(e: ChangeEvent<HTMLInputElement>) => setField('price', Number(e.target.value))}
        />
        <input
          className="product-form__input"
          value={formData.category}
          placeholder="Category"
          onChange={(e: ChangeEvent<HTMLInputElement>) => setField('category', e.target.value)}
        />
        <input
          className="product-form__input"
          value={formData.image}
          placeholder="Image URL"
          onChange={(e: ChangeEvent<HTMLInputElement>) => setField('image', e.target.value)}
        />
        <textarea
          className="product-form__input product-form__input--textarea"
          value={formData.description}
          placeholder="Description"
          onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setField('description', e.target.value)}
        />
      </div>

      <div className="product-form__actions">
        <button type="button" className="product-form__button product-form__button--secondary" onClick={handleClose}>
          Cancel
        </button>
        <button type="button" className="product-form__button" onClick={handleSubmit} disabled={isSubmitting}>
          {mode === 'edit' ? 'Save Changes' : 'Create Product'}
        </button>
      </div>
    </section>
  );
}
