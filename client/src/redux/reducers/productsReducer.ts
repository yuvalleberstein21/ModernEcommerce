// import { PayloadAction } from "@reduxjs/toolkit";
import { Product } from '../../Types';
import {
  CATEGORIES_LIST_FAIL,
  CATEGORIES_LIST_REQUEST,
  CATEGORIES_LIST_SUCCESS,
  PRODUCT_CREATE_FAIL,
  PRODUCT_CREATE_REQUEST,
  PRODUCT_CREATE_RESET,
  PRODUCT_CREATE_SUCCESS,
  PRODUCT_LIST_FAIL,
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
  SINGLE_PRODUCT_FAIL,
  SINGLE_PRODUCT_REQUEST,
  SINGLE_PRODUCT_SUCCESS,
} from '../constant/ProductConstant';

interface ProductState {
  products: Product[];
  loading: boolean;
  error: string | null;
  total?: number;
  totalPages?: number;
  currentPage?: number;
}

const productInitialState: ProductState = {
  products: [],
  loading: false,
  error: null,
  total: 0,
  totalPages: 1,
  currentPage: 1,
};

const initialState = {
  categories: [],
  loading: false,
  error: null,
};

export const productListReducer = (
  state = productInitialState,
  action: any
) => {
  switch (action.type) {
    case PRODUCT_LIST_REQUEST:
      return { ...state, loading: true };
    case PRODUCT_LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        products: action.payload.products,
        total: action.payload.total,
        totalPages: action.payload.totalPages,
        currentPage: action.payload.page,
      };
    case PRODUCT_LIST_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
        products: [],
      };
    default:
      return state;
  }
};

// SINGLE PRODUCT
export const singleProductReducer = (
  state = { product: { reviews: [] }, loading: false, error: null },
  action
) => {
  switch (action.type) {
    case SINGLE_PRODUCT_REQUEST:
      return { ...state, loading: true, product: null, error: null }; // Clear product
    case SINGLE_PRODUCT_SUCCESS:
      return { loading: false, product: action.payload, error: null };
    case SINGLE_PRODUCT_FAIL:
      return { loading: false, error: action.payload, product: null }; // Clear product on error
    default:
      return state;
  }
};

// CATEGORIES
export const categoriesListReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case CATEGORIES_LIST_REQUEST:
      return { ...state, loading: true, error: null };
    case CATEGORIES_LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        categories: action.payload, // Adjust based on the backend response
        error: null,
      };
    case CATEGORIES_LIST_FAIL:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export const createProductReducer = (
  state = { product: {}, loading: false, error: null, success: false },
  action: any
) => {
  switch (action.type) {
    case PRODUCT_CREATE_REQUEST:
      return { ...state, loading: true, error: null, success: false };
    case PRODUCT_CREATE_SUCCESS:
      return {
        ...state,
        loading: false,
        product: action.payload,
        success: true,
        error: null,
      };
    case PRODUCT_CREATE_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
        success: false,
      };
    case PRODUCT_CREATE_RESET:
      return { product: {}, loading: false, error: null, success: false };
    default:
      return state;
  }
};
