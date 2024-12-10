export interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
  stock?: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  role: 'admin' | 'user';
}

export interface CartItem {
  _id?: string;
  product: string;
  name: string;
  image: string;
  price: number;
  quantity: number;
  stock: number;
}

export interface ApiError {
  message: string;
}
