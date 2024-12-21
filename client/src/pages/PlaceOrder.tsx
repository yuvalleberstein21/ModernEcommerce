import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../hooks/reduxHooks';
import { RootState } from '../redux/store';
import { User, Truck, MapPin, ShoppingCart, DollarSign } from 'lucide-react';
import React, { useMemo } from 'react';
import { ORDER_CREATE_RESET } from '../redux/constant/OrderConstant';
import { createOrder } from '../redux/actions/orderActions';

const PlaceOrder = () => {
  window.scrollTo(0, 0);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const cart = useAppSelector((state: RootState) => state.cart);
  const { userInfo } = useAppSelector((state: RootState) => state.userInfo);
  const { order, success, error } = useAppSelector(
    (state: RootState) => state.orderCreate
  );

  const calculatePrice = useMemo(() => {
    // Calculate Price
    const addDecimals = (num) => {
      return (Math.round(num * 100) / 100).toFixed(2);
    };

    const itemsPrice = addDecimals(
      cart.cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0)
    );

    const shippingPrice = addDecimals(itemsPrice > 100 ? 0 : 20);
    const taxPrice = addDecimals(Number(0.15 * itemsPrice).toFixed(2));
    const totalPrice = (
      Number(itemsPrice) +
      Number(shippingPrice) +
      Number(taxPrice)
    ).toFixed(2);

    return {
      itemsPrice,
      shippingPrice,
      taxPrice,
      totalPrice,
    };
  }, [cart.cartItems]);

  React.useEffect(() => {
    if (success) {
      navigate(`/order/${order._id}`);
      dispatch({ type: ORDER_CREATE_RESET });
    }
  }, [dispatch, success, order, navigate]);

  const placeOrderHandler = (e) => {
    e.preventDefault();

    dispatch(
      createOrder({
        orderItems: cart.cartItems,
        shippingAddress: cart.shippingAddress,
        paymentMethod: cart.shippingAddress.paymentMethod,
        itemsPrice: calculatePrice.itemsPrice,
        shippingPrice: calculatePrice.shippingPrice,
        taxPrice: calculatePrice.taxPrice,
        totalPrice: calculatePrice.totalPrice,
      })
    );
  };

  return (
    <div className="container mt-10 w-full mx-5 p-6 bg-white shadow-lg rounded-lg">
      {/* Customer, Order Info, and Delivery Sections */}
      <div className="grid md:grid-cols-3 gap-6 mb-6">
        {/* Customer Section */}
        <div className="bg-green-50 p-4 rounded-lg flex items-center space-x-4">
          <div className="bg-green-100 p-3 rounded-full">
            <User className="text-green-600" size={24} />
          </div>
          <div>
            <h5 className="font-bold text-gray-800">Customer</h5>
            <p className="text-gray-600">{userInfo.user.name}</p>
            <p className="text-gray-600">{userInfo.user.email}</p>
          </div>
        </div>

        {/* Order Info Section */}
        <div className="bg-blue-50 p-4 rounded-lg flex items-center space-x-4">
          <div className="bg-blue-100 p-3 rounded-full">
            <Truck className="text-blue-600" size={24} />
          </div>
          <div>
            <h5 className="font-bold text-gray-800">Order Info</h5>
            <p className="text-gray-600">
              Shipping: {cart?.shippingAddress?.country}
            </p>
            <p className="text-gray-600">
              Pay method: {cart?.shippingAddress?.paymentMethod}
            </p>
          </div>
        </div>

        {/* Delivery Section */}
        <div className="bg-purple-50 p-4 rounded-lg flex items-center space-x-4">
          <div className="bg-purple-100 p-3 rounded-full">
            <MapPin className="text-purple-600" size={24} />
          </div>
          <div>
            <h5 className="font-bold text-gray-800">Deliver to</h5>
            <p className="text-gray-600">
              {cart?.shippingAddress?.city}, {cart?.shippingAddress?.address},
              {cart?.shippingAddress?.postalCode}
            </p>
          </div>
        </div>
      </div>

      {/* Order Products */}
      <div className="grid md:grid-cols-12 gap-6">
        {/* Product List */}
        <div className="md:col-span-8 space-y-4">
          {cart?.cartItems.length === 0 ? (
            <div className="text-gray-500 text-center py-8">
              <ShoppingCart className="mx-auto mb-4 text-gray-400" size={48} />
              Your cart is empty
            </div>
          ) : (
            cart?.cartItems.map((item, index) => (
              <div
                key={index}
                className="flex items-center bg-gray-100 rounded-lg p-4 shadow-sm"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-24 h-24 object-cover rounded-md mr-6"
                />
                <div className="flex-grow">
                  <Link
                    to={`/products/${item.product}`}
                    className="text-lg font-semibold hover:text-blue-600 transition"
                  >
                    {item.name}
                  </Link>
                </div>
                <div className="text-center mx-4">
                  <p className="text-gray-500 font-medium">QUANTITY</p>
                  <p className="font-bold">{item.quantity}</p>
                </div>
                <div className="text-right">
                  <p className="text-gray-500 font-medium">SUBTOTAL</p>
                  <p className="font-bold text-green-600">
                    ${(item.quantity * item.price).toFixed(2)}
                  </p>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Order Total */}
        <div className="md:col-span-4">
          <div className="bg-gray-50 rounded-lg p-6 border border-gray-200 sticky top-24">
            <h4 className="text-xl font-bold mb-4 flex items-center">
              <DollarSign className="mr-2 text-green-600" size={24} />
              Order Summary
            </h4>
            <div className="space-y-3">
              <div className="flex justify-between border-b pb-2">
                <span className="text-gray-600">Products</span>
                <span className="font-semibold">
                  ${calculatePrice.itemsPrice}
                </span>
              </div>
              <div className="flex justify-between border-b pb-2">
                <span className="text-gray-600">Shipping</span>
                <span className="font-semibold">
                  ${calculatePrice.shippingPrice}
                </span>
              </div>
              <div className="flex justify-between border-b pb-2">
                <span className="text-gray-600">Tax</span>
                <span className="font-semibold">
                  ${calculatePrice.taxPrice}
                </span>
              </div>
              <div className="flex justify-between pt-2">
                <span className="text-lg font-bold">Total</span>
                <span className="text-lg font-bold text-green-700">
                  ${calculatePrice.totalPrice}
                </span>
              </div>
            </div>
            {/* Uncomment and modify the button as needed */}
            {cart.cartItems.length === 0 ? null : (
              <button
                className="w-full mt-6 bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition"
                onClick={placeOrderHandler}
              >
                Place Order
              </button>
            )}
            {error && <div>{error}</div>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlaceOrder;
