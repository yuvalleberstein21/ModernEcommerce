import { useState, useMemo, useEffect } from 'react';
import {
  Filter,
  ShoppingCart,
  Star,
  ChevronDown,
  RefreshCcw,
  ChevronUp,
} from 'lucide-react';
import ProductCard from '../components/ProductCard';
import { useAppDispatch, useAppSelector } from '../hooks/reduxHooks';
import { RootState } from '../redux/store';
import { productList } from '../redux/actions/productActions';
import { useSearchParams } from 'react-router-dom';
import LoaderAllProducts from '../components/LoaderAllProducts';
import Pagination from '../utils/Pagination';
import { Product } from '../Types';

const AllProducts = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [totalPages, setTotalPages] = useState(1);
  const currentPage = Number(searchParams.get('page')) || 1;
  const dispatch = useAppDispatch();
  const {
    products = [],
    loading,
    error,
    totalPages: reduxTotalPages = 1, // Add this from the Redux state
  } = useAppSelector((state: RootState) => state.products);

  useEffect(() => {
    const category = searchParams.get('category') || '';
    const page = currentPage;
    const limit = 6;

    dispatch(productList({ category, page, limit }));
  }, [dispatch, searchParams, currentPage]);

  useEffect(() => {
    setTotalPages(reduxTotalPages);
  }, [reduxTotalPages]);

  const handlePageChange = (page: number) => {
    setSearchParams((prev) => {
      prev.set('page', page.toString());
      return prev;
    });
  };

  const [filters, setFilters] = useState({
    category: [],
    brand: [],
    minPrice: 0,
    maxPrice: 2000,
    inStock: false,
    rating: 0,
  });

  const [sortBy, setSortBy] = useState('default');
  const [showFilters, setShowFilters] = useState(false);

  // // Derived filter options
  const filterOptions = useMemo(
    () => ({
      categories: [...new Set(products.map((p) => p.category))],
      brands: [...new Set(products.map((p) => p.brand))],
    }),
    [products]
  );

  if (!products.length) {
    return <p>No products found.</p>;
  }

  // if (loading) return <p>Loading...</p>;
  // if (error) return <p>Error: {error}</p>;

  // // Filter and sort products
  // const filteredProducts = useMemo(() => {
  //   return products
  //     .filter((product) => {
  //       const categoryMatch =
  //         filters.category.length === 0 ||
  //         filters.category.includes(product.category);

  //       const brandMatch =
  //         filters.brand.length === 0 || filters.brand.includes(product.brand);

  //       const priceMatch =
  //         product.price >= filters.minPrice &&
  //         product.price <= filters.maxPrice;

  //       const stockMatch = !filters.inStock || product.inStock;

  //       const ratingMatch = product.rating >= filters.rating;

  //       return (
  //         categoryMatch && brandMatch && priceMatch && stockMatch && ratingMatch
  //       );
  //     })
  //     .sort((a, b) => {
  //       switch (sortBy) {
  //         case 'priceAsc':
  //           return a.price - b.price;
  //         case 'priceDesc':
  //           return b.price - a.price;
  //         case 'ratingDesc':
  //           return b.rating - a.rating;
  //         default:
  //           return 0;
  //       }
  //     });
  // }, [products, filters, sortBy]);

  // // Filter update handlers
  // const updateCategoryFilter = (category) => {
  //   setFilters((prev) => ({
  //     ...prev,
  //     category: prev.category.includes(category)
  //       ? prev.category.filter((c) => c !== category)
  //       : [...prev.category, category],
  //   }));
  // };

  // const updateBrandFilter = (brand) => {
  //   setFilters((prev) => ({
  //     ...prev,
  //     brand: prev.brand.includes(brand)
  //       ? prev.brand.filter((b) => b !== brand)
  //       : [...prev.brand, brand],
  //   }));
  // };

  return (
    // <div>products</div>
    <div className="container mx-auto px-4 py-8">
      {!loading && products.length === 0 && <p>No products found.</p>}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold"> Products</h1>

        {/* Sort & Filter Controls */}
        <div className="flex space-x-4">
          <select
            className="border rounded px-3 py-2"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="default">Default Sorting</option>
            <option value="priceAsc">Price: Low to High</option>
            <option value="priceDesc">Price: High to Low</option>
            <option value="ratingDesc">Top Rated</option>
          </select>

          <button
            className="flex items-center border rounded px-3 py-2"
            onClick={() => setShowFilters(!showFilters)}
          >
            <Filter size={20} className="mr-2" />
            Filters{' '}
            {showFilters ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          </button>
        </div>
      </div>
      {showFilters && (
        <div className="grid md:grid-cols-4 gap-4 mb-6 bg-gray-50 p-4 rounded">
          {/* Category Filter */}
          <div>
            <h3 className="font-semibold mb-2">Categories</h3>
            {filterOptions.categories.map((category) => (
              <label key={category} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={filters.category.includes(category)}
                  onChange={() => updateCategoryFilter(category)}
                />
                <span>{category}</span>
              </label>
            ))}
          </div>

          {/* Brand Filter */}
          <div>
            <h3 className="font-semibold mb-2">Brands</h3>
            {filterOptions.brands.map((brand) => (
              <label key={brand} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={filters.brand.includes(brand)}
                  onChange={() => updateBrandFilter(brand)}
                />
                <span>{brand}</span>
              </label>
            ))}
          </div>

          {/* Price Range Filter */}
          <div>
            <h3 className="font-semibold mb-2">Price Range</h3>
            <div className="flex space-x-2">
              <input
                type="number"
                placeholder="Min"
                className="w-full border rounded px-2 py-1"
                value={filters.minPrice}
                onChange={(e) =>
                  setFilters((prev) => ({
                    ...prev,
                    minPrice: Number(e.target.value),
                  }))
                }
              />
              <input
                type="number"
                placeholder="Max"
                className="w-full border rounded px-2 py-1"
                value={filters.maxPrice}
                onChange={(e) =>
                  setFilters((prev) => ({
                    ...prev,
                    maxPrice: Number(e.target.value),
                  }))
                }
              />
            </div>
          </div>

          {/* Additional Filters */}
          <div>
            <h3 className="font-semibold mb-2">Additional Filters</h3>
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={filters.inStock}
                onChange={() =>
                  setFilters((prev) => ({
                    ...prev,
                    inStock: !prev.inStock,
                  }))
                }
              />
              <span>In Stock Only</span>
            </label>
            <div className="mt-2">
              <span className="font-semibold mr-2">Minimum Rating:</span>
              <div className="flex">
                {[1, 2, 3, 4, 5].map((rating) => (
                  <Star
                    key={rating}
                    size={20}
                    fill={rating <= filters.rating ? 'currentColor' : 'none'}
                    className={`text-yellow-500 cursor-pointer ${
                      rating <= filters.rating
                        ? 'text-opacity-100'
                        : 'text-opacity-30'
                    }`}
                    onClick={() => setFilters((prev) => ({ ...prev, rating }))}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
      {loading ? (
        <LoaderAllProducts />
      ) : error ? (
        <div>{error}</div>
      ) : (
        <>
          <div className="grid md:grid-cols-3 gap-6">
            {products.map((product: Product) => (
              <ProductCard product={product} key={product._id} />
            ))}
          </div>
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

      {products.length === 0 && (
        <div className="text-center py-10 bg-gray-100 rounded">
          <RefreshCcw size={48} className="mx-auto mb-4 text-gray-500" />
          <p className="text-xl text-gray-600">
            No products found matching your filters.
          </p>
        </div>
      )}
    </div>
  );
};

export default AllProducts;
