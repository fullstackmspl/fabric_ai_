import React from 'react';

export default function Navbar({ darkMode, setDarkMode }) {
  const handleToggle = () => {
    const isDark = !darkMode;
    setDarkMode(isDark);
    document.documentElement.classList.toggle('dark', isDark);
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
  };

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <nav className="bg-white dark:bg-slate-900 border-b border-gray-100 dark:border-slate-800 sticky top-0 z-40 shadow-sm">
      <div className="max-w-7xl mx-auto px-6 md:px-10 py-3.5 flex items-center justify-between gap-4">

        {/* Logo */}
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 bg-purple-600 rounded-lg flex items-center justify-center text-white">
            <i className="fas fa-th text-sm"></i>
          </div>
          <div>
            <span className="text-lg font-extrabold text-gray-900 dark:text-white">
              Fabric<span className="text-purple-600">AI</span>
            </span>
            <p className="text-xs text-gray-400 dark:text-slate-500 leading-none -mt-0.5">Smart Fabric Recognition</p>
          </div>
        </div>

        {/* Links */}
        <div className="hidden md:flex items-center gap-1 text-gray-600 dark:text-slate-400 text-sm font-medium">
          <a href="#home" className="nav-active">Home</a>
          <a href="#about" className="px-4 py-1 hover:text-purple-600 dark:hover:text-purple-400 transition rounded-full">About</a>
          <a href="#how-it-works" className="px-4 py-1 hover:text-purple-600 dark:hover:text-purple-400 transition rounded-full">How It Works</a>
          <a href="#contact" className="px-4 py-1 hover:text-purple-600 dark:hover:text-purple-400 transition rounded-full">Contact</a>
        </div>

        {/* Right */}
        <div className="flex items-center gap-3">
          <div className="theme-toggle">
            <input
              type="checkbox"
              id="themeToggle"
              checked={darkMode}
              onChange={handleToggle}
            />
            <label htmlFor="themeToggle" className="toggle-label">
              <span className="icon sun"><i className="fas fa-sun"></i></span>
              <span className="icon moon"><i className="fas fa-moon"></i></span>
              <span className="ball"></span>
            </label>
          </div>
          <button
            id="tryClassifierBtn"
            onClick={() => scrollTo('home')}
            className="bg-purple-600 hover:bg-purple-700 text-white text-sm font-semibold px-5 py-2 rounded-lg shadow transition flex items-center gap-2"
          >
            <i className="fas fa-microchip text-xs"></i> Try Classifier
          </button>
        </div>

      </div>
    </nav>
  );
}
