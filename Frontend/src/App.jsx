import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import HowItWorks from './components/HowItWorks';
import Results from './components/Results';
import About from './components/About';
import Testimonials from './components/Testimonials';
import Pricing from './components/Pricing';
import Contact from './components/Contact';
import Footer from './components/Footer';

export default function App() {
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem('theme');
    return saved === 'dark';
  });

  const [imageFile, setImageFile] = useState(null);
  const [imageSrc, setImageSrc] = useState(null);
  const [predictions, setPredictions] = useState(null); // null | 'error' | array
  const [loading, setLoading] = useState(false);

  // Apply dark mode class on mount
  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode);
  }, [darkMode]);

  const handleFileSelected = (file, src) => {
    setImageFile(file);
    setImageSrc(src);
    setPredictions(null);
  };

  const handlePredict = async () => {
    if (!imageFile) { alert('Please select a fabric image first.'); return; }
    setLoading(true);
    setPredictions(null);
    const formData = new FormData();
    formData.append('file', imageFile);
    try {
      const apiUrl = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000';
      const res = await fetch(`${apiUrl}/classify/`, { method: 'POST', body: formData });
      if (!res.ok) throw new Error(`API error: ${res.status}`);
      const data = await res.json();
      if (data.predictions?.length) {
        setPredictions(data.predictions);
        addToHistory(data.predictions[0]);
      } else {
        throw new Error('Invalid response');
      }
    } catch {
      setPredictions('error');
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setImageFile(null);
    setImageSrc(null);
    setPredictions(null);
    setLoading(false);
  };

  const addToHistory = (pred) => {
    const h = JSON.parse(localStorage.getItem('fabricai_history') || '[]');
    h.unshift({ ...pred, timestamp: Date.now() });
    if (h.length > 5) h.pop();
    localStorage.setItem('fabricai_history', JSON.stringify(h));
  };

  return (
    <>
      <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />
      <Hero onFileSelected={handleFileSelected} />
      <HowItWorks />
      <Results
        imageFile={imageFile}
        imageSrc={imageSrc}
        predictions={loading ? null : predictions}
        loading={loading}
        onPredict={handlePredict}
        onReset={handleReset}
      />
      <About />
      <Testimonials />
      <Pricing />
      <Contact />
      <Footer />
    </>
  );
}
