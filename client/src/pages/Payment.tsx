import React from 'react';
import { useAppDispatch, useAppSelector } from '../hooks/reduxHooks';
import { RootState } from '../redux/store';
import { useNavigate } from 'react-router-dom';

const Payment = () => {
  window.scrollTo(0, 0);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const shippingAddress = useAppSelector(
    (state: RootState) => state.cart?.shippingAddress
  );

  const [paymentMethod, setPaymentMethod] = React.useState('PayPal');

  console.log(shippingAddress);

  React.useEffect(() => {
    if (
      !shippingAddress?.address ||
      !shippingAddress?.city ||
      !shippingAddress?.postalCode ||
      !shippingAddress?.country
    ) {
      alert('Please complete your shipping details first.');
      navigate('/shipping');
    }
  }, [shippingAddress, navigate]);
  const submitHandler = (e) => {
    e.preventDefault();
    console.log('payment method:', paymentMethod);
    // dispatch(savePaymentMethod(paymentMethod));
    // history.push("/placeorder");
  };

  return (
    <div className="container d-flex justify-content-center align-items-center login-center">
      <form
        className="Login2 col-md-8 col-lg-4 col-11"
        onSubmit={submitHandler}
      >
        <h6>SELECT PAYMENT METHOD</h6>
        <div className="payment-container">
          <div className="radio-container">
            <input
              className="form-check-input"
              type="radio"
              value={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value)}
            />
            <label className="form-check-label">PayPal or Credit Card</label>
          </div>
        </div>

        <button type="submit">Continue</button>
      </form>
    </div>
  );
};

export default Payment;
