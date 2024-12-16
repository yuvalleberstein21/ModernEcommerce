import { CART_ADD_ITEM, CART_REMOVE_ITEM } from '../constant/CartConstant';
import { AppDispatch, RootState } from '../store';
import { CartItem } from '../../Types/CartInterface';

export const addToCart =
  (product: CartItem, qty: number = 1) =>
  (dispatch: AppDispatch, getState: () => RootState) => {
    const { cartItems } = getState().cart;

    // Check if the product is already in the cart
    const existingCartItem = cartItems.find(
      (item) => item.product === product.product
    );

    if (existingCartItem) {
      // If the item exists, update its quantity
      const updatedItem = {
        ...existingCartItem,
        quantity: existingCartItem.quantity + qty,
      };

      dispatch({
        type: CART_ADD_ITEM,
        payload: updatedItem,
      });
    } else {
      // Add the new item with the specified quantity
      const newCartItem = { ...product, quantity: qty };

      dispatch({
        type: CART_ADD_ITEM,
        payload: newCartItem,
      });
    }
  };

export const removeFromCart = (id: string) => async (dispatch: AppDispatch) => {
  dispatch({
    type: CART_REMOVE_ITEM,
    payload: id,
  });
};
