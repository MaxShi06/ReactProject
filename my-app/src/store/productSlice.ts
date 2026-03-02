import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { api } from '../api/api';
import type { Product } from '../types';

export interface CreateProductPayload {
  title: string;
  price: number;
  description: string;
  image: string;
  category: string;
}

interface ProductState {
  items: Product[];
  single: Product | null;
  loading: boolean;
  error: string | null;
  message: string | null;
}

const initialState: ProductState = { items: [], single: null, loading: false, error: null, message: null };

export const fetchProducts = createAsyncThunk<Product[], void, { rejectValue: string }>('products/fetchProducts', async (_, { rejectWithValue }) => {
  try { return (await api.get<Product[]>('/products')).data; } catch { return rejectWithValue('Failed to load products.'); }
});

export const fetchProductById = createAsyncThunk<Product, number, { rejectValue: string }>('products/fetchProductById', async (id, { rejectWithValue }) => {
  try { return (await api.get<Product>(`/products/${id}`)).data; } catch { return rejectWithValue('Failed to load product.'); }
});

export const createProductThunk = createAsyncThunk<Product, CreateProductPayload, { rejectValue: string }>('products/createProduct', async (payload, { rejectWithValue }) => {
  try { return (await api.post<Product>('/products', payload)).data; } catch { return rejectWithValue('Failed to create product.'); }
});

export const deleteProductThunk = createAsyncThunk<number, number, { rejectValue: string }>('products/deleteProduct', async (id, { rejectWithValue }) => {
  try { await api.delete<Product>(`/products/${id}`); return id; } catch { return rejectWithValue('Failed to delete product.'); }
});

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    clearProductFeedback: (state) => { state.error = null; state.message = null; },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => { state.loading = true; state.error = null; state.message = null; })
      .addCase(fetchProducts.fulfilled, (state, action) => { state.loading = false; state.items = action.payload; })
      .addCase(fetchProducts.rejected, (state, action) => { state.loading = false; state.error = action.payload ?? 'Failed to load products.'; })
      .addCase(fetchProductById.pending, (state) => { state.loading = true; state.error = null; state.message = null; })
      .addCase(fetchProductById.fulfilled, (state, action) => { state.loading = false; state.single = action.payload; state.message = `Loaded #${action.payload.id}`; })
      .addCase(fetchProductById.rejected, (state, action) => { state.loading = false; state.error = action.payload ?? 'Failed to load product.'; })
      .addCase(createProductThunk.pending, (state) => { state.loading = true; state.error = null; state.message = null; })
      .addCase(createProductThunk.fulfilled, (state, action) => { state.loading = false; state.items = [action.payload, ...state.items]; state.single = action.payload; state.message = `Created #${action.payload.id}`; })
      .addCase(createProductThunk.rejected, (state, action) => { state.loading = false; state.error = action.payload ?? 'Failed to create product.'; })
      .addCase(deleteProductThunk.pending, (state) => { state.loading = true; state.error = null; state.message = null; })
      .addCase(deleteProductThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.items = state.items.filter((item) => item.id !== action.payload);
        if (state.single?.id === action.payload) state.single = null;
        state.message = `Deleted #${action.payload}`;
      })
      .addCase(deleteProductThunk.rejected, (state, action) => { state.loading = false; state.error = action.payload ?? 'Failed to delete product.'; });
  },
});

export const { clearProductFeedback } = productSlice.actions;
export default productSlice.reducer;
