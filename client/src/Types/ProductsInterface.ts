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

export interface ProductState {
  products: Product[];
  loading: boolean;
  error: string | null;
  total: number;
  totalPages: number;
  currentPage: number;
}

export interface SingleProductState {
  product: Product | null;
  loading: boolean;
  error: string | null;
}

export interface CategoriesState {
  categories: string[];
  loading: boolean;
  error: string | null;
}

export interface CreateProductState {
  product: Product | null;
  loading: boolean;
  error: string | null;
  success: boolean;
}
