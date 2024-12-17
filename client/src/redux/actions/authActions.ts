import { postDataToServer } from '../../utils/Api';
import {
  CLEAR_LOGIN_ERROR,
  USER_LOGIN_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT,
  USER_REGISTER_FAIL,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
} from '../constant/AuthConstant';
import { CART_CLEAR_ITEMS } from '../constant/CartConstant';
import { AppDispatch } from '../store';

export const login =
  (email: string, password: string | number) =>
  async (dispatch: AppDispatch) => {
    try {
      dispatch({ type: USER_LOGIN_REQUEST });

      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };

      const data = await postDataToServer(
        `api/auth/login`,
        { email, password },
        config
      );

      dispatch({
        type: USER_LOGIN_SUCCESS,
        payload: data,
      });
    } catch (error: any) {
      const errorMessage =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;

      dispatch({
        type: USER_LOGIN_FAIL,
        payload: errorMessage,
      });

      // Re-throw the error to be caught in the component
      throw new Error(errorMessage);
    }
  };

export const registerUser =
  (name: string, email: string, password: string | number) =>
  async (dispatch: AppDispatch) => {
    try {
      dispatch({ type: USER_REGISTER_REQUEST });
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };
      const data = await postDataToServer(
        `api/auth/register`,
        { name, email, password },
        config
      );
      dispatch({ type: USER_REGISTER_SUCCESS, payload: data });
      dispatch({ type: USER_LOGIN_SUCCESS, payload: data });
    } catch (error: any) {
      dispatch({
        type: USER_REGISTER_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const logout = () => (dispatch: AppDispatch) => {
  dispatch({ type: USER_LOGOUT });
  // dispatch({ type: USER_DETAILS_RESET });
  dispatch({ type: CART_CLEAR_ITEMS });
};

export const clearLoginError = () => ({
  type: CLEAR_LOGIN_ERROR,
});
