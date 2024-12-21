import { Link, useParams } from 'react-router-dom';
import moment from 'moment';
import {
  User,
  Truck,
  MapPin,
  Package,
  CreditCard,
  CheckCircle,
  XCircle,
} from 'lucide-react';
import { useAppDispatch, useAppSelector } from '../hooks/reduxHooks';
import { RootState } from '../redux/store';
import React from 'react';
import { getOrderDetails } from '../redux/actions/orderActions';
// import { PayPalButton } from 'react-paypal-button-v2';

const Order: React.FC = () => {
  window.scrollTo(0, 0);
  const { id } = useParams<{ id: string }>();

  const dispatch = useAppDispatch();

  const { order, loading, error } = useAppSelector(
    (state: RootState) => state.orderDetails
  );

  console.log(order);

  if (!loading) {
    // Calculate Price
    const addDecimals = (num) => {
      return (Math.round(num * 100) / 100).toFixed(2);
    };

    order.itemsPrice = addDecimals(
      order.orderItems.reduce((acc, item) => acc + item.price * item.qty, 0)
    );
  }

  React.useEffect(() => {
    if (id) {
      dispatch(getOrderDetails(id));
    }
  }, [dispatch, id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
        {error}
      </div>
    );
  }

  const StatusBadge = ({ isPaid, date }: { isPaid: boolean; date?: Date }) => (
    <div
      className={`px-4 py-2 rounded-full text-sm ${
        isPaid ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
      }`}
    >
      {isPaid ? (
        <div className="flex items-center">
          <CheckCircle className="w-4 h-4 mr-2" />
          <span>Paid on {moment(date).calendar()}</span>
        </div>
      ) : (
        <div className="flex items-center">
          <XCircle className="w-4 h-4 mr-2" />
          <span>Not Paid</span>
        </div>
      )}
    </div>
  );
  // );
  return (
    <div className="container max-w-7xl mx-auto px-4 py-8">
      {/* Order Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {/* Customer Info */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center mb-4">
            <div className="bg-blue-100 p-3 rounded-full">
              <User className="w-6 h-6 text-blue-600" />
            </div>
            <h2 className="ml-4 text-xl font-semibold">Customer</h2>
          </div>
          <div className="space-y-2">
            <p className="font-medium">{order.user.name}</p>
            <a
              href={`mailto:${order.user.email}`}
              className="text-blue-600 hover:text-blue-800"
            >
              {order.user.email}
            </a>
          </div>
        </div>

        {/* Order Info */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center mb-4">
            <div className="bg-blue-100 p-3 rounded-full">
              <Package className="w-6 h-6 text-blue-600" />
            </div>
            <h2 className="ml-4 text-xl font-semibold">Order Info</h2>
          </div>
          <div className="space-y-2">
            <p>Shipping: {order.shippingAddress.country}</p>
            <p>Payment Method: {order.shippingAddress.paymentMethod}</p>
            <StatusBadge isPaid={order.isPaid} date={order.paidAt} />
          </div>
        </div>

        {/* Delivery Info */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center mb-4">
            <div className="bg-blue-100 p-3 rounded-full">
              <Truck className="w-6 h-6 text-blue-600" />
            </div>
            <h2 className="ml-4 text-xl font-semibold">Delivery Info</h2>
          </div>
          <div className="space-y-2">
            <p className="flex items-center">
              <MapPin className="w-4 h-4 mr-2" />
              {order.shippingAddress.city}, {order.shippingAddress.address},{' '}
              {order.shippingAddress.postalCode}
            </p>
            <StatusBadge isPaid={order.isDelivered} date={order.deliveredAt} />
          </div>
        </div>
      </div>

      {/* Order Items */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow">
            <div className="p-6 border-b">
              <h2 className="text-xl font-semibold">Order Items</h2>
            </div>
            <div className="divide-y">
              {order.orderItems.length === 0 ? (
                <div className="p-6 text-center text-gray-500">
                  Your order is empty
                </div>
              ) : (
                order.orderItems.map((item, index) => (
                  <div
                    key={index}
                    className="p-6 flex flex-col md:flex-row items-center"
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-24 h-24 object-cover rounded"
                    />
                    <div className="md:ml-6 flex-1 mt-4 md:mt-0">
                      <Link
                        to={`/products/${item.product}`}
                        className="text-lg font-medium hover:text-blue-600"
                      >
                        {item.name}
                      </Link>
                    </div>
                    <div className="text-center md:text-right mt-4 md:mt-0">
                      <div className="text-sm text-gray-600">Quantity</div>
                      <div className="font-medium">{item.qty}</div>
                    </div>
                    <div className="text-center md:text-right mt-4 md:mt-0 md:ml-6">
                      <div className="text-sm text-gray-600">Subtotal</div>
                      <div className="font-medium">
                        ${(item.qty * item.price).toFixed(2)}
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow">
            <div className="p-6 border-b">
              <h2 className="text-xl font-semibold">Order Summary</h2>
            </div>
            <div className="p-6 space-y-4">
              <div className="flex justify-between">
                <span className="text-gray-600">Products</span>
                <span className="font-medium">${order.itemsPrice}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Shipping</span>
                <span className="font-medium">
                  ${order.shippingPrice.toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Tax</span>
                <span className="font-medium">
                  ${order.taxPrice.toFixed(2)}
                </span>
              </div>
              <div className="pt-4 border-t flex justify-between">
                <span className="font-semibold">Total</span>
                <span className="font-semibold">
                  ${order.totalPrice.toFixed(2)}
                </span>
              </div>

              {/* {!order.isPaid && (
                <div className="mt-6">
                  {loadingPay ? (
                    <div className="flex justify-center">
                      <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
                    </div>
                  ) : !sdkReady ? (
                    <div className="flex justify-center">
                      <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
                    </div>
                  ) : (
                    <div>Paypal button</div>
                    // <PayPalButton
                    //   amount={order.totalPrice}
                    //   onSuccess={successPaymentHandler}
                    // />
                  )}
                </div>
              )} */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Order;
