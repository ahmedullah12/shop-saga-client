import { useCurrentToken } from '@/redux/features/auth/authApi';
import { logOut, TUser } from '@/redux/features/auth/authSlice';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import verifyJwt from '@/utils/verifyJwt';
import { ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router-dom';

type TProtectedRoute = {
  children: ReactNode;
  role: string | undefined;
}
const ProtectedRoute = ({ children, role }: TProtectedRoute) => {
  const token = useAppSelector(useCurrentToken);
  const location = useLocation();

  let user;
  if(token){
    user = verifyJwt(token) as TUser;
  }

  const dispatch = useAppDispatch();

  if(role !== undefined && role !== user?.role){
    dispatch(logOut());
    return <Navigate to="/login" state={{from: location}} replace={true} />;
  }

  if (!token) {
    return <Navigate to="/login" state={{from: location}} replace={true} />;
  }

  return children;
};

export default ProtectedRoute;
