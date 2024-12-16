import { useEffect, useState } from 'react';
import { Heart, Star, ShoppingCart, Truck, Shield } from 'lucide-react';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../hooks/reduxHooks';
import { RootState } from '../redux/store';
import { singleProductDetails } from '../redux/actions/productActions';
import ProductLoader from '../components/ProductLoader';
import { addToCart } from '../redux/actions/cartActions';

const SingleProduct: React.FC = () => {
  const [quantity, setQuantity] = useState(1);
  const dispatch = useAppDispatch();
  const { productId } = useParams<{ productId: string }>();

  const { product, loading, error } = useAppSelector(
    (state: RootState) => state.product
  );

  useEffect(() => {
    if (productId) {
      dispatch(singleProductDetails(productId));
    }
  }, [dispatch, productId]);

  const handleAddToCart = () => {
    if (quantity > product.product?.stock) {
      alert('Insufficient stock available');
      return;
    }

    dispatch(
      addToCart(
        {
          product: product.product?._id,
          name: product.product?.name,
          image: product.product?.image,
          price: product.product?.price,
          stock: product.product?.stock,
        },
        quantity // Pass the current quantity
      )
    );
  };

  return (
    <div className="container">
      {loading ? (
        <ProductLoader />
      ) : error ? (
        <div>{error}</div>
      ) : (
        <div className="pt-10 max-w-6xl mx-auto grid md:grid-cols-2 gap-8">
          <div className="border rounded-lg overflow-hidden">
            <img
              src={product.product?.image}
              alt={product.product?.name}
              className="w-full h-[500px] object-cover"
            />
          </div>

          {/* Product Details */}
          <div>
            <div className="flex justify-between items-center ">
              <div>
                <h1 className="text-3xl font-bold">{product.product?.name}</h1>
              </div>
              <button className="text-gray-500 hover:text-red-500">
                <Heart size={24} />
              </button>
            </div>

            {/* Price and Rating */}
            <div className="flex items-center space-x-4 mb-4">
              <span className="text-2xl font-bold text-blue-600">
                ${product.product?.price.toFixed(2)}
              </span>
              <div className="flex items-center">
                <div className="flex text-yellow-500">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={20}
                      fill={
                        i < Math.floor(product.product?.rating)
                          ? 'currentColor'
                          : 'none'
                      }
                    />
                  ))}
                </div>
                <span className="ml-2 text-gray-600">
                  ({product.product?.rating} | {product.product?.reviews}{' '}
                  reviews)
                </span>
              </div>
            </div>

            {/* Description */}
            <p className="text-gray-700 mb-4">{product.product?.description}</p>

            {/* Quantity Selector */}
            <div className="flex items-center space-x-4 mb-4">
              <div className="flex items-center border rounded">
                {product.product?.stock > 0 ? (
                  <>
                    <button
                      onClick={() =>
                        setQuantity((prev) => Math.max(1, prev - 1))
                      }
                      className="px-3 py-1 text-gray-600 hover:bg-gray-100"
                    >
                      -
                    </button>
                    <span className="px-4">{quantity}</span>
                    <button
                      onClick={() =>
                        setQuantity((prev) =>
                          Math.min(product.product?.stock, prev + 1)
                        )
                      }
                      className="px-3 py-1 text-gray-600 hover:bg-gray-100"
                    >
                      +
                    </button>
                  </>
                ) : null}
              </div>
              {product.product?.stock > 0 ? (
                // <AddToCartButton product={product} />
                <button
                  onClick={handleAddToCart}
                  className="flex items-center bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
                >
                  <ShoppingCart size={20} className="mr-2" /> Add to Cart
                </button>
              ) : (
                <span className="bg-red-100 text-red-600 items-center text-xs font-semibold px-3 py-3 rounded-full">
                  Out of Stock
                </span>
              )}
            </div>

            {/* Additional Info */}
            <div className="mt-4 bg-green-50 p-4 rounded-lg flex items-center space-x-4">
              <Truck className="text-green-600" />
              <div>
                <p className="font-semibold text-green-800">Free Shipping</p>
                <p className="text-sm text-green-700">
                  Arrives in 3-5 business days
                </p>
              </div>
              <Shield className="text-green-600 ml-auto" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SingleProduct;
