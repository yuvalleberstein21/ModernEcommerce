// import { useAppDispatch, useAppSelector } from '../hooks/reduxHooks';
// import { login } from '../redux/store/slices/authSlice';
import React, { useEffect } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import {
  clearLoginError,
  login,
  registerUser,
} from '../redux/actions/authActions';
import { useAppDispatch, useAppSelector } from '../hooks/reduxHooks';
import { RootState } from '../redux/store';

interface FormData {
  name?: string;
  email: string;
  password: string;
  confirmPassword?: string;
}
const Login = ({ onClose }: { onClose: () => void }) => {
  const dispatch = useAppDispatch();
  const { error, loading, userInfo } = useAppSelector(
    (state: RootState) => state.userInfo
  );
  console.log(userInfo);
  const [isLogin, setIsLogin] = React.useState(true);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormData>();

  const toggleForm = () => setIsLogin(!isLogin);

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    if (isLogin) {
      await dispatch(login(data.email, data.password));
    } else {
      await dispatch(registerUser(data.name, data.email, data.password));
    }
  };

  useEffect(() => {
    if (userInfo?.token) {
      onClose();
    }
  }, [userInfo, onClose]);
  useEffect(() => {
    dispatch(clearLoginError());
  }, [dispatch]);

  return (
    <div className="fixed inset-[-1rem] z-50 min-w-screen flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-xl w-96 items-center mx-4 mr-8 p-8 relative">
        <div className="absolute top-4 right-4">
          <button
            className="text-gray-500 hover:text-gray-700"
            onClick={onClose}
          >
            ✕
          </button>
        </div>

        <h2 className="text-2xl font-bold text-center mb-6">
          {isLogin ? 'Login' : 'Sign Up'}
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {error && <div className="text-red-500 text-sm">{error}</div>}
          {!isLogin && (
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700"
              >
                Full name
              </label>
              <input
                type="text"
                {...register('name', { required: !isLogin })}
                // onChange={handleChange}
                required={!isLogin}
                className="mt-1 block w-full p-1 rounded-md outline-none shadow-sm text-md px-2"
              />
              {errors.name && (
                <p className="text-red-500 text-xs mt-1">
                  Full name is required.
                </p>
              )}
            </div>
          )}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email Address
            </label>
            <input
              type="email"
              {...register('email', { required: true })}
              required
              className="mt-1 block w-full p-1 rounded-md outline-none shadow-sm text-md px-2"
            />
            {errors.email && (
              <p className="text-red-500 text-xs mt-1">Email is required.</p>
            )}
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              type="password"
              // value={formData.password}
              // onChange={handleChange}
              {...register('password', { required: true, minLength: 6 })}
              required
              className="mt-1 block w-full p-1 rounded-md outline-none shadow-sm text-md px-2"
            />
            {errors.password && (
              <p className="text-red-500 text-xs mt-1">
                Password must be at least 6 characters.
              </p>
            )}
          </div>

          {!isLogin && (
            <div>
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium text-gray-700"
              >
                Confirm Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                {...register('confirmPassword', {
                  required: !isLogin,
                  validate: (value) =>
                    value === watch('password') || 'Passwords do not match.',
                })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              />
              {errors.confirmPassword && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>
          )}
          <div>
            <button
              type="submit"
              className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 
                ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
              disabled={loading}
            >
              {isLogin ? 'Login' : 'Sign Up'}
            </button>
          </div>
        </form>

        <div className="mt-4 text-center">
          <p className="text-sm text-gray-600">
            {isLogin ? "Don't have an account?" : 'Already have an account?'}
            <button
              onClick={toggleForm}
              className="ml-2 text-indigo-600 hover:text-indigo-500 font-medium"
            >
              {isLogin ? 'Sign Up' : 'Login'}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
