import { useState, useRef, useCallback } from 'react';
import { createRecorder, stopStream } from '../../utils/audio';
import { formatDuration } from '../../utils/formatters';
import { FiMic, FiSquare, FiTrash2, FiCheck } from 'react-icons/fi';

export default function SoundRecorder({ onRecordingComplete }) {
  const [state, setState] = useState('idle'); // idle | recording | preview
  const [timer, setTimer] = useState(0);
  const [audioBlob, setAudioBlob] = useState(null);
  const [audioUrl, setAudioUrl] = useState(null);
  const recorderRef = useRef(null);
  const timerRef = useRef(null);

  const startRecording = useCallback(async () => {
    try {
      const recorder = await createRecorder();
      recorderRef.current = recorder;

      recorder.mediaRecorder.start();
      setState('recording');
      setTimer(0);

      timerRef.current = setInterval(() => {
        setTimer((prev) => {
          if (prev >= 30) {
            stopRecording();
            return prev;
          }
          return prev + 1;
        });
      }, 1000);
    } catch (err) {
      alert('ไม่สามารถเข้าถึงไมโครโฟนได้ กรุณาอนุญาตการใช้งานไมค์');
    }
  }, []);

  const stopRecording = useCallback(() => {
    const recorder = recorderRef.current;
    if (!recorder) return;

    clearInterval(timerRef.current);

    recorder.mediaRecorder.onstop = () => {
      const blob = recorder.getBlob();
      const url = URL.createObjectURL(blob);
      setAudioBlob(blob);
      setAudioUrl(url);
      setState('preview');
      stopStream(recorder.stream);
    };

    recorder.mediaRecorder.stop();
  }, []);

  const discardRecording = useCallback(() => {
    if (audioUrl) URL.revokeObjectURL(audioUrl);
    setAudioBlob(null);
    setAudioUrl(null);
    setState('idle');
    setTimer(0);
  }, [audioUrl]);

  const confirmRecording = useCallback(() => {
    if (audioBlob && onRecordingComplete) {
      onRecordingComplete(audioBlob, audioUrl, timer);
    }
  }, [audioBlob, audioUrl, timer, onRecordingComplete]);

  return (
    <div className="recorder glass-card">
      <div
        className={`recorder__visual ${state === 'recording' ? 'recorder__visual--recording record-pulse' : ''}`}
      >
        <span className="recorder__icon">
          {state === 'idle' && '🎙️'}
          {state === 'recording' && '🔴'}
          {state === 'preview' && '✅'}
        </span>
      </div>

      <div className="recorder__timer">
        {formatDuration(timer)}
        {state === 'recording' && (
          <span style={{ fontSize: 'var(--text-sm)', color: 'var(--color-danger)', marginLeft: 'var(--space-sm)' }}>
            ● กำลังอัด...
          </span>
        )}
      </div>

      {state === 'preview' && audioUrl && (
        <div style={{ marginBottom: 'var(--space-lg)' }}>
          <audio controls src={audioUrl} style={{ width: '100%' }} />
        </div>
      )}

      <div className="recorder__controls">
        {state === 'idle' && (
          <button className="btn btn--primary btn--lg" onClick={startRecording}>
            <FiMic /> เริ่มอัดเสียง
          </button>
        )}

        {state === 'recording' && (
          <button className="btn btn--danger btn--lg" onClick={stopRecording}>
            <FiSquare /> หยุดอัด
          </button>
        )}

        {state === 'preview' && (
          <>
            <button className="btn btn--secondary" onClick={discardRecording}>
              <FiTrash2 /> อัดใหม่
            </button>
            <button className="btn btn--primary" onClick={confirmRecording}>
              <FiCheck /> ใช้เสียงนี้
            </button>
          </>
        )}
      </div>

      {state === 'idle' && (
        <p style={{
          marginTop: 'var(--space-lg)',
          fontSize: 'var(--text-sm)',
          color: 'var(--color-text-muted)',
        }}>
          อัดเสียงได้สูงสุด 30 วินาที 💨
        </p>
      )}
    </div>
  );
}
