import React from 'react';
import { useAppDispatch, useAppSelector } from '../hooks/reduxHooks';
import { RootState } from '../redux/store';
import { saveShippingAddress } from '../redux/actions/cartActions';
import { useNavigate } from 'react-router-dom';
// import { MapPin, User, Mail, Flag } from 'lucide-react';

const Shipping = () => {
  window.scrollTo(0, 0);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const shippingAddress = useAppSelector(
    (state: RootState) => state.cart?.shippingAddress
  );

  console.log(shippingAddress);

  const [address, setAddress] = React.useState(shippingAddress.address);
  const [city, setCity] = React.useState(shippingAddress.city);
  const [postalCode, setPostalCode] = React.useState(
    shippingAddress.postalCode
  );
  const [country, setCountry] = React.useState(shippingAddress.country);
  const [paymentMethod, setPaymentMethod] = React.useState('PayPal');

  const submitHandler = (e) => {
    e.preventDefault();
    if (!address || !city || !postalCode || !country || !paymentMethod) {
      alert('Please fill out all shipping address fields.');
      return;
    }
    console.log(paymentMethod);

    dispatch(
      saveShippingAddress({
        address,
        city,
        postalCode,
        country,
        paymentMethod,
      })
    );
    navigate('/placeorder');
  };

  return (
    <div className="container">
      <div className="w-full max-w-3xl py-5 mx-auto p-3">
        <div className="bg-white p-8 rounded-lg lg:shadow-md md:shadow-md ">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Checkout</h1>

          {/* <!-- Shipping Address --> */}
          <form onSubmit={submitHandler}>
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-gray-700 mb-2">
                Shipping Address
              </h2>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="address" className="block text-gray-700 mb-1">
                    Address
                  </label>
                  <input
                    type="text"
                    id="address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="w-full rounded-lg border py-2 px-3"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="city" className="block text-gray-700 mb-1">
                    City
                  </label>
                  <input
                    type="text"
                    id="city"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full rounded-lg border py-2 px-3"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mt-4">
                <div>
                  <label
                    htmlFor="postalCode"
                    className="block text-gray-700 mb-1"
                  >
                    Postal Code
                  </label>
                  <input
                    type="text"
                    id="postalCode"
                    value={postalCode}
                    onChange={(e) => setPostalCode(e.target.value)}
                    className="w-full rounded-lg border py-2 px-3"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="country" className="block text-gray-700 mb-1">
                    Country
                  </label>
                  <input
                    type="text"
                    id="country"
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    className="w-full rounded-lg border py-2 px-3"
                    required
                  />
                </div>
              </div>
            </div>

            <div className="mb-6">
              <h2 className="text-xl font-semibold text-gray-700 mb-2">
                Payment Method
              </h2>
              <div className="flex flex-col gap-2">
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="PayPal"
                    checked={paymentMethod === 'PayPal'}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="form-radio"
                  />
                  PayPal
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="Credit Card"
                    checked={paymentMethod === 'Credit Card'}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="form-radio"
                  />
                  Credit Card
                </label>
              </div>
            </div>

            <div className="mt-8 flex justify-end">
              <button
                className="bg-teal-500 text-white px-4 py-2 rounded-lg hover:bg-teal-700"
                type="submit"
              >
                Place Order
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Shipping;
