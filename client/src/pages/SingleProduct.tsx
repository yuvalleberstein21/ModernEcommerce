import { useEffect, useState } from 'react';
import { Heart, Star, ShoppingCart, Truck, Shield } from 'lucide-react';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../hooks/reduxHooks';
import { RootState } from '../redux/store';
import { singleProductDetails } from '../redux/actions/productActions';
import ProductLoader from '../components/ProductLoader';
import { addToCart } from '../redux/actions/cartActions';

const SingleProduct: React.FC = () => {
  window.scrollTo(0, 0);
  const [quantity, setQuantity] = useState(1);
  const dispatch = useAppDispatch();
  const { productId } = useParams<{ productId: string }>();

  const { product, loading, error } = useAppSelector(
    (state: RootState) => state.product
  );
  console.log(product);

  useEffect(() => {
    if (productId) {
      console.log(productId);

      dispatch(singleProductDetails(productId));
    }
  }, [dispatch, productId]);

  const handleAddToCart = () => {
    if (!product.product) return;

    if (quantity > product.product.stock) {
      alert('Insufficient stock available');
      return;
    }

    dispatch(
      addToCart(
        {
          product: product.product._id,
          name: product.product.name,
          image: product.product.image,
          price: product.product.price,
          stock: product.product.stock,
        },
        quantity
      )
    );
  };

  if (loading) return <ProductLoader />;
  if (error) return <div className="container py-8 text-red-600">{error}</div>;
  if (!product.product)
    return <div className="container py-8">Product not found</div>;

  const { name, image, price, description, stock, rating, reviews } =
    product.product;

  return (
    <div className="container">
      <div className="pt-10 max-w-6xl mx-auto grid md:grid-cols-2 gap-8">
        <div className="border rounded-lg overflow-hidden">
          <img
            src={image}
            alt={name}
            className="w-full h-[500px] object-cover"
          />
        </div>

        <div>
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold">{name}</h1>
            <button
              className="text-gray-500 hover:text-red-500"
              aria-label="Add to wishlist"
            >
              <Heart size={24} />
            </button>
          </div>

          <div className="flex items-center space-x-4 mb-4">
            <span className="text-2xl font-bold text-blue-600">
              ${price.toFixed(2)}
            </span>
            <div className="flex items-center">
              <div className="flex text-yellow-500">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={20}
                    fill={i < Math.floor(rating) ? 'currentColor' : 'none'}
                    aria-hidden="true"
                  />
                ))}
              </div>
              <span className="ml-2 text-gray-600">
                ({rating.toFixed(1)} | {reviews} reviews)
              </span>
            </div>
          </div>

          <p className="text-gray-700 mb-4">{description}</p>

          <div className="flex items-center space-x-4 mb-4">
            {stock > 0 ? (
              <>
                <div className="flex items-center border rounded">
                  <button
                    onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
                    className="px-3 py-1 text-gray-600 hover:bg-gray-100"
                    aria-label="Decrease quantity"
                  >
                    -
                  </button>
                  <span className="px-4">{quantity}</span>
                  <button
                    onClick={() =>
                      setQuantity((prev) => Math.min(stock, prev + 1))
                    }
                    className="px-3 py-1 text-gray-600 hover:bg-gray-100"
                    aria-label="Increase quantity"
                  >
                    +
                  </button>
                </div>
                <button
                  onClick={handleAddToCart}
                  className="flex items-center bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
                >
                  <ShoppingCart size={20} className="mr-2" /> Add to Cart
                </button>
              </>
            ) : (
              <span className="bg-red-100 text-red-600 items-center text-xs font-semibold px-3 py-3 rounded-full">
                Out of Stock
              </span>
            )}
          </div>

          <div className="mt-4 bg-green-50 p-4 rounded-lg flex items-center space-x-4">
            <Truck className="text-green-600" aria-hidden="true" />
            <div>
              <p className="font-semibold text-green-800">Free Shipping</p>
              <p className="text-sm text-green-700">
                Arrives in 3-5 business days
              </p>
            </div>
            <Shield className="text-green-600 ml-auto" aria-hidden="true" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleProduct;
