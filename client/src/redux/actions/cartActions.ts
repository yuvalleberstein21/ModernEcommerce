import { CART_ADD_ITEM } from '../constant/CartConstant';
import { AppDispatch, RootState } from '../store';
import { CartItem } from '../../Types';

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
      dispatch({
        type: CART_ADD_ITEM,
        payload: {
          ...product,
          quantity: existingCartItem.quantity + 1,
        },
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
