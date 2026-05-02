import React from 'react';

export default function Pricing() {
  return (
    <section id="pricing" className="max-w-6xl mx-auto px-6 md:px-10 pb-10">
      <div className="text-center mb-7">
        <p className="text-purple-600 font-semibold text-xs uppercase tracking-wider mb-1">Transparent Plans</p>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Simple, Transparent Pricing</h2>
      </div>
      <div className="grid md:grid-cols-2 gap-5 max-w-2xl mx-auto">

        {/* Basic */}
        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-gray-100 dark:border-slate-700 p-7 hover-lift">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white">Basic</h3>
          <div className="mt-2">
            <span className="text-3xl font-black text-gray-900 dark:text-white">$0</span>
            <span className="text-gray-400 text-sm"> / month</span>
          </div>
          <ul className="mt-5 space-y-2 text-sm text-gray-600 dark:text-slate-400">
            <li className="flex gap-2 items-center"><i className="fas fa-check-circle text-green-500 text-xs"></i> 10 scans per month</li>
            <li className="flex gap-2 items-center"><i className="fas fa-chart-line text-green-500 text-xs"></i> Standard accuracy</li>
            <li className="flex gap-2 items-center"><i className="fas fa-envelope text-green-500 text-xs"></i> Email support</li>
          </ul>
          <button className="w-full mt-6 border border-gray-200 dark:border-slate-600 text-gray-800 dark:text-slate-300 font-semibold py-2.5 rounded-lg hover:bg-gray-50 dark:hover:bg-slate-700 transition text-sm">
            Get Started
          </button>
        </div>

        {/* Pro */}
        <div className="bg-purple-600 rounded-2xl shadow-lg p-7 hover-lift relative">
          <div className="absolute top-0 right-5 bg-white text-purple-600 text-xs font-bold px-3 py-1 rounded-b-lg tracking-wide">POPULAR</div>
          <h3 className="text-xl font-bold text-white">Pro</h3>
          <div className="mt-2">
            <span className="text-3xl font-black text-white">$199</span>
            <span className="text-purple-200 text-sm"> / month</span>
          </div>
          <ul className="mt-5 space-y-2 text-sm text-purple-100">
            <li className="flex gap-2 items-center"><i className="fas fa-infinity text-white text-xs"></i> Unlimited scans</li>
            <li className="flex gap-2 items-center"><i className="fas fa-microchip text-white text-xs"></i> Ultimate accuracy</li>
            <li className="flex gap-2 items-center"><i className="fas fa-headset text-white text-xs"></i> Priority support</li>
          </ul>
          <button className="w-full mt-6 bg-white text-purple-600 font-semibold py-2.5 rounded-lg hover:bg-purple-50 transition text-sm">
            Get Started →
          </button>
        </div>

      </div>
    </section>
  );
}
