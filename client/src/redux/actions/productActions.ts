import axios from 'axios';
import { getDataFromServer, postDataToServer } from '../../utils/Api';
import {
  CATEGORIES_LIST_FAIL,
  CATEGORIES_LIST_REQUEST,
  CATEGORIES_LIST_SUCCESS,
  PRODUCT_CREATE_FAIL,
  PRODUCT_CREATE_REQUEST,
  PRODUCT_CREATE_SUCCESS,
  PRODUCT_LIST_FAIL,
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
  SINGLE_PRODUCT_FAIL,
  SINGLE_PRODUCT_REQUEST,
  SINGLE_PRODUCT_SUCCESS,
} from '../constant/ProductConstant';
import { AppDispatch } from '../store';

export const productList =
  (queries: { category?: string; page?: number; limit?: number } = {}) =>
  async (dispatch: AppDispatch) => {
    try {
      dispatch({ type: PRODUCT_LIST_REQUEST });

      // Construct query string from the queries object
      const queryString = new URLSearchParams(
        queries as Record<string, string>
      ).toString();

      const url = `api/products${queryString ? `?${queryString}` : ''}`;

      const data = await getDataFromServer(url);

      // const data = await getDataFromServer('api/products');

      dispatch({
        type: PRODUCT_LIST_SUCCESS,
        payload: data, // Dispatch the fetched data
      });
    } catch (error: any) {
      dispatch({
        type: PRODUCT_LIST_FAIL,
        payload: error.response?.data?.message || error.message,
      });
    }
  };

export const singleProductDetails =
  (id: string | number) => async (dispatch: AppDispatch) => {
    try {
      dispatch({ type: SINGLE_PRODUCT_REQUEST });

      const data = await getDataFromServer(`api/products?productId=${id}`);

      dispatch({
        type: SINGLE_PRODUCT_SUCCESS,
        payload: data, // Dispatch the fetched data
      });
    } catch (error: any) {
      dispatch({
        type: SINGLE_PRODUCT_FAIL,
        payload: error.response?.data?.message || error.message,
      });
    }
  };

export const categoriesList = () => async (dispatch: AppDispatch) => {
  try {
    dispatch({ type: CATEGORIES_LIST_REQUEST });

    const data = await getDataFromServer('api/products/categories');

    console.log('API Response:', data);

    dispatch({
      type: CATEGORIES_LIST_SUCCESS,
      payload: data, // Dispatch the fetched data
    });
  } catch (error: any) {
    dispatch({
      type: CATEGORIES_LIST_FAIL,
      payload: error.response?.data?.message || error.message,
    });
  }
};

export const createProduct =
  (productData: any, image: File) => async (dispatch: AppDispatch) => {
    try {
      dispatch({ type: PRODUCT_CREATE_REQUEST });

      // Create a FormData object to send the product data and image together
      const formData = new FormData();

      // Append regular product data
      formData.append('name', productData.name);
      formData.append('description', productData.description);
      formData.append('price', productData.price);
      formData.append('stock', productData.stock);
      formData.append('category', productData.category);

      // Append the image file
      formData.append('image', image); // 'image' is the key expected by multer

      // Use the postDataToServer utility function to send the form data
      const response = await postDataToServer(
        'api/products/createProduct',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data', // Ensure the request is sent as form-data
          },
        }
      );

      dispatch({ type: PRODUCT_CREATE_SUCCESS, payload: response });
    } catch (error: any) {
      dispatch({
        type: PRODUCT_CREATE_FAIL,
        payload: error.response?.data?.message || error.message,
      });
    }
  };
