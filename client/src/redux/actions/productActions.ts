import { Product } from '../../Types';
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

// Fetch Product List
export const productList =
  (queries: {
    category?: string;
    page?: number;
    limit?: number;
    [key: string]: any;
  }) =>
  async (dispatch: AppDispatch) => {
    try {
      dispatch({ type: PRODUCT_LIST_REQUEST });

      // Construct query string from the queries object
      const queryString = new URLSearchParams(
        Object.entries(queries)
          .filter(
            ([_, value]) =>
              value !== undefined &&
              value !== '' &&
              value !== 'default' &&
              value !== false &&
              value !== 0 // Exclude unwanted default values
          )
          .map(([key, value]) => [key, String(value)]) // Convert values to strings
      ).toString();
      console.log('Query String:', queryString);

      const url = `api/products${queryString ? `?${queryString}` : ''}`;
      console.log('Generated URL:', url);

      // Fetch data from the server
      const data = await getDataFromServer(url);

      // Dispatch success action with payload
      dispatch({
        type: PRODUCT_LIST_SUCCESS,
        payload: data,
      });
    } catch (error: any) {
      // Dispatch failure action with error message
      dispatch({
        type: PRODUCT_LIST_FAIL,
        payload:
          error.response?.data?.message || error.message || 'An error occurred',
      });
    }
  };

// Fetch Single Product
export const singleProductDetails =
  (id: string | number) => async (dispatch: AppDispatch) => {
    try {
      dispatch({ type: SINGLE_PRODUCT_REQUEST });

      // Use query parameter as per your controller
      const data = await getDataFromServer<Product>(
        `api/products?productId=${id}`
      );

      // The data already contains the nested product structure
      dispatch({
        type: SINGLE_PRODUCT_SUCCESS,
        payload: data, // This will be { product: { ... } }
      });
    } catch (error: any) {
      dispatch({
        type: SINGLE_PRODUCT_FAIL,
        payload:
          error.response?.data?.message ||
          error.message ||
          'Error retrieving product',
      });
    }
  };

// Fetch Categories List
export const categoriesList = () => async (dispatch: AppDispatch) => {
  try {
    dispatch({ type: CATEGORIES_LIST_REQUEST });

    const data = await getDataFromServer('api/products/categories');

    if (data) {
      dispatch({
        type: CATEGORIES_LIST_SUCCESS,
        payload: data,
      });
    } else {
      console.log('some error');
    }
  } catch (error: any) {
    dispatch({
      type: CATEGORIES_LIST_FAIL,
      payload: error.response?.data?.message || error.message,
    });
  }
};

// Create Product
export const createProduct =
  (productData: any, image: File) => async (dispatch: AppDispatch) => {
    try {
      dispatch({ type: PRODUCT_CREATE_REQUEST });

      const formData = new FormData();
      Object.entries(productData).forEach(([key, value]) =>
        formData.append(key, value)
      );
      formData.append('image', image);

      const response = await postDataToServer(
        'api/products/createProduct',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
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
