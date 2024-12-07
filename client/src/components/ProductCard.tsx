import { Plus, Heart } from 'lucide-react';

import { Link } from 'react-router-dom';
const ProductCard = ({ product }) => {
  return (
    <Link to={`/product/${product._id}`}>
      <div className="card bg-gray-100 p-3 rounded-lg cursor-pointer">
        <span>
          <Heart size={20} />
        </span>
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-60 object-cover object-center"
        />
        <div className="card-body">
          <h2 className="text-lg font-semibold text-gray-800">
            {product.name}
          </h2>
          <p className="text-sm text-gray-600">{product.description}</p>
          <div className="flex justify-between">
            <span className="text-sm text-gray-400">${product.price}</span>
            <span className="px-2 py-2 bg-gray-200 rounded-full">
              <Plus size={20} />
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;