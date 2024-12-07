import { useState, useMemo } from 'react';
import {
  Trash2,
  ShoppingCart,
  Minus,
  Plus,
  Tag,
  CreditCard,
  MapPin,
  Percent,
} from 'lucide-react';
import Chair1 from '../assets/chairCategory1.png';
const Cart = () => {
  // Initial cart items
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: 'Modern Leather Sofa',
      price: 1299.99,
      quantity: 1,
      image: '/api/placeholder/300/200',
      brand: 'Urban Living',
    },
    {
      id: 2,
      name: 'Ergonomic Office Chair',
      price: 349.99,
      quantity: 2,
      image: '/api/placeholder/300/200',
      brand: 'WorkPro',
    },
  ]);

  // Coupon and discount state
  const [couponCode, setCouponCode] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState(null);

  // Predefined coupon codes
  const coupons = [
    { code: 'SAVE10', discount: 0.1, description: '10% Off' },
    { code: 'WELCOME20', discount: 0.2, description: '20% Off First Purchase' },
  ];

  // Update item quantity
  const updateQuantity = (id, newQuantity) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, quantity: Math.max(1, newQuantity) } : item
      )
    );
  };

  // Remove item from cart
  const removeItem = (id) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  // Apply coupon
  const applyCoupon = () => {
    const foundCoupon = coupons.find(
      (coupon) => coupon.code.toUpperCase() === couponCode.toUpperCase()
    );

    if (foundCoupon) {
      setAppliedCoupon(foundCoupon);
    } else {
      alert('Invalid coupon code');
    }
  };

  // Calculate totals
  const cartSummary = useMemo(() => {
    const subtotal = cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );

    const discount = appliedCoupon ? subtotal * appliedCoupon.discount : 0;

    const total = subtotal - discount;

    return {
      subtotal,
      discount,
      total,
    };
  }, [cartItems, appliedCoupon]);
  return (
    <div className="container">
      <div className="mx-auto px-4 py-8">
        <div className="grid md:grid-cols-3 gap-8">
          {/* Cart Items Column */}
          <div className="md:col-span-2">
            <h1 className="text-3xl font-bold mb-6 flex items-center">
              <ShoppingCart className="mr-4" /> Your Cart
              <span className="ml-4 text-gray-500 text-lg">
                ({cartItems.length} items)
              </span>
            </h1>

            {cartItems.length === 0 ? (
              <div className="text-center py-10 bg-gray-100 rounded">
                <ShoppingCart
                  size={48}
                  className="mx-auto mb-4 text-gray-500"
                />
                <p className="text-xl text-gray-600">Your cart is empty</p>
              </div>
            ) : (
              cartItems.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center border-b py-4 hover:bg-gray-50 transition"
                >
                  <img
                    src={Chair1}
                    alt={item.name}
                    className="w-24 h-24 object-cover rounded mr-6"
                  />

                  <div className="flex-grow">
                    <h3 className="text-xl font-semibold">{item.name}</h3>
                    <p className="text-gray-600">{item.brand}</p>
                    <p className="font-bold text-blue-600">
                      ${item.price.toFixed(2)}
                    </p>
                  </div>

                  <div className="flex items-center mr-6">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="border rounded p-1 mr-2"
                    >
                      <Minus size={16} />
                    </button>
                    <span className="mx-2">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="border rounded p-1 ml-2"
                    >
                      <Plus size={16} />
                    </button>
                  </div>

                  <div className="font-bold mr-6">
                    ${(item.price * item.quantity).toFixed(2)}
                  </div>

                  <button
                    onClick={() => removeItem(item.id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <Trash2 />
                  </button>
                </div>
              ))
            )}
          </div>

          {/* Order Summary Column */}
          <div>
            <div className="border rounded-lg p-6 bg-gray-50">
              <h2 className="text-2xl font-bold mb-4">Order Summary</h2>

              {/* Subtotal */}
              <div className="flex justify-between mb-2">
                <span>Subtotal</span>
                <span>${cartSummary.subtotal.toFixed(2)}</span>
              </div>

              {/* Discount */}
              {appliedCoupon && (
                <div className="flex justify-between mb-2 text-green-600">
                  <span>
                    <Tag className="inline-block mr-2" size={16} />
                    Discount ({appliedCoupon.description})
                  </span>
                  <span>-${cartSummary.discount.toFixed(2)}</span>
                </div>
              )}

              {/* Total */}
              <div className="flex justify-between font-bold text-lg border-t pt-2 mt-2">
                <span>Total</span>
                <span>${cartSummary.total.toFixed(2)}</span>
              </div>

              {/* Coupon Input */}
              <div className="mt-4 flex">
                <input
                  type="text"
                  placeholder="Enter coupon code"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                  className="flex-grow border rounded-l px-3 py-2"
                />
                <button
                  onClick={applyCoupon}
                  className="bg-blue-600 text-white px-4 py-2 rounded-r"
                >
                  <Percent size={16} />
                </button>
              </div>

              {/* Checkout Button */}
              <button
                disabled={cartItems.length === 0}
                className={`w-full mt-4 py-3 rounded flex items-center justify-center ${
                  cartItems.length > 0
                    ? 'bg-blue-600 text-white hover:bg-blue-700'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                <CreditCard className="mr-2" />
                Proceed to Checkout
              </button>
            </div>

            {/* Shipping Info */}
            <div className="mt-4 border rounded-lg p-4 bg-white">
              <h3 className="font-semibold mb-2 flex items-center">
                <MapPin className="mr-2" size={20} /> Shipping Information
              </h3>
              <p className="text-sm text-gray-600">
                Free shipping on orders over $500. Estimated delivery: 3-5
                business days.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
