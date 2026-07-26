import { useRef, useState } from 'react';
import { validateAudioFile, getAudioDuration } from '../../utils/audio';
import { FiUploadCloud, FiFile, FiX } from 'react-icons/fi';

export default function SoundUploader({ onFileSelect }) {
  const [dragOver, setDragOver] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [error, setError] = useState(null);
  const fileInputRef = useRef(null);

  const handleFile = async (file) => {
    setError(null);
    const validation = validateAudioFile(file);
    if (!validation.valid) {
      setError(validation.error);
      return;
    }

    const url = URL.createObjectURL(file);
    const duration = await getAudioDuration(file);

    setSelectedFile({ file, url, duration, name: file.name });

    if (onFileSelect) {
      onFileSelect(file, url, duration);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  };

  const handleInputChange = (e) => {
    const file = e.target.files[0];
    if (file) handleFile(file);
  };

  const clearFile = () => {
    if (selectedFile?.url) URL.revokeObjectURL(selectedFile.url);
    setSelectedFile(null);
    setError(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  return (
    <div>
      {!selectedFile ? (
        <div
          className={`upload-area ${dragOver ? 'upload-area--active' : ''}`}
          style={dragOver ? { borderColor: 'var(--color-toxic-green)', background: 'var(--color-toxic-green-dim)' } : {}}
          onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
          onDragLeave={() => setDragOver(false)}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
        >
          <div className="upload-area__icon">
            <FiUploadCloud size={48} style={{ color: 'var(--color-toxic-green)' }} />
          </div>
          <p className="upload-area__text">
            Drag & drop audio file here
          </p>
          <p className="upload-area__hint">
            <span className="upload-page__help-text">or click to browse • MP3, WAV, OGG, M4A • Max 5MB</span>
          </p>
          <input
            ref={fileInputRef}
            type="file"
            accept="audio/*"
            onChange={handleInputChange}
            style={{ display: 'none' }}
          />
        </div>
      ) : (
        <div className="glass-card" style={{ padding: 'var(--space-lg)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-md)', marginBottom: 'var(--space-md)' }}>
            <FiFile size={24} style={{ color: 'var(--color-toxic-green)' }} />
            <div style={{ flex: 1 }}>
              <p style={{ fontWeight: 600 }}>{selectedFile.name}</p>
              <p style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)' }}>
                {(selectedFile.file.size / 1024 / 1024).toFixed(2)} MB • {Math.round(selectedFile.duration)}s
              </p>
            </div>
            <button className="btn btn--ghost btn--icon" onClick={clearFile}>
              <FiX />
            </button>
          </div>
          <audio controls src={selectedFile.url} style={{ width: '100%' }} />
        </div>
      )}

      {error && (
        <p style={{ color: 'var(--color-danger)', fontSize: 'var(--text-sm)', marginTop: 'var(--space-sm)' }}>
          ❌ {error}
        </p>
      )}
    </div>
  );
}
