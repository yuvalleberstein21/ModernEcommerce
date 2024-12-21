import {
  ORDER_CREATE_FAIL,
  ORDER_CREATE_REQUEST,
  ORDER_CREATE_RESET,
  ORDER_CREATE_SUCCESS,
  ORDER_DETAILS_FAIL,
  ORDER_DETAILS_REQUEST,
  ORDER_DETAILS_SUCCESS,
} from '../constant/OrderConstant';

const initialState = {
  order: [],
  loading: false,
  error: null,
  success: false,
};

export const orderCreateReducer = (state = initialState, action) => {
  switch (action.type) {
    case ORDER_CREATE_REQUEST:
      return { loading: true, error: null };

    case ORDER_CREATE_SUCCESS:
      return {
        loading: false,
        success: true,
        order: action.payload,
        error: null,
      };

    case ORDER_CREATE_FAIL:
      return { loading: false, error: action.payload };

    case ORDER_CREATE_RESET:
      return {};

    default:
      return state;
  }
};

// ORDER DETAILS
export const orderDetailsReducer = (state = initialState, action) => {
  switch (action.type) {
    case ORDER_DETAILS_REQUEST:
      return { ...state, loading: true, error: null };

    case ORDER_DETAILS_SUCCESS:
      return { loading: false, order: action.payload, error: null };

    case ORDER_DETAILS_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};
