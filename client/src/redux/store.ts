import { configureStore, combineReducers } from '@reduxjs/toolkit';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import {
  productListReducer,
  singleProductReducer,
} from './reducers/productsReducer';
import { cartReducer } from './reducers/cartReducer';

// Create the root reducer
const rootReducer = combineReducers({
  products: productListReducer,
  product: singleProductReducer,
  cart: cartReducer,
});

// Persist configuration
const persistConfig = {
  key: 'root',
  storage,
  // Only persist the `cart` reducer
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

// Create the store with persisted reducer
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});
// Create persistor
export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
