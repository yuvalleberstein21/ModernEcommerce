import { Plus, Heart } from 'lucide-react';
import Chair2 from '../assets/chairCategory2.png';
import { Link } from 'react-router-dom';
const ProductCard = () => {
  const productId = 1;
  return (
    <Link to={`/product/${productId}`}>
      <div className="card bg-gray-100 p-3 rounded-lg cursor-pointer">
        <span>
          <Heart size={20} />
        </span>
        <img
          src={Chair2}
          alt="Product Image"
          className="w-full h-60 object-cover object-center"
        />
        <div className="card-body">
          <h2 className="text-lg font-semibold text-gray-800">Chair one</h2>
          <p className="text-sm text-gray-600">Product Description</p>
          <div className="flex justify-between">
            <span className="text-sm text-gray-400">$99.99</span>
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
