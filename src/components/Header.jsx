import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Header = ({ isAuthenticated }) => {
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/');
    window.location.reload(); // Refresh to update auth state
  };

  return (
    <header className="bg-[#F5F5F5]">
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20 relative">
          {/* Logo - Left */}
          <div className="flex-shrink-0">
            <button 
              onClick={() => navigate('/')}
              className="text-2xl md:text-3xl font-bold "
            >
              <span className='text-green-800'>E - Sangrahan</span>
            </button>
          </div>

          {/* Desktop Navigation - Centered */}
          <div className="hidden md:flex items-center space-x-8 absolute left-1/2 transform -translate-x-1/2">
            <a
              href="#features"
              className="text-[#333333] transition-colors"
              style={{ fontFamily: 'sans-serif' }}
            >
              Features
            </a>
            <a
              href="#about"
              className="text-[#333333] transition-colors"
              style={{ fontFamily: 'sans-serif' }}
            >
              About Us
            </a>
            <a
              href="#contact"
              className="text-[#333333] transition-colors"
              style={{ fontFamily: 'sans-serif' }}
            >
              Contact
            </a>
          </div>

          {/* Desktop Buttons - Right */}
          <div className="hidden md:flex items-center space-x-4 ml-auto">
            {isAuthenticated ? (
              <>
                <button
                  onClick={() => navigate('/dashboard')}
                  className="px-4 py-2 border-2 border-primary bg-white text-primary rounded-lg transition-colors font-medium"
                  style={{ 
                    fontFamily: 'sans-serif',
                    borderColor: '#2E6A56',
                    color: '#2E6A56'
                  }}
                >
                  Dashboard
                </button>
                <button
                  onClick={() => {
                    handleLogout();
                    setIsMobileMenuOpen(false);
                  }}
                  className="px-4 py-2 bg-primary text-white rounded-lg transition-colors font-medium"
                  style={{ 
                    fontFamily: 'sans-serif',
                    backgroundColor: '#2E6A56'
                  }}
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => navigate('/login')}
                  className="px-4 py-2 border-2 border-primary bg-white text-primary rounded-lg transition-colors font-medium"
                  style={{ 
                    fontFamily: 'sans-serif',
                    borderColor: '#2E6A56',
                    color: '#2E6A56'
                  }}
                >
                  Login
                </button>
                <button
                  onClick={() => navigate('/register')}
                  className="px-4 py-2 bg-primary text-white rounded-lg transition-colors font-medium"
                  style={{ 
                    fontFamily: 'sans-serif',
                    backgroundColor: '#2E6A56'
                  }}
                >
                  Start selling
                </button>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-gray-700"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {isMobileMenuOpen ? (
                <path d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 space-y-4 bg-[#F5F5F5] border-t">
            <a
              href="#features"
              className="block px-4 py-2 text-[#333333]"
              onClick={() => setIsMobileMenuOpen(false)}
              style={{ fontFamily: 'sans-serif' }}
            >
              Features
            </a>
            <a
              href="#about"
              className="block px-4 py-2 text-[#333333]"
              onClick={() => setIsMobileMenuOpen(false)}
              style={{ fontFamily: 'sans-serif' }}
            >
              About Us
            </a>
            <a
              href="#contact"
              className="block px-4 py-2 text-[#333333]"
              onClick={() => setIsMobileMenuOpen(false)}
              style={{ fontFamily: 'sans-serif' }}
            >
              Contact
            </a>
            <div className="px-4 space-y-2">
              {isAuthenticated ? (
                <>
                  <button
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      navigate('/dashboard');
                    }}
                    className="w-full px-4 py-2 border-2 border-primary bg-white text-primary rounded-lg transition-colors font-medium"
                    style={{ 
                      fontFamily: 'sans-serif',
                      borderColor: '#2E6A56',
                      color: '#2E6A56'
                    }}
                  >
                    Dashboard
                  </button>
                  <button
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      handleLogout();
                    }}
                    className="w-full px-4 py-2 bg-primary text-white rounded-lg transition-colors font-medium"
                    style={{ 
                      fontFamily: 'sans-serif',
                      backgroundColor: '#2E6A56'
                    }}
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      navigate('/login');
                    }}
                    className="w-full px-4 py-2 border-2 border-primary bg-white text-primary rounded-lg transition-colors font-medium"
                    style={{ 
                      fontFamily: 'sans-serif',
                      borderColor: '#2E6A56',
                      color: '#2E6A56'
                    }}
                  >
                    Login
                  </button>
                  <button
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      navigate('/register');
                    }}
                    className="w-full px-4 py-2 bg-primary text-white rounded-lg transition-colors font-medium"
                    style={{ 
                      fontFamily: 'sans-serif',
                      backgroundColor: '#2E6A56'
                    }}
                  >
                    Start selling
                  </button>
                </>
              )}
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;
