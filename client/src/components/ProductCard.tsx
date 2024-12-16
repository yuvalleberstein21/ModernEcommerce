import { Heart } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Product } from '../Types';
import AddToCartButton from './AddToCartButton';

interface ProductCardProps {
  product: Product;
}
const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <div className="card bg-gray-100 p-3 rounded-lg h-full">
      <span>
        <Heart size={20} />
      </span>
      <Link to={`/product/${product._id}`}>
        <div className="w-full h-60 relative rounded-lg overflow-hidden bg-gray-200 mt-2">
          <img
            src={product.image}
            alt={product.name}
            className="absolute top-0 left-0 w-full h-full object-cover"
          />
        </div>
      </Link>
      <div className="card-body mt-2">
        <h2 className="text-lg font-semibold text-gray-800">{product.name}</h2>
        <p className="text-sm text-gray-600">{product.description}</p>
        <div className="flex justify-between">
          <span className="text-md text-gray-600 font-semibold mt-3">
            ${product.price}
          </span>
          {product.stock > 0 ? (
            <AddToCartButton product={product} />
          ) : (
            <span className="bg-red-100 text-red-600 items-center text-xs font-semibold px-3 py-3 rounded-full">
              Out of Stock
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
