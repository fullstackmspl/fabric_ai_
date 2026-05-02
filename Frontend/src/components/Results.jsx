import React, { useState, useEffect, useRef } from 'react';

const EMPTY_IMG = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='260'%3E%3Crect width='400' height='260' fill='%23f9fafb'/%3E%3Ctext x='50%25' y='50%25' font-family='Arial' font-size='13' fill='%23d1d5db' text-anchor='middle' dominant-baseline='middle'%3ENo image uploaded%3C/text%3E%3C/svg%3E";

function PredictionRow({ pred, isTop, animate }) {
  const pct = (pred.confidence * 100).toFixed(1);
  const [width, setWidth] = useState('0%');

  useEffect(() => {
    if (animate) {
      const timer = setTimeout(() => setWidth(`${pct}%`), 60);
      return () => clearTimeout(timer);
    }
  }, [animate, pct]);

  return (
    <div className="flex items-center gap-3">
      <span className="w-5 text-center text-sm">{isTop ? '👑' : ''}</span>
      <span className={`text-sm capitalize w-24 ${isTop ? 'font-bold text-gray-900 dark:text-white' : 'text-gray-500 dark:text-slate-400'}`}>
        {pred.fabric_type}
      </span>
      <div className="flex-1 bg-gray-100 dark:bg-slate-700 rounded-full h-2 overflow-hidden">
        <div
          className={`h-2 rounded-full progress-bar-animate ${isTop ? 'bg-purple-600' : 'bg-purple-300 dark:bg-purple-700/60'}`}
          style={{ width }}
        ></div>
      </div>
      <span className={`text-sm w-12 text-right font-mono ${isTop ? 'font-bold text-purple-600 dark:text-purple-400' : 'text-gray-400 dark:text-slate-500'}`}>
        {pct}%
      </span>
    </div>
  );
}

function SkeletonRow() {
  return (
    <div className="flex items-center gap-3">
      <div className="w-5 h-4 skeleton rounded"></div>
      <div className="w-20 h-4 skeleton rounded"></div>
      <div className="flex-1 h-2 skeleton rounded-full"></div>
      <div className="w-10 h-4 skeleton rounded"></div>
    </div>
  );
}

export default function Results({ imageFile, imageSrc, predictions, loading, onPredict, onReset }) {
  const previewSrc = imageSrc || EMPTY_IMG;

  const addToHistory = (pred) => {
    const h = JSON.parse(localStorage.getItem('fabricai_history') || '[]');
    h.unshift({ ...pred, timestamp: Date.now() });
    if (h.length > 5) h.pop();
    localStorage.setItem('fabricai_history', JSON.stringify(h));
  };

  const exportToPDF = () => {
    if (!predictions) { alert('No predictions to export.'); return; }
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    doc.setFontSize(18); doc.setTextColor(109, 40, 217);
    doc.text('FabricAI Report', 20, 20);
    doc.setFontSize(11); doc.setTextColor(60, 60, 60);
    doc.text(`Generated: ${new Date().toLocaleString()}`, 20, 32);
    doc.text('Fabric Predictions:', 20, 46);
    let y = 56;
    predictions.forEach((p, i) => {
      doc.text(`${i + 1}. ${p.fabric_type}: ${(p.confidence * 100).toFixed(1)}% confidence`, 25, y); y += 9;
    });
    doc.setFontSize(9); doc.setTextColor(120, 120, 120);
    doc.text('Note: AI-generated results — verify for critical applications.', 20, y + 10);
    doc.save(`fabricai_report_${Date.now()}.pdf`);
  };

  const shareResults = async () => {
    if (!predictions) { alert('No results to share.'); return; }
    const text = predictions.map(p => `${p.fabric_type}: ${(p.confidence * 100).toFixed(1)}%`).join('\n');
    if (navigator.share) await navigator.share({ title: 'FabricAI Result', text });
    else { await navigator.clipboard.writeText(text); alert('Copied to clipboard!'); }
  };

  const downloadImage = () => {
    if (!imageFile) { alert('No image to save'); return; }
    const link = document.createElement('a');
    link.download = 'fabric_preview.jpg'; link.href = previewSrc; link.click();
  };

  const renderPredictions = () => {
    if (loading) {
      return (
        <div className="space-y-4">
          {[1, 2, 3, 4].map(i => <SkeletonRow key={i} />)}
        </div>
      );
    }
    if (!predictions) {
      return (
        <div className="text-center py-12 text-gray-300 dark:text-slate-600">
          <i className="fas fa-images text-4xl mb-3 block"></i>
          <p className="text-sm">Upload an image to see predictions</p>
        </div>
      );
    }
    if (predictions === 'error') {
      return (
        <div className="text-center py-8 bg-red-50 dark:bg-red-900/20 rounded-xl p-4">
          <i className="fas fa-exclamation-triangle text-red-400 text-2xl mb-2 block"></i>
          <p className="text-sm text-red-500">⚠️ Backend not reachable at http://127.0.0.1:8000/</p>
        </div>
      );
    }
    return (
      <div className="space-y-4">
        {predictions.map((pred, i) => (
          <PredictionRow key={i} pred={pred} isTop={i === 0} animate={true} />
        ))}
      </div>
    );
  };

  return (
    <section id="results-section" className="max-w-6xl mx-auto px-6 md:px-10 pb-10">
      <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-gray-100 dark:border-slate-700 overflow-hidden">

        {/* Header */}
        <div className="px-7 py-4 border-b border-gray-100 dark:border-slate-700 flex items-center gap-2">
          <i className="fas fa-star text-purple-500 text-sm"></i>
          <h2 className="font-bold text-gray-900 dark:text-white">Results</h2>
        </div>

        <div className="p-7 grid lg:grid-cols-2 gap-8">

          {/* LEFT: Image */}
          <div>
            <p className="text-xs font-semibold text-gray-500 dark:text-slate-400 uppercase tracking-wider mb-3">Uploaded Image</p>
            <div className="rounded-xl overflow-hidden bg-gray-50 dark:bg-slate-900 border border-gray-200 dark:border-slate-700 min-h-[200px] flex items-center justify-center">
              <img id="previewImg" src={previewSrc} alt="Fabric" className="w-full object-cover max-h-64" />
            </div>
            <div className="flex gap-2 mt-3">
              <button
                id="shareImageBtn"
                onClick={shareResults}
                className="flex-1 text-xs border border-gray-200 dark:border-slate-600 text-gray-500 dark:text-slate-400 py-2 rounded-lg hover:bg-gray-50 dark:hover:bg-slate-700 transition flex items-center justify-center gap-1.5"
              >
                <i className="fas fa-share-alt text-purple-400 text-xs"></i> Share
              </button>
              <button
                id="downloadImageBtn"
                onClick={downloadImage}
                className="flex-1 text-xs border border-gray-200 dark:border-slate-600 text-gray-500 dark:text-slate-400 py-2 rounded-lg hover:bg-gray-50 dark:hover:bg-slate-700 transition flex items-center justify-center gap-1.5"
              >
                <i className="fas fa-download text-purple-400 text-xs"></i> Save
              </button>
            </div>
          </div>

          {/* RIGHT: Predictions */}
          <div>
            <p className="text-xs font-semibold text-gray-500 dark:text-slate-400 uppercase tracking-wider mb-4">Predictions</p>
            <div id="predictionsList">{renderPredictions()}</div>
          </div>

        </div>

        {/* Action buttons */}
        <div className="px-7 pb-5 flex flex-col sm:flex-row gap-3">
          <button
            id="uploadAnotherBtn"
            onClick={onReset}
            className="flex-1 border border-gray-200 dark:border-slate-600 text-gray-700 dark:text-slate-300 font-semibold py-2.5 rounded-lg hover:bg-gray-50 dark:hover:bg-slate-700 transition flex items-center justify-center gap-2 text-sm"
          >
            <i className="fas fa-redo text-xs text-purple-500"></i> Upload Another
          </button>
          <button
            id="predictBtn"
            onClick={onPredict}
            className="flex-1 bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2.5 rounded-lg shadow transition flex items-center justify-center gap-2 text-sm"
          >
            <i className="fas fa-magic text-xs"></i> Identify Fabric
          </button>
          <button
            id="downloadResultBtn"
            onClick={exportToPDF}
            className="flex-1 bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2.5 rounded-lg shadow transition flex items-center justify-center gap-2 text-sm"
          >
            <i className="fas fa-download text-xs"></i> Download Result
          </button>
        </div>

        {/* Note bar */}
        <div className="bg-emerald-50 dark:bg-emerald-900/20 border-t border-emerald-100 dark:border-emerald-800/30 px-7 py-3.5 flex items-start gap-2.5">
          <i className="fas fa-shield-alt text-emerald-500 text-sm mt-0.5 flex-shrink-0"></i>
          <p className="text-xs text-emerald-700 dark:text-emerald-400 leading-relaxed">
            <strong>Note:</strong> Results are generated by AI and may not be 100% accurate. Please verify for critical applications.
          </p>
        </div>

      </div>
    </section>
  );
}
