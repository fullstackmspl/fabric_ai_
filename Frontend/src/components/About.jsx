import React from 'react';

export default function About() {
  return (
    <section id="about" className="max-w-6xl mx-auto px-6 md:px-10 pb-10">
      <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-gray-100 dark:border-slate-700 p-8 text-center hover-lift">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">About FabricAI</h2>
        <p className="text-gray-500 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed text-sm">
          FabricAI is an AI‑powered fabric recognition tool built for designers, tailors, and fabric enthusiasts.
          Our deep learning model analyses texture, weave, and pattern to identify fabrics in seconds with high accuracy.
        </p>
      </div>
    </section>
  );
}
