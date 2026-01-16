import { lazy, Suspense } from 'react';

const LazyImage = lazy(() => import('./LazyImage'));

const Hero = () => {
  return (
    <section className="pt-16 md:pt-20 pb-16 md:pb-24 px-4 sm:px-6 lg:px-8 bg-[#F5F5F5] relative overflow-hidden">
      {/* Decorative Plus Signs Pattern - Scattered */}
      {/* <div className="absolute inset-0 opacity-15 pointer-events-none">
        
        <div 
          className="absolute top-10 right-10 w-4 h-4"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='16' height='16' viewBox='0 0 16 16' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M8 0h1v7h7v1H8v7H7V8H0V7h7V0z' fill='%232E6A56'/%3E%3C/svg%3E")`,
            transform: 'rotate(15deg)'
          }}
        ></div>
        <div 
          className="absolute top-32 right-32 w-3 h-3"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='16' height='16' viewBox='0 0 16 16' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M8 0h1v7h7v1H8v7H7V8H0V7h7V0z' fill='%232E6A56'/%3E%3C/svg%3E")`,
            transform: 'rotate(-10deg)'
          }}
        ></div>
        <div 
          className="absolute top-20 right-64 w-5 h-5"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='16' height='16' viewBox='0 0 16 16' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M8 0h1v7h7v1H8v7H7V8H0V7h7V0z' fill='%232E6A56'/%3E%3C/svg%3E")`,
            transform: 'rotate(25deg)'
          }}
        ></div>
        <div 
          className="absolute top-48 right-20 w-4 h-4"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='16' height='16' viewBox='0 0 16 16' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M8 0h1v7h7v1H8v7H7V8H0V7h7V0z' fill='%232E6A56'/%3E%3C/svg%3E")`,
            transform: 'rotate(-20deg)'
          }}
        ></div>
        <div 
          className="absolute top-64 right-48 w-3 h-3"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='16' height='16' viewBox='0 0 16 16' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M8 0h1v7h7v1H8v7H7V8H0V7h7V0z' fill='%232E6A56'/%3E%3C/svg%3E")`,
            transform: 'rotate(10deg)'
          }}
        ></div>
        <div 
          className="absolute top-80 right-80 w-4 h-4"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='16' height='16' viewBox='0 0 16 16' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M8 0h1v7h7v1H8v7H7V8H0V7h7V0z' fill='%232E6A56'/%3E%3C/svg%3E")`,
            transform: 'rotate(-15deg)'
          }}
        ></div>
        <div 
          className="absolute top-24 right-96 w-3 h-3"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='16' height='16' viewBox='0 0 16 16' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M8 0h1v7h7v1H8v7H7V8H0V7h7V0z' fill='%232E6A56'/%3E%3C/svg%3E")`,
            transform: 'rotate(20deg)'
          }}
        ></div>
      </div> */}
      <div className="container mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-8 lg:gap-12 items-center">
          {/* Left Content */}
          <div className="text-center lg:text-left">
            <h1 
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-4 md:mb-6 leading-tight"
              style={{ fontFamily: 'sans-serif', color: '#222222' }}
            >
              <span style={{ whiteSpace: 'nowrap' }}>Transforming <span style={{ color: '#2E6A56' }}>E-waste</span></span><br />
              into environmental<br />
              impact.
            </h1>
            <p 
              className="text-base md:text-lg mb-6 md:mb-8 max-w-2xl mx-auto lg:mx-0"
              style={{ 
                fontFamily: 'sans-serif',
                color: '#666666'
              }}
            >
              Turn your old gadgets into green: earn, recycle, and contribute to a sustainable future.
            </p>
            <button 
              className="px-6 md:px-8 py-3 md:py-4 text-white text-base md:text-lg font-semibold rounded-lg transition-opacity hover:opacity-90"
              style={{ 
                fontFamily: 'sans-serif',
                backgroundColor: '#2E6A56'
              }}
            >
              Sell your e-waste
            </button>
          </div>

          {/* Right Image with Organic Shape */}
          <div className="relative lg:pl-8">
            {/* Large Semi-transparent Background Shape - Extends beyond image */}
            <div 
              className="absolute inset-0"
              style={{
                borderRadius: '60% 40% 50% 50% / 50% 40% 60% 50%',
                background: 'rgba(245, 245, 245, 0.8)',
                transform: 'translate(15%, -5%) scale(1.2)',
                zIndex: 0,
                right: '-15%',
              }}
            >
            </div>

            {/* Image Container with Organic Blob Shape */}
            <div 
              className="relative"
              style={{
                borderRadius: '60% 40% 50% 50% / 50% 40% 60% 50%',
                transform: 'translate(5%, 2%)',
                zIndex: 1,
                width: '100%',
                minHeight: '400px',
                overflow: 'hidden',
              }}
            >
              <Suspense
                fallback={
                  <div className="w-full h-64 md:h-96 bg-gray-200 animate-pulse" style={{ minHeight: '400px' }} />
                }
              >
                <LazyImage
                  src="https://images.unsplash.com/photo-1675395594169-c6b14260e271?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fHJldXNlJTIwcmVkdWNlJTIwcmVjeWNsZXxlbnwwfHwwfHx8MA%3D%3D"
                  alt="Modern workspace with laptop and electronics"
                  className="w-full h-full object-cover"
                  style={{ 
                    minHeight: '400px',
                    filter: 'saturate(0.9) brightness(1.05)',
                  }}
                />
              </Suspense>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
