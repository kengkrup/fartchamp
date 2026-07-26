// Audio utility functions

/**
 * Generate a visual waveform array from audio data
 * Returns an array of normalized bar heights (0 to 1)
 */
export function generateWaveform(numBars = 40) {
  // Generate a realistic-looking random waveform
  const bars = [];
  for (let i = 0; i < numBars; i++) {
    // Create natural-looking waveform shape
    const position = i / numBars;
    const envelope = Math.sin(position * Math.PI); // bell curve shape
    const noise = 0.2 + Math.random() * 0.8;
    bars.push(Math.max(0.05, envelope * noise));
  }
  return bars;
}

/**
 * Create an AudioContext for recording
 */
export async function createRecorder() {
  const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
  const mediaRecorder = new MediaRecorder(stream, {
    mimeType: MediaRecorder.isTypeSupported('audio/webm')
      ? 'audio/webm'
      : 'audio/ogg',
  });

  const chunks = [];

  mediaRecorder.ondataavailable = (e) => {
    if (e.data.size > 0) chunks.push(e.data);
  };

  return {
    mediaRecorder,
    stream,
    getBlob: () => new Blob(chunks, { type: mediaRecorder.mimeType }),
    getChunks: () => chunks,
  };
}

/**
 * Stop all tracks on a media stream
 */
export function stopStream(stream) {
  if (stream) {
    stream.getTracks().forEach((track) => track.stop());
  }
}

/**
 * Get audio duration from a blob
 */
export function getAudioDuration(blob) {
  return new Promise((resolve) => {
    const audio = new Audio();
    audio.addEventListener('loadedmetadata', () => {
      resolve(audio.duration);
    });
    audio.addEventListener('error', () => {
      resolve(0);
    });
    audio.src = URL.createObjectURL(blob);
  });
}

/**
 * Validate audio file
 */
export function validateAudioFile(file) {
  const maxSize = 5 * 1024 * 1024; // 5MB
  const validTypes = [
    'audio/mpeg', 'audio/mp3', 'audio/wav', 'audio/ogg',
    'audio/webm', 'audio/m4a', 'audio/x-m4a', 'audio/mp4',
  ];

  if (file.size > maxSize) {
    return { valid: false, error: 'ไฟล์ใหญ่เกินไป (สูงสุด 5MB)' };
  }

  if (!validTypes.includes(file.type) && !file.name.match(/\.(mp3|wav|ogg|m4a|webm)$/i)) {
    return { valid: false, error: 'รองรับเฉพาะไฟล์เสียง (MP3, WAV, OGG, M4A, WebM)' };
  }

  return { valid: true };
}
