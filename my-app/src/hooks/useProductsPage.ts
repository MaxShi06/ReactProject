import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from './reduxHooks';
import {
  clearProductFeedback,
  createProductThunk,
  deleteProductThunk,
  fetchProductById,
  fetchProducts,
  type CreateProductPayload,
} from '../store/productSlice';

const initialFormState: CreateProductPayload = { title: '', price: 0, description: '', image: '', category: '' };

export function useProductsPage() {
  const dispatch = useAppDispatch();
  const { items, single, loading, error, message } = useAppSelector((state) => state.products);
  const [productId, setProductId] = useState('');
  const [deleteId, setDeleteId] = useState('');
  const [formData, setFormData] = useState<CreateProductPayload>(initialFormState);
  const [validationError, setValidationError] = useState<string | null>(null);

  useEffect(() => { void dispatch(fetchProducts()); }, [dispatch]);

  const clear = () => { setValidationError(null); dispatch(clearProductFeedback()); };

  const onGetAll = () => { clear(); void dispatch(fetchProducts()); };
  const onGetOne = () => {
    const id = Number(productId);
    if (!Number.isInteger(id) || id <= 0) return setValidationError('Enter valid product id.');
    clear(); void dispatch(fetchProductById(id));
  };
  const onCreate = async () => {
    if (!formData.title || !formData.description || !formData.image || !formData.category || formData.price <= 0) {
      return setValidationError('Fill all fields, price > 0.');
    }
    clear();
    const result = await dispatch(createProductThunk(formData));
    if (createProductThunk.fulfilled.match(result)) setFormData(initialFormState);
  };
  const onDelete = () => {
    const id = Number(deleteId);
    if (!Number.isInteger(id) || id <= 0) return setValidationError('Enter valid id to delete.');
    clear(); void dispatch(deleteProductThunk(id));
  };

  return {
    items, single, loading, error, message, validationError,
    productId, deleteId, formData, setProductId, setDeleteId, setFormData,
    onGetAll, onGetOne, onCreate, onDelete,
  };
}
