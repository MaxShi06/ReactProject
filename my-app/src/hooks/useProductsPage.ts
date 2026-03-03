import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from './reduxHooks';
import {
  clearProductFeedback,
  createProduct,
  deleteProduct,
  fetchProducts,
  updateProduct,
  type ProductFormValues,
} from '../redux/productSlice';
import type { Product } from '../types';

const initialFormState: ProductFormValues = {
  title: '',
  price: 0,
  description: '',
  image: '',
  category: '',
};

export function useProductsPage() {
  const dispatch = useAppDispatch();
  const { items, loading, error, message } = useAppSelector((state) => state.products);

  const [formData, setFormData] = useState<ProductFormValues>(initialFormState);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [productToDelete, setProductToDelete] = useState<Product | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [validationError, setValidationError] = useState<string | null>(null);

  useEffect(() => {
    void dispatch(fetchProducts());
  }, [dispatch]);

  // Shared clear handler for local and redux feedback.
  const clearFeedback = () => {
    setValidationError(null);
    dispatch(clearProductFeedback());
  };

  const openCreateForm = () => {
    clearFeedback();
    setEditingProduct(null);
    setFormData(initialFormState);
    setIsFormOpen(true);
  };

  const openEditForm = (product: Product) => {
    clearFeedback();
    setEditingProduct(product);
    setFormData({
      title: product.title,
      price: product.price,
      description: product.description,
      image: product.image,
      category: product.category,
    });
    setIsFormOpen(true);
  };

  const closeForm = () => {
    setIsFormOpen(false);
    setEditingProduct(null);
    setFormData(initialFormState);
  };

  const validateForm = () => {
    if (!formData.title || !formData.description || !formData.image || !formData.category || formData.price <= 0) {
      setValidationError('Fill all fields and set price > 0.');
      return false;
    }
    return true;
  };

  const submitForm = async () => {
    if (!validateForm()) {
      return;
    }

    clearFeedback();
    const result = editingProduct
      ? await dispatch(updateProduct({ id: editingProduct.id, payload: formData }))
      : await dispatch(createProduct(formData));

    if (updateProduct.fulfilled.match(result) || createProduct.fulfilled.match(result)) {
      closeForm();
    }
  };

  const requestDelete = (product: Product) => {
    clearFeedback();
    setProductToDelete(product);
  };

  const cancelDelete = () => {
    setProductToDelete(null);
  };

  const confirmDelete = async () => {
    if (!productToDelete) {
      return;
    }

    clearFeedback();
    const result = await dispatch(deleteProduct(productToDelete.id));
    if (deleteProduct.fulfilled.match(result)) {
      setProductToDelete(null);
    }
  };

  const refreshProducts = () => {
    clearFeedback();
    void dispatch(fetchProducts());
  };

  const formMode: 'create' | 'edit' = editingProduct ? 'edit' : 'create';

  return {
    items,
    loading,
    error,
    message,
    validationError,
    formData,
    isFormOpen,
    formMode,
    productToDelete,
    setFormData,
    openCreateForm,
    openEditForm,
    closeForm,
    submitForm,
    requestDelete,
    cancelDelete,
    confirmDelete,
    refreshProducts,
  };
}
