import React, { useEffect } from 'react';
import { useAppSelector } from '../hooks/reduxHooks';
import { RootState } from '../redux/store';

interface PrivateRouteProps {
  children: React.ReactNode; // Use ReactNode for flexibility
  openModal: () => void;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children, openModal }) => {
  const { userInfo } = useAppSelector((state: RootState) => state.userInfo);

  // Open the modal only if the user is not logged in
  useEffect(() => {
    if (!userInfo?.token) {
      openModal(); // Open the login modal if not logged in
    }
  }, [userInfo, openModal]); // Re-run when userInfo changes

  if (!userInfo?.token) {
    return null; // Don't render children until user is logged in
  }

  return <>{children}</>;
};

export default PrivateRoute;
