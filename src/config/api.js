// API Configuration
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5002/api';

// Helper function to get auth token
const getToken = () => {
  return localStorage.getItem('token');
};

// Helper function to get admin token
const getAdminToken = () => {
  return localStorage.getItem('adminToken');
};

// Helper function for API requests
const apiRequest = async (endpoint, options = {}) => {
  const token = options.isAdmin ? getAdminToken() : getToken();
  
  const config = {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
      ...options.headers,
    },
  };

  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, config);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Something went wrong');
    }

    return data;
  } catch (error) {
    throw error;
  }
};

export default {
  // Auth APIs
  auth: {
    // User registration
    register: async (userData) => {
      return apiRequest('/auth/register', {
        method: 'POST',
        body: JSON.stringify(userData),
      });
    },

    // User login
    login: async (credentials) => {
      return apiRequest('/auth/login', {
        method: 'POST',
        body: JSON.stringify(credentials),
      });
    },

    // Google auth
    googleAuth: async (googleData) => {
      return apiRequest('/auth/google', {
        method: 'POST',
        body: JSON.stringify(googleData),
      });
    },

    // Get current user
    getMe: async () => {
      return apiRequest('/auth/me', {
        method: 'GET',
      });
    },

    // Admin registration
    registerAdmin: async (adminData) => {
      return apiRequest('/auth/admin/register', {
        method: 'POST',
        body: JSON.stringify(adminData),
        isAdmin: false, // No token needed for registration
      });
    },

    // Admin login
    loginAdmin: async (credentials) => {
      return apiRequest('/auth/admin/login', {
        method: 'POST',
        body: JSON.stringify(credentials),
        isAdmin: false, // No token needed for login
      });
    },

    // Get current admin
    getAdminMe: async () => {
      return apiRequest('/auth/admin/me', {
        method: 'GET',
        isAdmin: true,
      });
    },
  },

  // Collection Point APIs
  collectionPoints: {
    // Get user's collection points
    getUserCollectionPoints: async () => {
      return apiRequest('/collection-points', {
        method: 'GET',
      });
    },

    // Create collection point
    create: async (collectionPointData) => {
      return apiRequest('/collection-points', {
        method: 'POST',
        body: JSON.stringify(collectionPointData),
      });
    },

    // Get single collection point
    getById: async (id) => {
      return apiRequest(`/collection-points/${id}`, {
        method: 'GET',
      });
    },

    // Update collection point
    update: async (id, collectionPointData) => {
      return apiRequest(`/collection-points/${id}`, {
        method: 'PUT',
        body: JSON.stringify(collectionPointData),
      });
    },

    // Delete collection point
    delete: async (id) => {
      return apiRequest(`/collection-points/${id}`, {
        method: 'DELETE',
      });
    },
  },

  // Admin APIs
  admin: {
    // Get all collection points (admin)
    getAllCollectionPoints: async (filters = {}) => {
      const queryParams = new URLSearchParams();
      if (filters.status) queryParams.append('status', filters.status);
      if (filters.search) queryParams.append('search', filters.search);
      
      const queryString = queryParams.toString();
      const endpoint = `/admin/collection-points${queryString ? `?${queryString}` : ''}`;
      
      return apiRequest(endpoint, {
        method: 'GET',
        isAdmin: true,
      });
    },

    // Get single collection point (admin)
    getCollectionPointById: async (id) => {
      return apiRequest(`/admin/collection-points/${id}`, {
        method: 'GET',
        isAdmin: true,
      });
    },

    // Update collection point status (admin)
    updateStatus: async (id, status) => {
      return apiRequest(`/admin/collection-points/${id}/status`, {
        method: 'PUT',
        body: JSON.stringify({ status }),
        isAdmin: true,
      });
    },

    // Delete collection point (admin)
    deleteCollectionPoint: async (id) => {
      return apiRequest(`/admin/collection-points/${id}`, {
        method: 'DELETE',
        isAdmin: true,
      });
    },

    // Get dashboard statistics
    getDashboardStats: async () => {
      return apiRequest('/admin/dashboard/stats', {
        method: 'GET',
        isAdmin: true,
      });
    },

    // Get all users
    getAllUsers: async () => {
      return apiRequest('/admin/users', {
        method: 'GET',
        isAdmin: true,
      });
    },
  },
};
