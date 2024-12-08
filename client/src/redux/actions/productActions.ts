import axios from 'axios';
import { getDataFromServer } from '../../utils/Api';
import {
  PRODUCT_LIST_FAIL,
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
} from '../constant/ProductConstant';
import { AppDispatch } from '../store';

export const productList = () => async (dispatch: AppDispatch) => {
  try {
    dispatch({ type: PRODUCT_LIST_REQUEST });

    const response = await axios.get('http://localhost:8000/api/products');

    dispatch({
      type: PRODUCT_LIST_SUCCESS,
      payload: response.data,
    });
  } catch (error: any) {
    dispatch({
      type: PRODUCT_LIST_FAIL,
      payload: error.response?.data?.message || error.message,
    });
  }
};
