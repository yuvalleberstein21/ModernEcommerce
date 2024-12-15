// import { PayloadAction } from "@reduxjs/toolkit";
import { Product } from '../../Types';
import {
  CategoriesState,
  CreateProductState,
  ProductState,
  SingleProductState,
} from '../../Types/ProductsInterface';
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

// Initial States
const productInitialState: ProductState = {
  products: [],
  loading: false,
  error: null,
  total: 0,
  totalPages: 1,
  currentPage: 1,
};

const singleProductInitialState: SingleProductState = {
  product: null,
  loading: false,
  error: null,
};

const categoriesInitialState: CategoriesState = {
  categories: [],
  loading: false,
  error: null,
};

const createProductInitialState: CreateProductState = {
  product: null,
  loading: false,
  error: null,
  success: false,
};

// Reducers
export const productListReducer = (
  state = productInitialState,
  action: any
): ProductState => {
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
      return { ...state, loading: false, error: action.payload, products: [] };
    default:
      return state;
  }
};

export const singleProductReducer = (
  state = singleProductInitialState,
  action: any
): SingleProductState => {
  switch (action.type) {
    case SINGLE_PRODUCT_REQUEST:
      return { ...state, loading: true, product: null };
    case SINGLE_PRODUCT_SUCCESS:
      return { ...state, loading: false, product: action.payload };
    case SINGLE_PRODUCT_FAIL:
      return { ...state, loading: false, error: action.payload, product: null };
    default:
      return state;
  }
};

export const categoriesListReducer = (
  state = categoriesInitialState,
  action: any
): CategoriesState => {
  switch (action.type) {
    case CATEGORIES_LIST_REQUEST:
      return { ...state, loading: true };
    case CATEGORIES_LIST_SUCCESS:
      return { ...state, loading: false, categories: action.payload };
    case CATEGORIES_LIST_FAIL:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export const createProductReducer = (
  state = createProductInitialState,
  action: any
): CreateProductState => {
  switch (action.type) {
    case PRODUCT_CREATE_REQUEST:
      return { ...state, loading: true, success: false };
    case PRODUCT_CREATE_SUCCESS:
      return {
        ...state,
        loading: false,
        product: action.payload,
        success: true,
      };
    case PRODUCT_CREATE_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
        success: false,
      };
    case PRODUCT_CREATE_RESET:
      return createProductInitialState;
    default:
      return state;
  }
};
