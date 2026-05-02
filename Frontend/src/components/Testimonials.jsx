import React from 'react';

const testimonials = [
  {
    quote: '"93% accuracy – This tool is a game-changer for my fashion startup."',
    name: 'Clara M.',
    role: 'Fashion Designer',
    icon: 'fa-user-circle',
  },
  {
    quote: '"A must-have for anyone dealing with textiles. Speed and precision are unmatched."',
    name: 'Daniel R.',
    role: 'Textile Sourcing',
    icon: 'fa-user-tie',
  },
  {
    quote: '"Incredibly easy to use and surprisingly accurate. Brilliant for my archive."',
    name: 'Sarah L.',
    role: 'Vintage Curator',
    icon: 'fa-user-astronaut',
  },
];

export default function Testimonials() {
  return (
    <section className="max-w-6xl mx-auto px-6 md:px-10 pb-10">
      <div className="text-center mb-7">
        <p className="text-purple-600 font-semibold text-xs uppercase tracking-wider mb-1">❤️ Community love</p>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Trusted by Fabric Enthusiasts</h2>
      </div>
      <div className="grid md:grid-cols-3 gap-5">
        {testimonials.map((t, i) => (
          <div key={i} className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-slate-700 hover-lift">
            <div className="text-yellow-400 text-sm">★★★★★</div>
            <p className="text-gray-500 dark:text-slate-400 mt-3 italic text-sm">{t.quote}</p>
            <div className="flex items-center gap-3 mt-4">
              <div className="w-9 h-9 bg-purple-100 dark:bg-purple-900/40 rounded-full flex items-center justify-center">
                <i className={`fas ${t.icon} text-purple-500 text-base`}></i>
              </div>
              <div>
                <p className="font-bold text-gray-900 dark:text-white text-sm">{t.name}</p>
                <p className="text-xs text-gray-400">{t.role}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
