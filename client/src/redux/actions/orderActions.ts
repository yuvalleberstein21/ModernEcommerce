import { getDataFromServer, postDataToServer } from '../../utils/Api';
import { CART_CLEAR_ITEMS } from '../constant/CartConstant';
import {
  ORDER_CREATE_FAIL,
  ORDER_CREATE_REQUEST,
  ORDER_CREATE_SUCCESS,
  ORDER_DETAILS_FAIL,
  ORDER_DETAILS_REQUEST,
  ORDER_DETAILS_SUCCESS,
} from '../constant/OrderConstant';
import { AppDispatch } from '../store';
import { logout } from './authActions';

export const createOrder =
  (order) => async (dispatch: AppDispatch, getState) => {
    try {
      dispatch({ type: ORDER_CREATE_REQUEST });

      const { userInfo } = getState();

      if (!userInfo || !userInfo.userInfo.token) {
        throw new Error('User is not authenticated');
      }

      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userInfo.userInfo.token}`,
        },
      };

      const data = await postDataToServer(`api/orders`, order, config);
      dispatch({ type: ORDER_CREATE_SUCCESS, payload: data });
      dispatch({ type: CART_CLEAR_ITEMS, payload: data });

      // localStorage.removeItem("cartItems");
    } catch (error: any) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      if (message === 'Not authorized, token failed') {
        dispatch(logout());
      }

      dispatch({
        type: ORDER_CREATE_FAIL,
        payload: message,
      });
    }
  };

// ORDER DETAILS
export const getOrderDetails =
  (id: string) => async (dispatch: AppDispatch, getState) => {
    try {
      dispatch({ type: ORDER_DETAILS_REQUEST });

      const { userInfo } = getState();

      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.userInfo.token}`,
        },
      };
      const data = await getDataFromServer(`api/orders/${id}`, config);
      dispatch({ type: ORDER_DETAILS_SUCCESS, payload: data });
    } catch (error: any) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      if (message === 'Not authorized, token failed') {
        dispatch(logout());
      }

      dispatch({
        type: ORDER_DETAILS_FAIL,
        payload: message,
      });
    }
  };
