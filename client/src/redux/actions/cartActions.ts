import { CART_ADD_ITEM } from '../constant/CartConstant';
import { AppDispatch } from '../store';
import { CartItem } from '../../Types';

export const addToCart =
  (product: CartItem, qty: number) => (dispatch: AppDispatch) => {
    // Add quantity to the product object
    const cartItem = { ...product, quantity: qty };

    dispatch({
      type: CART_ADD_ITEM,
      payload: cartItem,
    });
  };

// REMOVE PRODUCT FROM CART
// export const removeFromCart = (id) => async (dispatch, getState) => {
//   dispatch({
//     type: CART_REMOVE_ITEM,
//     payload: id,
//   });
//   localStorage.removeItem(
//     'cartItems',
//     JSON.stringify(getState().cart.cartItems)
//   );
// };
