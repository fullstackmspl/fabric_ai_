import React, { useRef, useState } from 'react';

export default function Hero({ onFileSelected }) {
  const fileInputRef = useRef(null);
  const [previewSrc, setPreviewSrc] = useState(null);
  const [isDragOver, setIsDragOver] = useState(false);

  const handleFile = (file) => {
    if (!file || !file.type.startsWith('image/')) {
      alert('Please select an image file.');
      return;
    }
    const reader = new FileReader();
    reader.onload = (e) => {
      setPreviewSrc(e.target.result);
      onFileSelected(file, e.target.result);
    };
    reader.readAsDataURL(file);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragOver(false);
    handleFile(e.dataTransfer.files[0]);
  };

  return (
    <section id="home">
      <div id="hero" style={{ minHeight: '500px', position: 'relative' }}>
        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-10 py-16 flex flex-col lg:flex-row items-center gap-10">

          {/* Left text */}
          <div className="flex-1 max-w-xl">
            <div className="inline-flex items-center gap-1.5 bg-purple-50 dark:bg-purple-900/40 text-purple-600 dark:text-purple-300 text-xs font-bold px-3 py-1.5 rounded-full mb-5 tracking-wide uppercase border border-purple-200 dark:border-purple-700">
              <i className="fas fa-magic text-xs"></i> AI Powered
            </div>

            <h1 className="text-4xl md:text-5xl font-extrabold leading-tight text-gray-900 dark:text-white mb-4">
              Identify Any Fabric
              <br /><span className="text-purple-600 dark:text-purple-400">In Seconds</span>
            </h1>
            <p className="text-gray-600 dark:text-slate-400 text-base md:text-lg mb-8 max-w-md leading-relaxed">
              Upload a fabric image and our AI will tell you what type of fabric it is with confidence.
            </p>

            <div className="flex flex-wrap gap-3">
              <span className="feature-pill"><i className="fas fa-crosshairs text-purple-500 text-xs"></i> Accurate</span>
              <span className="feature-pill"><i className="fas fa-bolt text-purple-500 text-xs"></i> Fast</span>
              <span className="feature-pill"><i className="fas fa-check-circle text-purple-500 text-xs"></i> Easy to Use</span>
            </div>
          </div>

          {/* Right: Upload card */}
          <div className="w-full max-w-sm">
            <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl p-6 border border-gray-100 dark:border-slate-700">
              <div className="text-center mb-5">
                <div className="w-14 h-14 bg-purple-50 dark:bg-purple-900/30 rounded-full flex items-center justify-center mx-auto mb-3">
                  <i className="fas fa-cloud-upload-alt text-purple-500 text-xl"></i>
                </div>
                <h2 className="text-base font-bold text-gray-900 dark:text-white">Upload Fabric Image</h2>
                <p className="text-gray-400 dark:text-slate-500 text-xs mt-0.5">Drag and drop or click to browse</p>
              </div>

              {/* Drop zone */}
              <div
                id="dropZone"
                className={`border-2 border-dashed rounded-xl p-7 text-center cursor-pointer transition min-h-[110px] flex flex-col items-center justify-center ${
                  isDragOver
                    ? 'drop-zone-drag-over border-purple-400'
                    : 'border-purple-200 dark:border-slate-600 hover:border-purple-400 hover:bg-purple-50/50 dark:hover:bg-slate-700/50'
                }`}
                onClick={() => fileInputRef.current.click()}
                onDragOver={(e) => { e.preventDefault(); setIsDragOver(true); }}
                onDragLeave={() => setIsDragOver(false)}
                onDrop={handleDrop}
              >
                <input
                  type="file"
                  ref={fileInputRef}
                  accept="image/jpeg,image/png,image/jpg,image/webp"
                  className="hidden"
                  onChange={(e) => { if (e.target.files[0]) handleFile(e.target.files[0]); }}
                />
                {previewSrc ? (
                  <img src={previewSrc} className="w-full h-28 object-cover rounded-lg mb-2" alt="Preview" />
                ) : (
                  <div className="flex flex-col items-center">
                    <i className="fas fa-images text-3xl text-purple-300 dark:text-slate-500 mb-1.5"></i>
                    <p className="text-xs text-gray-400 dark:text-slate-500">Drop image here</p>
                  </div>
                )}
              </div>

              <button
                id="chooseImageBtn"
                onClick={() => fileInputRef.current.click()}
                className="w-full mt-4 bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2.5 rounded-lg shadow transition flex items-center justify-center gap-2 text-sm"
              >
                <i className="fas fa-upload text-xs"></i> Choose Image
              </button>
              <p className="text-xs text-center text-gray-400 dark:text-slate-500 mt-2.5">
                Supports: JPG, PNG, WEBP (Max 10MB)
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
