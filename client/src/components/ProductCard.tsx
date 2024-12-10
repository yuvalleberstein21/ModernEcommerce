import { Heart } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Product } from '../Types';
import AddToCartButton from './AddToCartButton';

interface ProductCardProps {
  product: Product;
}
const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <div className="card bg-gray-100 p-3 rounded-lg">
      <span>
        <Heart size={20} />
      </span>
      <Link to={`/product/${product._id}`}>
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-60 object-cover object-center"
        />
      </Link>
      <div className="card-body">
        <h2 className="text-lg font-semibold text-gray-800">{product.name}</h2>
        <p className="text-sm text-gray-600">{product.description}</p>
        <div className="flex justify-between">
          <span className="text-sm text-gray-400">${product.price}</span>
          <AddToCartButton product={product} />
          {/* <span className="px-2 py-2 bg-gray-200 rounded-full">
              <Plus size={20} />
            </span> */}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
