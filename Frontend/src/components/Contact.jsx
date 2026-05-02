import React from 'react';

export default function Contact() {
  return (
    <section id="contact" className="max-w-6xl mx-auto px-6 md:px-10 pb-12">
      <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-gray-100 dark:border-slate-700 p-8 text-center">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Contact Us</h2>
        <p className="text-gray-500 dark:text-slate-400 mb-5 text-sm">Have questions? Reach out to our team.</p>
        <a
          href="mailto:hello@fabricai.com"
          className="inline-block bg-purple-600 hover:bg-purple-700 text-white px-6 py-2.5 rounded-full text-sm font-medium transition"
        >
          hello@fabricai.com
        </a>
        <div className="flex justify-center gap-4 mt-5 text-purple-500 dark:text-purple-400">
          <i className="fab fa-twitter text-xl cursor-pointer hover:scale-110 transition"></i>
          <i className="fab fa-linkedin text-xl cursor-pointer hover:scale-110 transition"></i>
          <i className="fab fa-github text-xl cursor-pointer hover:scale-110 transition"></i>
        </div>
      </div>
    </section>
  );
}
