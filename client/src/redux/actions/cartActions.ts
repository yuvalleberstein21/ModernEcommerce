import { CART_ADD_ITEM, CART_REMOVE_ITEM } from '../constant/CartConstant';
import { AppDispatch, RootState } from '../store';
import { CartItem } from '../../Types/CartInterface';

export const addToCart =
  (product: CartItem, qty: number = 1) =>
  (dispatch: AppDispatch, getState: () => RootState) => {
    // Get the current cart items from the state
    const { cartItems } = getState().cart;

    // Check if the product is already in the cart
    const existingCartItem = cartItems.find(
      (item) => item.product === product.product
    );

    if (existingCartItem) {
      // If the item exists, increment its quantity
      const updatedItem = {
        ...product,
        quantity: existingCartItem.quantity + qty, // Increment by qty
      };

      dispatch({
        type: CART_ADD_ITEM,
        payload: updatedItem,
      });
    } else {
      // If it's a new item, add it to the cart with the specified quantity
      const cartItem = { ...product, quantity: qty };

      dispatch({
        type: CART_ADD_ITEM,
        payload: cartItem,
      });
    }
  };

export const removeFromCart = (id: string) => async (dispatch: AppDispatch) => {
  dispatch({
    type: CART_REMOVE_ITEM,
    payload: id,
  });
};
