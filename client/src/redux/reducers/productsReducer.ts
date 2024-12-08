// import { PayloadAction } from "@reduxjs/toolkit";
import {
  PRODUCT_DETAILS_FAIL,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_LIST_FAIL,
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
} from '../constant/ProductConstant';

export const productListReducer = (
  state = { products: [], loading: false, error: null },
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
export const productDetailsReducer = (
  state = { product: { reviews: [] } },
  action
) => {
  switch (action.type) {
    case PRODUCT_DETAILS_REQUEST:
      return { ...state, loading: true };

    case PRODUCT_DETAILS_SUCCESS:
      return { loading: false, product: action.payload };

    case PRODUCT_DETAILS_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};
