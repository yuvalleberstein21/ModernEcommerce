import React from 'react';
import { useAppDispatch, useAppSelector } from '../hooks/reduxHooks';
import { RootState } from '../redux/store';
import { saveShippingAddress } from '../redux/actions/cartActions';
import { MapPin, User, Mail, Flag } from 'lucide-react';

const Shipping = () => {
  window.scrollTo(0, 0);

  const dispatch = useAppDispatch();
  const shippingAddress = useAppSelector(
    (state: RootState) => state.cart?.shippingAddress
  );
  //   const { shippingAddress } = cart;

  console.log(shippingAddress);

  const [address, setAddress] = React.useState(shippingAddress.address);
  const [city, setCity] = React.useState(shippingAddress.city);
  const [postalCode, setPostalCode] = React.useState(
    shippingAddress.postalCode
  );
  const [country, setCountry] = React.useState(shippingAddress.country);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      saveShippingAddress({
        address,
        city,
        postalCode,
        country,
      })
    );
    // history.push('/payment');
  };

  return (
    <div className="container">
      <div className="w-full max-w-3xl py-5 mx-auto p-3">
        <div className="bg-white p-8 rounded-lg lg:shadow-md md:shadow-md ">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Checkout</h1>

          {/* <!-- Shipping Address --> */}
          <form onSubmit={submitHandler}>
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-gray-700  mb-2">
                Shipping Address
              </h2>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="address" className="block text-gray-700 mb-1">
                    Address
                  </label>
                  <input
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="w-full rounded-lg border py-2 px-3"
                  />
                </div>
                <div>
                  <label htmlFor="city" className="block text-gray-700 mb-1">
                    City
                  </label>
                  <input
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full rounded-lg border py-2 px-3"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mt-4">
                <div>
                  <label htmlFor="postalCode" className="block mb-1">
                    Postal code
                  </label>
                  <input
                    type="text"
                    value={postalCode}
                    onChange={(e) => setPostalCode(e.target.value)}
                    className="w-full rounded-lg border py-2 px-3"
                  />
                </div>
                <div>
                  <label htmlFor="country" className="block text-gray-700 mb-1">
                    Country
                  </label>
                  <input
                    type="text"
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    className="w-full rounded-lg border py-2 px-3"
                  />
                </div>
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
