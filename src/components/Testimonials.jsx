import { useState, useRef } from 'react';

const Testimonials = () => {
  const scrollContainerRef = useRef(null);

  const testimonials = [
    {
      name: 'Mike R.',
      text: 'As a small business owner, responsible disposal of our outdated electronics was a priority. This platform provided a seamless solution, from the instant valuation of our e-waste to the data destruction service.',
    },
    {
      name: 'Tom W.',
      text: 'I never thought my old smartphone could put some extra cash in my pocket until I found this platform. The valuation was quick, the pickup convenient, and the payment was prompt.',
    },
    {
      name: 'Sarah H.',
      text: "The environmental impact report I received after selling my e-waste was eye-opening. It feels great to know I'm making a difference while earning money. Highly recommend!",
    },
    {
      name: 'David K.',
      text: 'Professional service from start to finish. The secure data destruction gave me peace of mind, and the whole process was incredibly smooth.',
    },
  ];

  const scroll = (direction) => {
    if (scrollContainerRef.current) {
      const scrollAmount = 400; // Adjust based on card width + gap
      scrollContainerRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  return (
    <section className="py-16 md:py-24 px-4 sm:px-6 lg:px-8" style={{ backgroundColor: '#1A1A1A' }}>
      <div className="container mx-auto">
        {/* Title - Top Left */}
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-12 md:mb-16">
          Testimonials
        </h2>

        <div className="relative">
          {/* Navigation Arrows */}
          <button
            onClick={() => scroll('left')}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-12 z-10 bg-white rounded-full p-2 md:p-3 shadow-lg hover:bg-gray-100 transition-colors"
            aria-label="Previous testimonial"
          >
            <svg
              className="w-5 h-5 md:w-6 md:h-6 text-gray-700"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>
          <button
            onClick={() => scroll('right')}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-12 z-10 bg-white rounded-full p-2 md:p-3 shadow-lg hover:bg-gray-100 transition-colors"
            aria-label="Next testimonial"
          >
            <svg
              className="w-5 h-5 md:w-6 md:h-6 text-gray-700"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>

          {/* Testimonials Carousel */}
          <div
            ref={scrollContainerRef}
            className="flex gap-4 md:gap-6 overflow-x-auto scrollbar-hide pb-4"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {testimonials.map((testimonial, idx) => (
              <div
                key={`${testimonial.name}-${idx}`}
                className="flex-shrink-0 w-[300px] md:w-[350px] lg:w-[400px]"
              >
                <div className="rounded-xl p-6 md:p-8 border border-gray-300 bg-transparent h-full">
                  <p className="text-white mb-4 text-base md:text-lg leading-relaxed">
                    "{testimonial.text}"
                  </p>
                  <p className="text-white font-medium text-sm md:text-base">
                    {testimonial.name}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Try yourself Button */}
        <div className="text-center mt-12">
          <button
            className="px-8 md:px-12 py-3 md:py-4 text-white text-lg md:text-xl font-semibold rounded-full hover:opacity-90 transition-opacity"
            style={{ backgroundColor: '#2E6A5B' }}
          >
            Try yourself
          </button>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
