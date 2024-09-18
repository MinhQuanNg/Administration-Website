// ProtectedRoute.js
import { useSelector } from 'react-redux'
import { useNavigate, Outlet } from 'react-router-dom'
import { useEffect } from 'react';

const ProtectedRoute = () => {
  const { userToken } = useSelector((state) => state.auth)

  const navigate = useNavigate();

  useEffect(() => {
    if (!userToken) {
      navigate('/login');
    }
  }, [userToken]);

  // return child route elements
  if (userToken) {
    return <Outlet />;
  }
}
export default ProtectedRoute