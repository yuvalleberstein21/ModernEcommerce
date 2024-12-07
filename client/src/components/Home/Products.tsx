import { MoveRight } from 'lucide-react';
import Title from '../Title';
import ProductCard from '../ProductCard';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks';
import { useEffect } from 'react';
import { fetchProducts } from '../../redux/slices/productsSlice';
import { RootState } from '../../redux/store';

const Products: React.FC = () => {
  const dispatch = useAppDispatch();
  const { items, loading, error } = useAppSelector(
    (state: RootState) => state.products
  );

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  console.log(items);

  return (
    <>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      <Title title="Main Products" />
      <div className="grid md:grid-cols-3 lg:grid-cols-3 grid-cols-2 gap-3 mt-6">
        {items.products?.map((prod) => (
          <ProductCard key={prod._id} product={prod} />
        ))}
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
