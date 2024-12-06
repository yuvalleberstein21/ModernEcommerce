import { MoveRight } from 'lucide-react';
import Title from '../Title';
import ProductCard from '../ProductCard';

const Products = () => {
  return (
    <>
      <Title title="Main Products" />
      <div className="grid md:grid-cols-3 lg:grid-cols-3 grid-cols-2 gap-3 mt-6">
        <ProductCard />
      </div>

      <div className="mt-6 text-right">
        <h3 className="flex items-center justify-end text-lg font-semibold">
          ALL PRODUCTS
          <span className="px-2 text-gray-600">
            <MoveRight size={20} />
          </span>
        </h3>
      </div>
    </>
  );
};

export default Products;
