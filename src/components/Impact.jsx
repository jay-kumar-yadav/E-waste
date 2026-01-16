const Impact = () => {
  const stats = [
    {
      value: '$3M+',
      label: 'earned by users',
    },
    {
      value: '1M+',
      label: 'tons of landfills cleaned',
    },
    {
      value: '500k+',
      label: 'kilowatts of energy saved',
    },
    {
      value: '300+',
      label: 'jobs created for e-waste industry',
    },
  ];

  return (
    <section 
      className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 relative"
      style={{ backgroundColor: '#2A2A2A' }}
    >
      {/* Subtle background pattern */}
      <div 
        className="absolute inset-0 opacity-5 pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle at top right, rgba(255,255,255,0.1) 0%, transparent 50%)`,
        }}
      ></div>
      
      <div className="container mx-auto relative z-10">
        <h2 
          className="text-4xl md:text-5xl lg:text-6xl font-bold text-white text-left mb-12 md:mb-16"
          style={{ fontFamily: 'sans-serif', fontWeight: 700 }}
        >
          Impact
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="rounded-xl p-6 md:p-8 text-left"
              style={{ 
                backgroundColor: '#4B4B4B',
                borderRadius: '16px'
              }}
            >
              <div 
                className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-2"
                style={{ fontFamily: 'sans-serif', fontWeight: 700 }}
              >
                {stat.value}
              </div>
              <div 
                className="text-white text-sm md:text-base leading-relaxed"
                style={{ fontFamily: 'sans-serif', fontWeight: 400 }}
              >
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Impact;
