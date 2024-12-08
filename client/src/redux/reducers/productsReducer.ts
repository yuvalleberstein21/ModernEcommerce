// import { PayloadAction } from "@reduxjs/toolkit";
import {
  PRODUCT_LIST_FAIL,
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
  SINGLE_PRODUCT_FAIL,
  SINGLE_PRODUCT_REQUEST,
  SINGLE_PRODUCT_SUCCESS,
} from '../constant/ProductConstant';

export const productListReducer = (
  state = { product: { reviews: [] }, loading: false, error: null },
  action: any
) => {
  switch (action.type) {
    case PRODUCT_LIST_REQUEST:
      return { ...state, loading: true, error: null };
    case PRODUCT_LIST_SUCCESS:
      return { ...state, loading: false, products: action.payload.products };
    case PRODUCT_LIST_FAIL:
      return { ...state, loading: false, error: action.payload };
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
