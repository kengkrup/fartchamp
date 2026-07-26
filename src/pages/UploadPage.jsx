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
        <div className="upload-page__header">
          <h1 className="upload-page__title">
            🎙️ <span className="gradient-text">อัปโหลดเสียงตด</span>
          </h1>
          <p style={{ color: 'var(--color-text-secondary)' }}>
            แชร์เสียงตดของคุณกับโลก! 💨
          </p>
        </div>

        <form className="upload-page__form" onSubmit={handleSubmit}>
          {/* Tab Selection */}
          <div className="tabs">
            <button
              type="button"
              className={`tab ${tab === 'upload' ? 'tab--active' : ''}`}
              onClick={() => setTab('upload')}
            >
              📁 อัปโหลดไฟล์
            </button>
            <button
              type="button"
              className={`tab ${tab === 'record' ? 'tab--active' : ''}`}
              onClick={() => setTab('record')}
            >
              🎙️ อัดเสียง
            </button>
          </div>

          {/* Upload / Record Area */}
          {tab === 'upload' ? (
            <SoundUploader onFileSelect={handleFileSelect} />
          ) : (
            <SoundRecorder onRecordingComplete={handleRecordingComplete} />
          )}

          {/* Sound Info */}
          <div className="upload-page__field">
            <label className="upload-page__label">ชื่อเสียงตด *</label>
            <input
              type="text"
              className="input"
              placeholder="เช่น Thunder Clap Supreme"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              maxLength={50}
              required
            />
          </div>

          <div className="upload-page__field">
            <label className="upload-page__label">รายละเอียด</label>
            <textarea
              className="input textarea"
              placeholder="บรรยายเสียงตดของคุณ..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              maxLength={200}
            />
          </div>

          <div className="upload-page__field">
            <label className="upload-page__label">ประเภท</label>
            <div className="upload-page__categories">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat.id}
                  type="button"
                  className={`upload-page__category ${category === cat.id ? 'upload-page__category--active' : ''}`}
                  onClick={() => setCategory(cat.id)}
                >
                  {cat.emoji} {cat.label.split(' ')[0]}
                </button>
              ))}
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="btn btn--primary btn--lg"
            disabled={!title.trim() || submitting}
            style={{ width: '100%', marginTop: 'var(--space-md)' }}
          >
            {submitting ? '⏳ กำลังอัปโหลด...' : '🚀 ปล่อยเสียงสู่จักรวาล!'}
          </button>
        </form>
      </div>
    </div>
  );
}
