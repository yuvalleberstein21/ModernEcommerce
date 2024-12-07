import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Product } from '../../Types';
import { AppDispatch } from '../store';
import { getDataFromServer } from '../../utils/Api';

interface ProductState {
  items: Product[];
  selectedProduct: Product | null;
  loading: boolean;
  error: string | null;
}

const initialState: ProductState = {
  items: [],
  selectedProduct: null,
  loading: false,
  error: null,
};

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    fetchProductsStart(state) {
      state.loading = true;
      state.error = null;
    },
    fetchProductsSuccess(state, action: PayloadAction<Product[]>) {
      state.items = action.payload;
      state.loading = false;
    },
    fetchProductsFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
    selectProduct(state, action: PayloadAction<string>) {
      state.selectedProduct =
        state.items.find((item) => item.id === action.payload) || null;
    },
  },
});

// Async Thunk for Fetching Products
export const fetchProducts = () => async (dispatch: AppDispatch) => {
  try {
    dispatch(fetchProductsStart());
    const data = await getDataFromServer<Product[]>('products');
    dispatch(fetchProductsSuccess(data));
  } catch (error: any) {
    dispatch(fetchProductsFailure(error.message));
  }
};
export const {
  fetchProductsStart,
  fetchProductsSuccess,
  fetchProductsFailure,
  selectProduct,
} = productsSlice.actions;

export default productsSlice.reducer;