import {
  CART_ADD_ITEM,
  CART_CLEAR_ITEMS,
  CART_REMOVE_ITEM,
} from '../constant/CartConstant';

export interface CartItem {
  product: string;
  name: string;
  image: string;
  price: number;
  quantity: number;
  stock: number;
}

interface CartState {
  cartItems: CartItem[];
  totalItems: number;
  totalPrice: number;
}

const initialState: CartState = {
  cartItems: [],
  totalItems: 0,
  totalPrice: 0,
};

export const cartReducer = (state = initialState, action): CartState => {
  switch (action.type) {
    case CART_ADD_ITEM:
      const newItem = action.payload;

      // Check if the item is already in the cart
      const existingItem = state.cartItems.find(
        (item) => item.product === newItem.product
      );

      if (existingItem) {
        // Update quantity if item already exists
        return {
          ...state,
          cartItems: state.cartItems.map((item) =>
            item.product === existingItem.product ? newItem : item
          ),
        };
      } else {
        // Add new item to the cart
        return {
          ...state,
          cartItems: [...state.cartItems, newItem],
        };
      }

    case CART_REMOVE_ITEM:
      return {
        ...state,
        cartItems: state.cartItems.filter(
          (item) => item.product !== action.payload
        ),
      };

    case CART_CLEAR_ITEMS:
      return {
        ...state,
        cartItems: [],
      };

    default:
      return state;
  }
};
