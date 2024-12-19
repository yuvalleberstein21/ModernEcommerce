import { User } from '../../Types';
import {
  CLEAR_LOGIN_ERROR,
  USER_LOGIN_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT,
  USER_PROFILE_DETAILS_FAIL,
  USER_PROFILE_DETAILS_REQUEST,
  USER_PROFILE_DETAILS_RESET,
  USER_PROFILE_DETAILS_SUCCESS,
  USER_REGISTER_FAIL,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
} from '../constant/AuthConstant';

interface UserState {
  user: User | null;
}

const initialState: UserState = {
  user: null,
};

export const userLoginReducer = (state = initialState, action) => {
  switch (action.type) {
    case USER_LOGIN_REQUEST:
      return { loading: true, error: null };

    case USER_LOGIN_SUCCESS:
      return { loading: false, userInfo: action.payload, error: null };

    case USER_LOGIN_FAIL:
      return { loading: false, error: action.payload };

    case USER_LOGOUT:
      return {};

    case CLEAR_LOGIN_ERROR:
      return { ...state, error: null };

    default:
      return state;
  }
};

export const userRegisterReducer = (state = initialState, action) => {
  switch (action.type) {
    case USER_REGISTER_REQUEST:
      return { loading: true, error: null };

    case USER_REGISTER_SUCCESS:
      return { loading: false, userInfo: action.payload, error: null };

    case USER_REGISTER_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};

export const userProfileDetailsReducer = (state = initialState, action) => {
  switch (action.type) {
    case USER_PROFILE_DETAILS_REQUEST:
      return { ...state, loading: true };

    case USER_PROFILE_DETAILS_SUCCESS:
      return { loading: false, user: action.payload };

    case USER_PROFILE_DETAILS_FAIL:
      return { loading: false, error: action.payload };

    case USER_PROFILE_DETAILS_RESET:
      return {};

    default:
      return state;
  }
};
