import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children, requireAdmin = false }) => {
  if (requireAdmin) {
    const adminToken = localStorage.getItem('adminToken');
    const admin = localStorage.getItem('admin');
    
    if (!adminToken || !admin) {
      return <Navigate to="/admin/login" replace />;
    }
    
    try {
      const adminObj = JSON.parse(admin);
      if (!adminObj.isAdmin) {
        return <Navigate to="/admin/login" replace />;
      }
    } catch (error) {
      return <Navigate to="/admin/login" replace />;
    }
  } else {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');
    
    if (!token || !user) {
      return <Navigate to="/login" replace />;
    }
  }
  
  return children;
};

export default ProtectedRoute;
