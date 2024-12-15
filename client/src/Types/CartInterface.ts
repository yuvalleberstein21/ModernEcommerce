export interface CartItem {
  product: string;
  name: string;
  image: string;
  price: number;
  quantity: number;
  stock: number;
}

export interface CartState {
  cartItems: CartItem[];
  totalItems: number;
  totalPrice: number;
}
