import React from 'react';

export default function Footer() {
  return (
    <footer className="bg-white dark:bg-slate-900 border-t border-gray-100 dark:border-slate-800 py-5 px-6">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-3 text-xs text-gray-400 dark:text-slate-500">
        <div className="flex gap-5">
          <a href="#home" className="hover:text-purple-600 transition">Home</a>
          <a href="#about" className="hover:text-purple-600 transition">About</a>
          <a href="#how-it-works" className="hover:text-purple-600 transition">How It Works</a>
          <a href="#contact" className="hover:text-purple-600 transition">Contact</a>
        </div>
        <p>© 2025 FabricAI — Smart Fabric Recognition</p>
      </div>
    </footer>
  );
}
