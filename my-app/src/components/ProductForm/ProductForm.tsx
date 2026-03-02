import type { ChangeEvent } from 'react';
import type { CreateProductPayload } from '../../store/productSlice';
import './style.css';

interface ProductFormProps {
  formData: CreateProductPayload;
  onFormChange: (payload: CreateProductPayload) => void;
  onCreate: () => void;
}

export default function ProductForm({ formData, onFormChange, onCreate }: ProductFormProps) {
  const setField = <K extends keyof CreateProductPayload>(key: K, value: CreateProductPayload[K]) => {
    onFormChange({ ...formData, [key]: value });
  };

  return (
    <section className="product-form">
      <input className="product-form__input" value={formData.title} placeholder="Title" onChange={(e: ChangeEvent<HTMLInputElement>) => setField('title', e.target.value)} />
      <input className="product-form__input" type="number" min={0} step="0.01" value={formData.price || ''} placeholder="Price" onChange={(e: ChangeEvent<HTMLInputElement>) => setField('price', Number(e.target.value))} />
      <input className="product-form__input" value={formData.category} placeholder="Category" onChange={(e: ChangeEvent<HTMLInputElement>) => setField('category', e.target.value)} />
      <input className="product-form__input" value={formData.image} placeholder="Image URL" onChange={(e: ChangeEvent<HTMLInputElement>) => setField('image', e.target.value)} />
      <textarea className="product-form__input product-form__input--textarea" value={formData.description} placeholder="Description" onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setField('description', e.target.value)} />
      <button type="button" className="product-form__button" onClick={onCreate}>Create product</button>
    </section>
  );
}
