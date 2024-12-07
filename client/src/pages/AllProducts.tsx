import { useState, useMemo } from 'react';
import {
  Filter,
  ShoppingCart,
  Star,
  ChevronDown,
  RefreshCcw,
  ChevronUp,
} from 'lucide-react';
import ProductCard from '../components/ProductCard';

const AllProducts = () => {
  const products = [
    {
      id: 1,
      name: 'Modern Leather Sofa',
      price: 1299.99,
      category: 'Sofas',
      brand: 'Urban Living',
      rating: 4.5,
      color: 'Brown',
      inStock: true,
      image: '/api/placeholder/300/200',
    },
    {
      id: 2,
      name: 'Minimalist Dining Table',
      price: 799.5,
      category: 'Tables',
      brand: 'Nordic Design',
      rating: 4.7,
      color: 'White',
      inStock: true,
      image: '/api/placeholder/300/200',
    },
    {
      id: 3,
      name: 'Ergonomic Office Chair',
      price: 349.99,
      category: 'Chairs',
      brand: 'WorkPro',
      rating: 4.2,
      color: 'Black',
      inStock: false,
      image: '/api/placeholder/300/200',
    },
    {
      id: 4,
      name: 'Classic Wooden Bookshelf',
      price: 599.0,
      category: 'Storage',
      brand: 'Timber Craft',
      rating: 4.6,
      color: 'Oak',
      inStock: true,
      image: '/api/placeholder/300/200',
    },
    {
      id: 5,
      name: 'Scandinavian Armchair',
      price: 449.99,
      category: 'Chairs',
      brand: 'Nordic Living',
      rating: 4.8,
      color: 'Gray',
      inStock: true,
      image: '/api/placeholder/300/200',
    },
  ];
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

  // Derived filter options
  const filterOptions = useMemo(
    () => ({
      categories: [...new Set(products.map((p) => p.category))],
      brands: [...new Set(products.map((p) => p.brand))],
    }),
    [products]
  );

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    return products
      .filter((product) => {
        const categoryMatch =
          filters.category.length === 0 ||
          filters.category.includes(product.category);

        const brandMatch =
          filters.brand.length === 0 || filters.brand.includes(product.brand);

        const priceMatch =
          product.price >= filters.minPrice &&
          product.price <= filters.maxPrice;

        const stockMatch = !filters.inStock || product.inStock;

        const ratingMatch = product.rating >= filters.rating;

        return (
          categoryMatch && brandMatch && priceMatch && stockMatch && ratingMatch
        );
      })
      .sort((a, b) => {
        switch (sortBy) {
          case 'priceAsc':
            return a.price - b.price;
          case 'priceDesc':
            return b.price - a.price;
          case 'ratingDesc':
            return b.rating - a.rating;
          default:
            return 0;
        }
      });
  }, [products, filters, sortBy]);

  // Filter update handlers
  const updateCategoryFilter = (category) => {
    setFilters((prev) => ({
      ...prev,
      category: prev.category.includes(category)
        ? prev.category.filter((c) => c !== category)
        : [...prev.category, category],
    }));
  };

  const updateBrandFilter = (brand) => {
    setFilters((prev) => ({
      ...prev,
      brand: prev.brand.includes(brand)
        ? prev.brand.filter((b) => b !== brand)
        : [...prev.brand, brand],
    }));
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Our Products</h1>

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

      {/* Expandable Filters */}
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

      {/* Products Grid */}
      <div className="grid md:grid-cols-3 gap-6">
        {filteredProducts.map((product) => (
          //   <div
          //     key={product.id}
          //     className="border rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow"
          //   >
          //     <img
          //       src={product.image}
          //       alt={product.name}
          //       className="w-full h-48 object-cover"
          //     />
          //     <div className="p-4">
          //       <div className="flex justify-between items-center mb-2">
          //         <h3 className="text-xl font-semibold">{product.name}</h3>
          //         <span className="text-blue-600 font-bold">
          //           ${product.price.toFixed(2)}
          //         </span>
          //       </div>
          //       <div className="flex justify-between items-center">
          //         <div className="flex items-center">
          //           {[1, 2, 3, 4, 5].map((star) => (
          //             <Star
          //               key={star}
          //               size={16}
          //               fill={star <= product.rating ? 'currentColor' : 'none'}
          //               className="text-yellow-500"
          //             />
          //           ))}
          //           <span className="ml-2 text-gray-600">({product.rating})</span>
          //         </div>
          //         <button
          //           disabled={!product.inStock}
          //           className={`flex items-center px-3 py-1 rounded ${
          //             product.inStock
          //               ? 'bg-blue-600 text-white hover:bg-blue-700'
          //               : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          //           }`}
          //         >
          //           <ShoppingCart size={16} className="mr-2" />
          //           {product.inStock ? 'Add to Cart' : 'Out of Stock'}
          //         </button>
          //       </div>
          //     </div>
          //   </div>
          <ProductCard key={product.id} />
        ))}
      </div>

      {/* No Products Found */}
      {filteredProducts.length === 0 && (
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
