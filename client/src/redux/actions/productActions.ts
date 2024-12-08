import { getDataFromServer } from '../../utils/Api';
import {
  PRODUCT_LIST_FAIL,
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
  SINGLE_PRODUCT_FAIL,
  SINGLE_PRODUCT_REQUEST,
  SINGLE_PRODUCT_SUCCESS,
} from '../constant/ProductConstant';
import { AppDispatch } from '../store';

export const productList = () => async (dispatch: AppDispatch) => {
  try {
    dispatch({ type: PRODUCT_LIST_REQUEST });

    const data = await getDataFromServer('api/products');

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
