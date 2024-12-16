import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { CreditCard, Lock, MapPin, User, Mail } from 'lucide-react';

// Validation schema
const checkoutSchema = z
  .object({
    firstName: z
      .string()
      .min(2, 'First name must be at least 2 characters')
      .max(50, 'First name must be less than 50 characters')
      .optional(),

    lastName: z
      .string()
      .min(2, 'Last name must be at least 2 characters')
      .max(50, 'Last name must be less than 50 characters')
      .optional(),

    email: z
      .string()
      .email('Invalid email address')
      .max(100, 'Email is too long')
      .optional(),

    phone: z
      .string()
      .regex(/^\+?1?\d{0,14}$/, 'Phone number must be numeric')
      .optional(),

    address: z.object({
      street: z.string().optional(),
      city: z.string().optional(),
      state: z.string().optional(),
      zipCode: z.string().optional(),
    }),

    payment: z.object({
      cardNumber: z.string().optional(),

      expiryDate: z.string().optional(),

      cvv: z.string().optional(),
    }),
  })
  .refine(
    (data) => {
      // Final validation at submission
      const requiredFields = [
        data.firstName,
        data.lastName,
        data.email,
        data.phone,
        data.address.street,
        data.address.city,
        data.address.state,
        data.address.zipCode,
        data.payment.cardNumber,
        data.payment.expiryDate,
        data.payment.cvv,
      ];
      return requiredFields.every((field) => field && field.trim() !== '');
    },
    { message: 'All fields are required' }
  );

const CheckoutPage = () => {
  window.scrollTo(0, 0);
  const [isProcessing, setIsProcessing] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(checkoutSchema),
    mode: 'onBlur', // Validate only when field loses focus
    reValidateMode: 'onBlur',
  });

  const onSubmit = async (data) => {
    setIsProcessing(true);
    try {
      // Simulate payment processing
      await new Promise((resolve) => setTimeout(resolve, 2000));

      console.log('Order submitted:', data);
      alert('Order Processed Successfully!');
    } catch (error) {
      alert('Payment processing failed');
    } finally {
      setIsProcessing(false);
    }
  };

  const InputWithIcon = ({
    icon: Icon,
    label,
    name,
    register,
    errors,
    type = 'text',
    ...props
  }) => (
    <div className="mb-4">
      <label className="block text-gray-700 text-sm font-bold mb-2 flex items-center">
        <Icon className="mr-2 text-gray-500" size={18} />
        {label}
      </label>
      <input
        type={type}
        {...register(name)}
        className={`shadow-sm border ${
          errors[name]
            ? 'border-red-500 focus:ring-red-500'
            : 'border-gray-300 focus:border-blue-500'
        } w-full py-2 px-3 text-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-opacity-50`}
        {...props}
      />
      {errors[name] && (
        <p className="text-red-500 text-xs mt-1">{errors[name].message}</p>
      )}
    </div>
  );
  return (
    <div className="container bg-gray-50 flex items-center justify-center px-4 py-8">
      <div className="max-w-2xl w-full bg-white shadow-2xl rounded-2xl overflow-hidden">
        <div className="bg-gradient-to-r from-blue-600 to-purple-700 p-6">
          <h2 className="text-3xl font-extrabold text-white text-center flex items-center justify-center">
            <Lock className="mr-3" /> Secure Checkout
          </h2>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="p-8 space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <InputWithIcon
              icon={User}
              label="First Name"
              name="firstName"
              register={register}
              errors={errors}
            />
            <InputWithIcon
              icon={User}
              label="Last Name"
              name="lastName"
              register={register}
              errors={errors}
            />
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <InputWithIcon
              icon={Mail}
              label="Email Address"
              name="email"
              type="email"
              register={register}
              errors={errors}
            />
            <InputWithIcon
              icon={User}
              label="Phone Number"
              name="phone"
              register={register}
              errors={errors}
              placeholder="+1 (555) 123-4567"
            />
          </div>

          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-gray-700 flex items-center">
              <MapPin className="mr-2 text-gray-500" /> Shipping Address
            </h3>
            <InputWithIcon
              icon={MapPin}
              label="Street Address"
              name="address.street"
              register={register}
              errors={errors}
            />

            <div className="grid md:grid-cols-3 gap-4">
              <InputWithIcon
                icon={MapPin}
                label="City"
                name="address.city"
                register={register}
                errors={errors}
              />
              <InputWithIcon
                icon={MapPin}
                label="State"
                name="address.state"
                register={register}
                errors={errors}
              />
              <InputWithIcon
                icon={MapPin}
                label="ZIP Code"
                name="address.zipCode"
                register={register}
                errors={errors}
              />
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-gray-700 flex items-center">
              <CreditCard className="mr-2 text-gray-500" /> Payment Details
            </h3>
            <InputWithIcon
              icon={CreditCard}
              label="Card Number"
              name="payment.cardNumber"
              register={register}
              errors={errors}
              placeholder="1234 5678 9012 3456"
            />

            <div className="grid md:grid-cols-2 gap-4">
              <InputWithIcon
                icon={CreditCard}
                label="Expiry Date"
                name="payment.expiryDate"
                register={register}
                errors={errors}
                placeholder="MM/YY"
              />
              <InputWithIcon
                icon={Lock}
                label="CVV"
                name="payment.cvv"
                register={register}
                errors={errors}
                placeholder="123"
                type="password"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-lg text-white font-bold 
              bg-gradient-to-r from-blue-600 to-purple-700 
              hover:opacity-90 transition-all duration-300"
          >
            {isProcessing ? 'Processing...' : 'Complete Purchase'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CheckoutPage;
