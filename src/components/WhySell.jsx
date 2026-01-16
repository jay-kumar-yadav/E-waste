const WhySell = () => {
  const benefits = [
    {
      icon: (
        <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 18.75a6 6 0 006-6v-1.5m-6 7.5a6 6 0 01-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 01-3-3V4.5a3 3 0 116 0v8.25a3 3 0 01-3 3z" />
        </svg>
      ),
      title: 'Environmental impact',
      description:
        'Every device contains valuable materials that can be recycled, reducing the demand for new resources and minimizing environmental degradation.',
    },
    {
      icon: (
        <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z" />
        </svg>
      ),
      title: 'Earn cash for your clutter',
      description:
        'Selling your e-waste not only clears up space in your home or office but also puts money back in your pocket.',
    },
    {
      icon: (
        <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 1.5v0m0 0h3m-3 0H9m1.5 0v0M10.5 1.5h3m-3 0H9m1.5 0v0M10.5 1.5c-1.38 0-2.5 1.12-2.5 2.5v15c0 1.38 1.12 2.5 2.5 2.5h3c1.38 0 2.5-1.12 2.5-2.5V4c0-1.38-1.12-2.5-2.5-2.5h-3z" />
        </svg>
      ),
      title: 'Stay tech-savvy',
      description:
        'Selling your outdated electronics allows you to keep up with the latest technology trends.',
    },
    {
      icon: (
        <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0112 2.25c-2.393 0-4.635.89-6.318 2.5A11.96 11.96 0 003.75 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 8.25a3 3 0 11-6 0" />
        </svg>
      ),
      title: 'Data security',
      description:
        'Selling your old electronics through a reputable platform ensures secure data destruction. Protect your personal information and sensitive information easily.',
    },
    {
      icon: (
        <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
        </svg>
      ),
      title: 'Reduce e-waste landfills',
      description:
        'Electronic waste in landfills poses significant environmental risks. By selling your e-waste, you contribute to the reduction of landfills.',
    },
    {
      icon: (
        <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
        </svg>
      ),
      title: 'Educate & inspire',
      description:
        "Selling e-waste isn't just a transaction; It's an opportunity to educate others about the importance of responsible disposal.",
    },
  ];

  return (
    <section className="py-16 md:py-24 px-4 sm:px-6 lg:px-8" style={{ backgroundColor: '#2E6056' }}>
      <div className="container mx-auto">
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white text-left mb-12 md:mb-16">
          Why sell E-waste?
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className="rounded-lg p-6 md:p-8"
              style={{ backgroundColor: '#3C6D63' }}
            >
              <div className="text-white mb-4">{benefit.icon}</div>
              <h3 className="text-xl md:text-2xl font-bold text-white mb-3 text-left">
                {benefit.title}
              </h3>
              <p className="text-white text-sm md:text-base leading-relaxed text-left">
                {benefit.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhySell;
