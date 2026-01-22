import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Footer from '../components/Footer';
import api from '../config/api';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [admin, setAdmin] = useState(null);
  const [collectionPoints, setCollectionPoints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState('all'); 
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    // Get admin from localStorage and verify token
    const adminToken = localStorage.getItem('adminToken');
    const adminData = localStorage.getItem('admin');
    
    if (!adminToken || !adminData) {
      navigate('/admin/login');
      setLoading(false);
      return;
    }
    
    try {
      const adminObj = JSON.parse(adminData);
      if (adminObj.isAdmin) {
        setAdmin(adminObj);
      } else {
        toast.error('Access denied. Admin privileges required.');
        navigate('/admin/login');
      }
    } catch (error) {
      console.error('Error parsing admin data:', error);
      navigate('/admin/login');
    }
    setLoading(false);
  }, [navigate]);

  useEffect(() => {
    // Fetch collection points from API
    const fetchCollectionPoints = async () => {
      try {
        const response = await api.admin.getAllCollectionPoints({
          status: filterStatus === 'all' ? '' : filterStatus,
          search: searchQuery
        });
        
        setCollectionPoints(response.data || []);
      } catch (error) {
        console.error('Error fetching collection points:', error);
        toast.error(error.message || 'Error loading collection points');
      }
    };

    fetchCollectionPoints();
    
    // Refresh every 5 seconds
    const interval = setInterval(fetchCollectionPoints, 5000);
    
    return () => clearInterval(interval);
  }, [filterStatus, searchQuery]);

  const handleStatusChange = async (pointId, newStatus) => {
    try {
      await api.admin.updateStatus(pointId, newStatus);
      
      // Update local state
      setCollectionPoints(prev => 
        prev.map(point => 
          point._id === pointId 
            ? { ...point, status: newStatus }
            : point
        )
      );
      
      toast.success(`Collection point ${newStatus} successfully`);
    } catch (error) {
      console.error('Error updating status:', error);
      toast.error(error.message || 'Error updating status');
    }
  };

  const handleDelete = async (pointId) => {
    if (window.confirm('Are you sure you want to delete this collection point?')) {
      try {
        await api.admin.deleteCollectionPoint(pointId);
        
        // Update local state
        setCollectionPoints(prev => prev.filter(point => point._id !== pointId));
        
        toast.success('Collection point deleted successfully');
      } catch (error) {
        console.error('Error deleting collection point:', error);
        toast.error(error.message || 'Error deleting collection point');
      }
    }
  };

  // Filter collection points
  const filteredPoints = collectionPoints.filter(point => {
    const matchesStatus = filterStatus === 'all' || point.status === filterStatus;
    const matchesSearch = searchQuery === '' || 
      point.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      point.email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      point.address?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      point.wasteType?.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  // Statistics - calculate from collection points
  const stats = {
    total: collectionPoints.length,
    pending: collectionPoints.filter(p => p.status === 'pending').length,
    approved: collectionPoints.filter(p => p.status === 'approved').length,
    rejected: collectionPoints.filter(p => p.status === 'rejected').length,
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-gray-500">Loading...</div>
      </div>
    );
  }

  if (!admin) {
    return null;
  }

  const adminName = admin.name || admin.email?.split('@')[0] || 'Admin';

  return (
    <div className="min-h-screen bg-gray-50">
   
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between py-3 sm:py-0 sm:h-16 gap-3 sm:gap-0">
            
            <div className="flex items-center w-full sm:w-auto justify-between sm:justify-start">
              <button 
                onClick={() => navigate('/admin/dashboard')}
                className="text-xl sm:text-2xl font-bold"
              >
                <span className="text-green-800">E - Sangrahan</span>
                <span className="ml-2 text-sm text-gray-500">(Admin)</span>
              </button>
              
              {/* Mobile: Profile */}
              <div className="flex items-center space-x-2 sm:hidden">
                <div className="h-8 w-8 rounded-full bg-red-200 flex items-center justify-center">
                  <span className="text-red-800 font-semibold text-sm">
                    {adminName.charAt(0).toUpperCase()}
                  </span>
                </div>
              </div>
            </div>

            {/* Desktop: Search and Profile */}
            <div className="hidden sm:flex items-center space-x-3 lg:space-x-4 w-full sm:w-auto">
              {/* Search Bar */}
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search collection points..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4 py-2 w-64 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm"
                />
                <svg
                  className="absolute left-3 top-2.5 h-4 w-4 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>

            
              <button
                onClick={() => {
                  localStorage.removeItem('adminToken');
                  localStorage.removeItem('admin');
                  navigate('/admin/login');
                }}
                className="px-4 py-2 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 transition-colors text-sm"
              >
                Logout
              </button>

              {/* Admin Profile */}
              <div className="flex items-center">
                <div className="h-10 w-10 rounded-full bg-red-200 flex items-center justify-center">
                  <span className="text-red-800 font-semibold text-base">
                    {adminName.charAt(0).toUpperCase()}
                  </span>
                </div>
              </div>
            </div>

            {/* Mobile: Search and Logout */}
            <div className="flex sm:hidden w-full gap-2">
              <div className="relative flex-1">
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9 pr-3 py-2 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm"
                />
                <svg
                  className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
              <button
                onClick={() => {
                  localStorage.removeItem('adminToken');
                  localStorage.removeItem('admin');
                  navigate('/admin/login');
                }}
                className="px-3 py-2 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 transition-colors text-sm"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8 py-4 sm:py-6 lg:py-8">

        <div className="mb-4 sm:mb-6 lg:mb-8">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900">
            Admin Dashboard
          </h1>
          <p className="text-sm sm:text-base text-gray-600 mt-2">
            Welcome, {adminName}
          </p>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 lg:gap-6 mb-6 sm:mb-8">
          <div className="bg-white border-2 border-blue-200 rounded-lg p-4 sm:p-5 lg:p-6">
            <h3 className="text-xs sm:text-sm font-medium text-gray-600 mb-2">Total Collection Points</h3>
            <p className="text-3xl sm:text-4xl font-bold text-gray-900">{stats.total}</p>
          </div>
          <div className="bg-white border-2 border-yellow-200 rounded-lg p-4 sm:p-5 lg:p-6">
            <h3 className="text-xs sm:text-sm font-medium text-gray-600 mb-2">Pending</h3>
            <p className="text-3xl sm:text-4xl font-bold text-yellow-600">{stats.pending}</p>
          </div>
          <div className="bg-white border-2 border-green-200 rounded-lg p-4 sm:p-5 lg:p-6">
            <h3 className="text-xs sm:text-sm font-medium text-gray-600 mb-2">Approved</h3>
            <p className="text-3xl sm:text-4xl font-bold text-green-600">{stats.approved}</p>
          </div>
          <div className="bg-white border-2 border-red-200 rounded-lg p-4 sm:p-5 lg:p-6">
            <h3 className="text-xs sm:text-sm font-medium text-gray-600 mb-2">Rejected</h3>
            <p className="text-3xl sm:text-4xl font-bold text-red-600">{stats.rejected}</p>
          </div>
        </div>

        {/* Filter Section */}
        <div className="bg-white rounded-lg shadow p-4 sm:p-6 mb-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <h2 className="text-lg sm:text-xl font-semibold text-gray-900">
              Collection Points ({filteredPoints.length})
            </h2>
            <div className="flex flex-wrap gap-2">
              {['all', 'pending', 'approved', 'rejected'].map((status) => (
                <button
                  key={status}
                  onClick={() => setFilterStatus(status)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    filterStatus === status
                      ? status === 'all'
                        ? 'bg-green-800 text-white'
                        : status === 'pending'
                        ? 'bg-yellow-500 text-white'
                        : status === 'approved'
                        ? 'bg-green-500 text-white'
                        : 'bg-red-500 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {status.charAt(0).toUpperCase() + status.slice(1)}
                </button>
              ))}
            </div>
          </div>
        </div>

        
        <div className="space-y-4">
          {filteredPoints.length === 0 ? (
            <div className="bg-white rounded-lg shadow p-8 text-center">
              <p className="text-gray-500 text-lg">No collection points found</p>
            </div>
          ) : (
            filteredPoints.map((point) => (
              <div
                key={point._id}
                className="bg-white rounded-lg shadow p-4 sm:p-6 hover:shadow-lg transition-shadow"
              >
                <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                  {/* Main Content */}
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-2 mb-3">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${
                          point.status === 'pending'
                            ? 'bg-yellow-100 text-yellow-800'
                            : point.status === 'approved'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-red-100 text-red-800'
                        }`}
                      >
                        {point.status.charAt(0).toUpperCase() + point.status.slice(1)}
                      </span>
                      <span className="text-xs text-gray-500">
                        {new Date(point.createdAt).toLocaleDateString()} at{' '}
                        {new Date(point.createdAt).toLocaleTimeString()}
                      </span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">
                          {point.name || 'N/A'}
                        </h3>
                        <p className="text-sm text-gray-600 mb-1">
                          <span className="font-medium">Email:</span> {point.email || 'N/A'}
                        </p>
                        <p className="text-sm text-gray-600 mb-1">
                          <span className="font-medium">User:</span> {point.userName || (point.userId?.name) || 'N/A'}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600 mb-1">
                          <span className="font-medium">Address:</span> {point.address || 'N/A'}
                        </p>
                        {point.latitude && point.longitude && (
                          <p className="text-sm text-gray-600 mb-1">
                            <span className="font-medium">Location:</span>{' '}
                            {parseFloat(point.latitude).toFixed(6)}, {parseFloat(point.longitude).toFixed(6)}
                          </p>
                        )}
                        <p className="text-sm text-gray-600 mb-1">
                          <span className="font-medium">Waste Type:</span>{' '}
                          {point.wasteType || 'N/A'}
                        </p>
                        <p className="text-sm text-gray-600 mb-1">
                          <span className="font-medium">Condition:</span> {point.condition || 'N/A'}
                        </p>
                        <p className="text-sm text-gray-600 mb-1">
                          <span className="font-medium">Years of Use:</span> {point.yearsOfUse || 'N/A'}
                        </p>
                      </div>
                    </div>

                    {point.optional && (
                      <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                        <p className="text-sm text-gray-700">
                          <span className="font-medium">Additional Notes:</span> {point.optional}
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="flex flex-col gap-2 lg:min-w-[200px]">
                    {point.status === 'pending' && (
                      <>
                        <button
                          onClick={() => handleStatusChange(point._id, 'approved')}
                          className="px-4 py-2 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition-colors text-sm"
                        >
                          Approve
                        </button>
                        <button
                          onClick={() => handleStatusChange(point._id, 'rejected')}
                          className="px-4 py-2 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 transition-colors text-sm"
                        >
                          Reject
                        </button>
                      </>
                    )}
                    {point.status === 'approved' && (
                      <button
                        onClick={() => handleStatusChange(point._id, 'rejected')}
                        className="px-4 py-2 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 transition-colors text-sm"
                      >
                        Reject
                      </button>
                    )}
                    {point.status === 'rejected' && (
                      <button
                        onClick={() => handleStatusChange(point._id, 'approved')}
                        className="px-4 py-2 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition-colors text-sm"
                      >
                        Approve
                      </button>
                    )}
                    <button
                      onClick={() => handleDelete(point._id)}
                      className="px-4 py-2 bg-gray-600 text-white rounded-lg font-medium hover:bg-gray-700 transition-colors text-sm"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AdminDashboard;
