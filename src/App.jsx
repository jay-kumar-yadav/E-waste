import { lazy, Suspense, useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Footer from './components/Footer';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';

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
const Home = ({ onNavigate, isAuthenticated, onLogout }) => {
  return (
    <>
      <Header onNavigate={onNavigate} isAuthenticated={isAuthenticated} onLogout={onLogout} />
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
  const [currentPage, setCurrentPage] = useState('home');
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Check authentication status on mount and when page changes
  useEffect(() => {
    const user = localStorage.getItem('user');
    setIsAuthenticated(!!user);
  }, [currentPage]);

  const navigate = (page) => {
    setCurrentPage(page);
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    setIsAuthenticated(false);
    setCurrentPage('home');
  };

  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
  };

  return (
    <div className="min-h-screen bg-offwhite">
      {currentPage === 'home' && (
        <Home 
          onNavigate={navigate} 
          isAuthenticated={isAuthenticated} 
          onLogout={handleLogout}
        />
      )}
      {currentPage === 'login' && (
        <Login onNavigate={navigate} onLoginSuccess={handleLoginSuccess} />
      )}
      {currentPage === 'register' && (
        <Register onNavigate={navigate} onLoginSuccess={handleLoginSuccess} />
      )}
      {currentPage === 'dashboard' && (
        <Dashboard onNavigate={navigate} onLogout={handleLogout} />
      )}
    </div>
  );
}

export default App;
