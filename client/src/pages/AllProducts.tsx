import { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../hooks/reduxHooks';
import { productList } from '../redux/actions/productActions';
import ProductFilters from '../components/ProductFilters';
import ProductGrid from '../components/ProductGrid';
import Pagination from '../utils/Pagination';
import LoaderAllProducts from '../components/LoaderAllProducts';
import { RootState } from '../redux/store';

const AllProducts = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [sortBy, setSortBy] = useState('default');
  const currentPage = Number(searchParams.get('page')) || 1;
  const dispatch = useAppDispatch();

  const {
    products = [],
    loading,
    error,
    totalPages = 1,
  } = useAppSelector((state: RootState) => state.products);

  const filterOptions = useMemo(
    () => ({
      categories: [...new Set(products.map((p) => p.category))],
      brands: [...new Set(products.map((p) => p.brand))],
    }),
    [products]
  );

  const handleApplyFilters = (filters) => {
    const category = searchParams.get('category') || '';
    dispatch(
      productList({
        category,
        page: currentPage,
        limit: 6,
        ...filters,
        sort: sortBy,
      })
    );
  };

  const handlePageChange = (page: number) => {
    setSearchParams((prev) => {
      prev.set('page', page.toString());
      return prev;
    });
  };

  useEffect(() => {
    const category = searchParams.get('category') || '';
    dispatch(
      productList({
        category,
        page: currentPage,
        limit: 6,
        sort: sortBy,
      })
    );
  }, [dispatch, searchParams, currentPage, sortBy]);

  return (
    <div className="container mx-auto px-4 py-8">
      <ProductFilters
        filterOptions={filterOptions}
        onApplyFilters={handleApplyFilters}
      />

      {loading ? (
        <LoaderAllProducts />
      ) : error ? (
        <div>{error}</div>
      ) : (
        <>
          <ProductGrid products={products} />
          {totalPages > 1 && (
            <div className="mt-5">
              <Pagination
                totalPages={totalPages}
                currentPage={currentPage}
                onPageChange={handlePageChange}
              />
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default AllProducts;
