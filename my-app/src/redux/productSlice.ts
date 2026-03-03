import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { api } from '../api/api';
import type { Product } from '../types';

export interface ProductFormValues {
  title: string;
  price: number;
  description: string;
  image: string;
  category: string;
}

interface ProductState {
  items: Product[];
  loading: boolean;
  error: string | null;
  message: string | null;
}

const initialState: ProductState = {
  items: [],
  loading: false,
  error: null,
  message: null,
};

export const fetchProducts = createAsyncThunk<Product[], void, { rejectValue: string }>(
  'products/fetchProducts',
  async (_, { rejectWithValue }) => {
    try {
      return (await api.get<Product[]>('/products')).data;
    } catch {
      return rejectWithValue('Failed to load products.');
    }
  },
);

export const createProduct = createAsyncThunk<Product, ProductFormValues, { rejectValue: string }>(
  'products/createProduct',
  async (payload, { rejectWithValue }) => {
    try {
      return (await api.post<Product>('/products', payload)).data;
    } catch {
      return rejectWithValue('Failed to create product.');
    }
  },
);

export const updateProduct = createAsyncThunk<
  Product,
  { id: number; payload: ProductFormValues },
  { rejectValue: string }
>('products/updateProduct', async ({ id, payload }, { rejectWithValue }) => {
  try {
    return (await api.put<Product>(`/products/${id}`, payload)).data;
  } catch {
    return rejectWithValue('Failed to update product.');
  }
});

export const deleteProduct = createAsyncThunk<number, number, { rejectValue: string }>(
  'products/deleteProduct',
  async (id, { rejectWithValue }) => {
    try {
      await api.delete(`/products/${id}`);
      return id;
    } catch {
      return rejectWithValue('Failed to delete product.');
    }
  },
);

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    clearProductFeedback: (state) => {
      state.error = null;
      state.message = null;
    },
  },
  extraReducers: (builder) => {
    // Fetch products
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.message = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? 'Failed to load products.';
      });

    // Create product
    builder
      .addCase(createProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.message = null;
      })
      .addCase(createProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.items = [action.payload, ...state.items];
        state.message = `Created #${action.payload.id}`;
      })
      .addCase(createProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? 'Failed to create product.';
      });

    // Update product
    builder
      .addCase(updateProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.message = null;
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.items = state.items.map((item) => (item.id === action.payload.id ? action.payload : item));
        state.message = `Updated #${action.payload.id}`;
      })
      .addCase(updateProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? 'Failed to update product.';
      });

    // Delete product
    builder
      .addCase(deleteProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.message = null;
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.items = state.items.filter((item) => item.id !== action.payload);
        state.message = `Deleted #${action.payload}`;
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? 'Failed to delete product.';
      });
  },
});

export const { clearProductFeedback } = productSlice.actions;
export default productSlice.reducer;
