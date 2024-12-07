import { configureStore } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
// Slices
import authReducer from './slices/authSlice';
import productsReducer from './slices/productsSlice';

const store = configureStore({
  reducer: {
    products: productsReducer,
  },
  // middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
});
export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
