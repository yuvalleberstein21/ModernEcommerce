import { postDataToServer } from '../../utils/Api';
import {
  USER_LOGIN_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
} from '../constant/AuthConstant';
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
