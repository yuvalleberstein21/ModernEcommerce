import React from 'react';
import { useAppDispatch, useAppSelector } from '../hooks/reduxHooks';
import { RootState } from '../redux/store';
import { getUserDetails } from '../redux/actions/authActions';
import {
  User,
  Package,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Clock,
  ChevronRight,
  ExternalLink,
} from 'lucide-react';
import moment from 'moment';

const UserProfile = () => {
  window.scrollTo(0, 0);
  const dispatch = useAppDispatch();

  const { userInfo, loading, error } = useAppSelector(
    (state: RootState) => state.userInfo
  );
  const cart = useAppSelector(
    (state: RootState) => state.cart?.shippingAddress
  );

  console.log(cart);

  console.log(userInfo);
  React.useEffect(() => {
    dispatch(getUserDetails('profile'));
  }, [dispatch]);

  // Mock data for orders - replace with actual data from your API
  const orders = [
    {
      id: '#ORD-123456',
      date: '2024-12-19',
      status: 'Delivered',
      total: 249.99,
      items: 3,
    },
    {
      id: '#ORD-123457',
      date: '2024-12-15',
      status: 'In Transit',
      total: 149.99,
      items: 2,
    },
    {
      id: '#ORD-123458',
      date: '2024-12-10',
      status: 'Processing',
      total: 99.99,
      items: 1,
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'delivered':
        return 'bg-green-100 text-green-800';
      case 'in transit':
        return 'bg-blue-100 text-blue-800';
      case 'processing':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-red-600">Error: {error}</div>
      </div>
    );
  }

  return (
    <div className="container max-w-7xl mx-auto px-4 py-8">
      {/* Profile Header */}
      <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
        <div className="flex flex-col md:flex-row items-center md:items-start space-y-4 md:space-y-0 md:space-x-6">
          <div className="w-32 h-32 bg-gray-200 rounded-full flex items-center justify-center">
            <User size={48} className="text-gray-400" />
          </div>
          <div className="flex-1">
            <h1 className="text-2xl font-bold text-gray-900">
              {userInfo.user?.name}
            </h1>
            <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center space-x-2 text-gray-600">
                <Mail size={20} />
                <span>{userInfo.user?.email}</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-600">
                <Phone size={20} />
                <span>{userInfo.user?.phone || 'Not provided'}</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-600">
                <MapPin size={20} />
                <span>{`${cart?.city} , ${cart?.address}`}</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-600">
                <Calendar size={20} />
                <span>
                  Member since {moment(userInfo.user?.createdAt).format('LL')}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Orders */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-900">Recent Orders</h2>
          <button className="text-blue-600 hover:text-blue-800 flex items-center">
            View All Orders
            <ChevronRight size={20} className="ml-1" />
          </button>
        </div>

        <div className="space-y-4">
          {orders.map((order) => (
            <div
              key={order.id}
              className="border rounded-lg p-4 hover:border-blue-500 transition-colors duration-200"
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between space-y-4 md:space-y-0">
                <div className="flex items-center space-x-4">
                  <Package className="text-gray-400" size={24} />
                  <div>
                    <h3 className="font-semibold">{order.id}</h3>
                    <div className="flex items-center text-sm text-gray-500 space-x-4">
                      <span className="flex items-center">
                        <Calendar size={16} className="mr-1" />
                        {order.date}
                      </span>
                      <span className="flex items-center">
                        <Package size={16} className="mr-1" />
                        {order.items} items
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
                      order.status
                    )}`}
                  >
                    {order.status}
                  </span>
                  <span className="font-semibold">${order.total}</span>
                  <button className="text-blue-600 hover:text-blue-800">
                    <ExternalLink size={20} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
