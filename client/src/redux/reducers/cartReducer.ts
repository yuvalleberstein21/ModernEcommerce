import { CartState } from '../../Types/CartInterface';
import {
  CART_ADD_ITEM,
  CART_CLEAR_ITEMS,
  CART_REMOVE_ITEM,
} from '../constant/CartConstant';

const initialState: CartState = {
  cartItems: [],
  totalItems: 0,
  totalPrice: 0,
};

export const cartReducer = (state = initialState, action): CartState => {
  switch (action.type) {
    case CART_ADD_ITEM: {
      const newItem = action.payload;

      // Check if the item is already in the cart
      const existingItem = state.cartItems.find(
        (item) => item.product === newItem.product
      );

      let updatedCartItems;

      if (existingItem) {
        // Update the quantity of the existing item
        updatedCartItems = state.cartItems.map((item) =>
          item.product === newItem.product
            ? { ...item, quantity: newItem.quantity }
            : item
        );
      } else {
        // Add the new item to the cart
        updatedCartItems = [...state.cartItems, newItem];
      }

      // Recalculate totals
      const totalItems = updatedCartItems.reduce(
        (acc, item) => acc + item.quantity, // Total quantity of all items
        0
      );
      const totalPrice = updatedCartItems.reduce(
        (acc, item) => acc + item.quantity * item.price,
        0
      );

      return {
        ...state,
        cartItems: updatedCartItems,
        totalItems, // Sum of quantities
        totalPrice, // Total price of all items
      };
    }

    case CART_REMOVE_ITEM: {
      const filteredCartItems = state.cartItems.filter(
        (item) => item.product !== action.payload
      );

      // Recalculate totals
      const totalItems = filteredCartItems.reduce(
        (acc, item) => acc + item.quantity,
        0
      );
      const totalPrice = filteredCartItems.reduce(
        (acc, item) => acc + item.quantity * item.price,
        0
      );

      return {
        ...state,
        cartItems: filteredCartItems,
        totalItems,
        totalPrice,
      };
    }

    case CART_CLEAR_ITEMS:
      return {
        ...state,
        cartItems: [],
        totalItems: 0,
        totalPrice: 0,
      };

    default:
      return state;
  }
};
// export const cartReducer = (state = initialState, action): CartState => {
//   switch (action.type) {
//     case CART_ADD_ITEM:
//       const newItem = action.payload;

//       // Check if the item is already in the cart
//       const existingItem = state.cartItems.find(
//         (item) => item.product === newItem.product
//       );

//       if (existingItem) {
//         // Replace the existing item with the new one (update quantity)
//         return {
//           ...state,
//           cartItems: state.cartItems.map((item) =>
//             item.product === newItem.product
//               ? { ...item, quantity: newItem.quantity }
//               : item
//           ),
//           totalItems: state.cartItems.reduce(
//             (acc, item) => acc + item.quantity,
//             0
//           ),
//           totalPrice: state.cartItems.reduce(
//             (acc, item) => acc + item.quantity * item.price,
//             0
//           ),
//         };
//       } else {
//         // Add new item to the cart
//         return {
//           ...state,
//           cartItems: [...state.cartItems, newItem],
//           totalItems:
//             state.cartItems.reduce((acc, item) => acc + item.quantity, 0) + 1,
//           totalPrice:
//             state.cartItems.reduce(
//               (acc, item) => acc + item.quantity * item.price,
//               0
//             ) +
//             newItem.price * newItem.quantity,
//         };
//       }

//     case CART_REMOVE_ITEM:
//       const filteredCartItems = state.cartItems.filter(
//         (item) => item.product !== action.payload
//       );
//       return {
//         ...state,
//         cartItems: filteredCartItems,
//         totalItems: filteredCartItems.reduce(
//           (acc, item) => acc + item.quantity,
//           0
//         ),
//         totalPrice: filteredCartItems.reduce(
//           (acc, item) => acc + item.quantity * item.price,
//           0
//         ),
//       };

//     case CART_CLEAR_ITEMS:
//       return {
//         ...state,
//         cartItems: [],
//         totalItems: 0,
//         totalPrice: 0,
//       };

//     default:
//       return state;
//   }
// };
