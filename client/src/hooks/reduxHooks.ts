import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../redux/store/index';

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector = (selector) =>
  useSelector((state: RootState) => selector(state));
