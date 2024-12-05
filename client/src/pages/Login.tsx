import { useAppDispatch, useAppSelector } from '../hooks/reduxHooks';
import { login } from '../redux/store/slices/authSlice';

const Login = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.auth.user);

  const handleLogin = () => {
    const userData = { name: 'John Doe', email: 'john@example.com' };
    const token = 'fake-jwt-token';
    dispatch(login({ user: userData, token }));
  };
  return (
    <div>
      <h1>Login</h1>
      {user ? <p>Welcome, {user.name}</p> : <p>Please log in</p>}
      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

export default Login;
