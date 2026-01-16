import { useState } from 'react';
import illustrationImage from '../assets/p.png';

const Features = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const features = [
    {
      title: 'Convenient pickup and drop-off options',
      description:
        'Select from our convenient pickup or drop-off options. Schedule a pickup for larger items or choose a nearby drop-off point for smaller devices.',
    },
    {
      title: 'Diverse payment methods',
      description:
        'We offer multiple payment options including bank transfer, digital wallets, and cash on pickup. Choose the method that works best for you.',
    },
    {
      title: 'Instant valuation algorithm',
      description:
        'Our advanced AI-powered algorithm provides instant and accurate valuations for your e-waste items based on current market prices and device condition.',
    },
    {
      title: 'Secure data destruction services',
      description:
        'Rest assured that all data on your devices will be securely wiped using industry-standard methods before recycling or resale.',
    },
    {
      title: 'Environmental impact report',
      description:
        'Receive a detailed report showing the environmental impact of your contribution, including CO2 saved, materials recovered, and landfill space preserved.',
    },
  ];

  return (
    <section id="features" className="py-16 md:py-24 px-4 sm:px-6 lg:px-8" style={{ backgroundColor: '#EDF2E4' }}>
      <div className="container mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
          {/* Left Content */}
          <div>
            <h2 
              className="text-4xl md:text-5xl lg:text-6xl font-bold mb-8 md:mb-12 text-left"
              style={{ color: '#333333', fontFamily: 'sans-serif' }}
            >
              Features
            </h2>
            <div className="space-y-0">
              {features.map((feature, index) => (
                <div key={index}>
                  <div 
                    className="border-b pb-4 pt-4"
                    style={{ borderColor: '#2D6A4F' }}
                  >
                    <button
                      onClick={() => setActiveIndex(activeIndex === index ? -1 : index)}
                      className="w-full text-left flex items-center justify-between"
                    >
                      <span 
                        className="text-lg md:text-xl font-semibold pr-4"
                        style={{ color: '#333333', fontFamily: 'sans-serif' }}
                      >
                        {feature.title}
                      </span>
                      <svg
                        className={`w-5 h-5 flex-shrink-0 transition-transform ${
                          activeIndex === index ? 'rotate-180' : ''
                        }`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        style={{ color: '#333333' }}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </button>
                    {activeIndex === index && (
                      <p 
                        className="mt-3 text-sm md:text-base leading-relaxed"
                        style={{ 
                          color: '#777777',
                          fontFamily: 'sans-serif'
                        }}
                      >
                        {feature.description}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
            <button 
              className="mt-8 md:mt-12 px-6 md:px-8 py-3 md:py-4 text-white text-base md:text-lg font-semibold rounded-lg transition-opacity hover:opacity-90"
              style={{ 
                backgroundColor: '#2D6A4F',
                fontFamily: 'sans-serif'
              }}
            >
              Start selling now
            </button>
          </div>

          {/* Right Image */}
          <div className="relative hidden lg:block">
            <img
              src={illustrationImage}
              alt="E-waste logistics and recycling illustration"
              className="w-full h-auto object-contain"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
