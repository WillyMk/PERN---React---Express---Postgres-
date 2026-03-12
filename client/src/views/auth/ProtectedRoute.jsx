import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = () => {
  let user = true;

  return user ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoute;