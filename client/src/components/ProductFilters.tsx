import { useState } from 'react';

const ProductFilters = ({ filterOptions, onApplyFilters }) => {
  const [filters, setFilters] = useState({
    category: '',
    minPrice: 0,
    maxPrice: 2000,
    stock: false,
  });

  const updateFilter = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <div className="flex items-center gap-4 mb-4">
        <select
          value={filters.category}
          onChange={(e) => updateFilter('category', e.target.value)}
          className="h-10 rounded-md border border-gray-300 px-3 focus:border-blue-500 focus:ring-1"
        >
          <option value="">All Categories</option>
          {filterOptions.categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>

        <input
          type="number"
          placeholder="Min Price"
          value={filters.minPrice}
          onChange={(e) => updateFilter('minPrice', Number(e.target.value))}
          className="h-10 w-24 rounded-md border border-gray-300 px-3 focus:border-blue-500 focus:ring-1"
        />

        <input
          type="number"
          placeholder="Max Price"
          value={filters.maxPrice}
          onChange={(e) => updateFilter('maxPrice', Number(e.target.value))}
          className="h-10 w-24 rounded-md border border-gray-300 px-3 focus:border-blue-500 focus:ring-1"
        />

        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={filters.stock}
            onChange={(e) => updateFilter('stock', e.target.checked)}
            className="h-4 w-4 rounded border-gray-300 text-blue-600"
          />
          <span className="text-sm text-gray-600">In Stock</span>
        </label>

        <button
          onClick={() => onApplyFilters(filters)}
          className="bg-blue-500 text-white px-4 h-10 rounded-md hover:bg-blue-600"
        >
          Apply Filters
        </button>
      </div>
    </div>
  );
};

export default ProductFilters;
