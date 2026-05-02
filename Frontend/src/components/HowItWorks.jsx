import React from 'react';

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="max-w-6xl mx-auto px-6 md:px-10 py-8">
      <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-gray-100 dark:border-slate-700 px-8 py-7">
        <p className="text-purple-600 dark:text-purple-400 font-semibold text-sm text-center mb-6">How it works</p>
        <div className="flex flex-col md:flex-row items-start gap-2">

          {/* Step 1 */}
          <div className="flex items-start gap-3 flex-1">
            <div className="w-11 h-11 rounded-full bg-purple-50 dark:bg-purple-900/30 flex items-center justify-center flex-shrink-0">
              <i className="fas fa-upload text-purple-600 text-sm"></i>
            </div>
            <div className="pt-1">
              <p className="font-bold text-gray-900 dark:text-white text-sm">1. Upload Image</p>
              <p className="text-gray-500 dark:text-slate-400 text-xs mt-0.5 leading-relaxed">
                Upload a clear image of the fabric you want to identify.
              </p>
            </div>
          </div>

          <div className="step-connector hidden md:block"></div>

          {/* Step 2 */}
          <div className="flex items-start gap-3 flex-1">
            <div className="w-11 h-11 rounded-full bg-purple-50 dark:bg-purple-900/30 flex items-center justify-center flex-shrink-0">
              <i className="fas fa-brain text-purple-600 text-sm"></i>
            </div>
            <div className="pt-1">
              <p className="font-bold text-gray-900 dark:text-white text-sm">2. AI Analyzes</p>
              <p className="text-gray-500 dark:text-slate-400 text-xs mt-0.5 leading-relaxed">
                Our AI model analyzes the texture, patterns and characteristics.
              </p>
            </div>
          </div>

          <div className="step-connector hidden md:block"></div>

          {/* Step 3 */}
          <div className="flex items-start gap-3 flex-1">
            <div className="w-11 h-11 rounded-full bg-purple-50 dark:bg-purple-900/30 flex items-center justify-center flex-shrink-0">
              <i className="fas fa-check-circle text-purple-600 text-sm"></i>
            </div>
            <div className="pt-1">
              <p className="font-bold text-gray-900 dark:text-white text-sm">3. Get Result</p>
              <p className="text-gray-500 dark:text-slate-400 text-xs mt-0.5 leading-relaxed">
                Get instant fabric type prediction with confidence score.
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
