import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import SoundRecorder from '../components/sound/SoundRecorder';
import SoundUploader from '../components/sound/SoundUploader';
import { createSound } from '../services/dataService';
import { CATEGORIES } from '../utils/constants';

export default function UploadPage() {
  const navigate = useNavigate();
  const [tab, setTab] = useState('upload'); // upload | record
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('classic');
  const [audioData, setAudioData] = useState(null); // { url, duration }
  const [submitting, setSubmitting] = useState(false);

  const handleFileSelect = useCallback((file, url, duration) => {
    setAudioData({ url, duration });
  }, []);

  const handleRecordingComplete = useCallback((blob, url, duration) => {
    setAudioData({ url, duration });
  }, []);

  const handleSubmit = useCallback((e) => {
    e.preventDefault();
    if (!title.trim()) return;

    setSubmitting(true);

    // Create the sound
    createSound({
      title: title.trim(),
      description: description.trim(),
      category,
      audioUrl: audioData?.url || null,
      audioDuration: audioData?.duration || Math.floor(Math.random() * 10) + 2,
    });

    // Navigate to home
    setTimeout(() => {
      navigate('/');
    }, 500);
  }, [title, description, category, audioData, navigate]);

  return (
    <div className="upload-page">
      <div className="container">
        <div className="page-header">
          <h1 className="page-header__title">
            <span className="gradient-text">Upload Sound</span>
          </h1>
          <p className="page-header__subtitle">
            Share your sound with the community.
          </p>
        </div>

        <form className="upload-page__form" onSubmit={handleSubmit}>
          {/* Tab Selection */}
          <div className="tabs">
            <button
              type="button"
              className={`upload-page__tab ${tab === 'upload' ? 'active' : ''}`}
              onClick={() => setTab('upload')}
            >
              Upload File
            </button>
            <button
              type="button"
              className={`upload-page__tab ${tab === 'record' ? 'active' : ''}`}
              onClick={() => setTab('record')}
            >
              Record Audio
            </button>
          </div>

          {/* Upload / Record Area */}
          {tab === 'upload' ? (
            <SoundUploader onFileSelect={handleFileSelect} />
          ) : (
            <SoundRecorder onRecordingComplete={handleRecordingComplete} />
          )}

          {/* Sound Info */}
          <div className="upload-page__form-group">
            <label className="upload-page__label">Sound Name *</label>
            <input
              type="text"
              className="upload-page__input"
              placeholder="e.g., Thunder Clap Supreme"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              maxLength={50}
              required
            />
          </div>

          <div className="upload-page__form-group">
            <label className="upload-page__label">Description</label>
            <textarea
              className="upload-page__input upload-page__textarea"
              placeholder="Describe your sound..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              maxLength={200}
            />
          </div>

          <div className="upload-page__form-group">
            <label className="upload-page__label">Category</label>
            <div className="upload-page__categories">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat.id}
                  type="button"
                  className={`upload-page__category ${category === cat.id ? 'upload-page__category--active' : ''}`}
                  onClick={() => setCategory(cat.id)}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="btn btn--primary btn--lg btn--full"
            disabled={!audioData || !title.trim() || submitting}
          >
            {submitting ? 'Uploading...' : 'Publish Sound'}
          </button>
        </form>
      </div>
    </div>
  );
}
