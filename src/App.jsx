import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Hero from './components/Hero';
import Footer from './components/Footer';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import AddCollectionPoint from './pages/AddCollectionPoint';
import AdminLogin from './pages/AdminLogin';
import AdminRegister from './pages/AdminRegister';
import AdminDashboard from './pages/AdminDashboard';
import ProtectedRoute from './components/ProtectedRoute';

// Lazy load heavy components for better performance
const LazyWhySell = lazy(() => import('./components/WhySell'));
const LazyFeatures = lazy(() => import('./components/Features'));
const LazyImpact = lazy(() => import('./components/Impact'));
const LazyFounderVideo = lazy(() => import('./components/FounderVideo'));
const LazyTestimonials = lazy(() => import('./components/Testimonials'));

// Loading component
const SectionLoader = () => (
  <div className="w-full h-64 bg-gray-100 animate-pulse flex items-center justify-center">
    <div className="text-gray-400">Loading...</div>
  </div>
);

// Home page component
const Home = () => {
  const isAuthenticated = !!localStorage.getItem('user');
  
  return (
    <>
      <Header isAuthenticated={isAuthenticated} />
      <main>
        <Hero />
        <Suspense fallback={<SectionLoader />}>
          <LazyWhySell />
        </Suspense>
        <Suspense fallback={<SectionLoader />}>
          <LazyFeatures />
        </Suspense>
        <Suspense fallback={<SectionLoader />}>
          <LazyImpact />
        </Suspense>
        <Suspense fallback={<SectionLoader />}>
          <LazyFounderVideo />
        </Suspense>
        <Suspense fallback={<SectionLoader />}>
          <LazyTestimonials />
        </Suspense>
      </main>
      <Footer />
    </>
  );
};

function App() {
  return (
    <div className="min-h-screen bg-offwhite">
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        
        {/* Protected User Routes */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/add-collection-point"
          element={
            <ProtectedRoute>
              <AddCollectionPoint />
            </ProtectedRoute>
          }
        />
        
        {/* Admin Routes - Separate URLs */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/register" element={<AdminRegister />} />
        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute requireAdmin={true}>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
        
        {/* Catch all - redirect to home */}
        <Route path="*" element={<Home />} />
      </Routes>
    </div>
  );
}

export default App;
