import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const productsSlice = createSlice({
  name: 'products',
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  reducers: {
    fetchProductsStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchProductsSuccess: (state, action) => {
      state.loading = false;
      state.items = action.payload;
    },
    fetchProductsFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    addProduct: (state, action) => {
      state.items.push(action.payload);
    },
    removeProduct: (state, action) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
  },
});

// Async Thunk for Fetching Products
export const fetchProducts = () => async (dispatch) => {
  try {
    dispatch(fetchProductsStart());

    // Replace with your actual API endpoint
    const response = await axios.get('http://localhost:8000/api/products');

    dispatch(fetchProductsSuccess(response.data));
  } catch (error) {
    dispatch(fetchProductsFailure(error.message));
  }
};

export const {
  fetchProductsStart,
  fetchProductsSuccess,
  fetchProductsFailure,
  addProduct,
  removeProduct,
} = productsSlice.actions;

export default productsSlice.reducer;
