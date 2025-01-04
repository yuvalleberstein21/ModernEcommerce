import { RefreshCcw } from 'lucide-react';
import ProductCard from './ProductCard';
import { Product } from '../Types';

interface ProductGridProps {
  products: Product[];
}

const ProductGrid = ({ products }: ProductGridProps) => {
  if (products.length === 0) {
    return (
      <div className="text-center py-10 bg-gray-100 rounded">
        <RefreshCcw size={48} className="mx-auto mb-4 text-gray-500" />
        <p className="text-xl text-gray-600">
          No products found matching your filters.
        </p>
      </div>
    );
  }

  return (
    <div className="grid md:grid-cols-3 gap-6">
      {products.map((product) => (
        <ProductCard product={product} key={product._id} />
      ))}
    </div>
  );
};

export default ProductGrid;
