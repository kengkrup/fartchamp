import { useState, useRef, useCallback, useEffect } from 'react';
import { generateWaveform } from '../../utils/audio';
import { formatDuration } from '../../utils/formatters';
import { incrementSoundPlays } from '../../services/dataService';
import { FiPlay, FiPause } from 'react-icons/fi';

export default function SoundPlayer({ soundId, audioUrl, duration }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [waveform] = useState(() => generateWaveform(40));
  const [clouds, setClouds] = useState([]);
  const audioRef = useRef(null);
  const cloudIdRef = useRef(0);

  const progress = duration > 0 ? currentTime / duration : 0;

  const spawnCloud = useCallback(() => {
    const id = cloudIdRef.current++;
    const variants = ['', 'fart-cloud--left', 'fart-cloud--right'];
    const variant = variants[Math.floor(Math.random() * variants.length)];
    const size = 20 + Math.random() * 40;
    const x = -20 + Math.random() * 40;
    const y = -10 + Math.random() * 20;

    setClouds((prev) => [...prev, { id, variant, size, x, y }]);
    setTimeout(() => {
      setClouds((prev) => prev.filter((c) => c.id !== id));
    }, 1200);
  }, []);

  const togglePlay = useCallback(() => {
    if (!audioUrl) {
      // Demo mode: simulate playback
      if (isPlaying) {
        setIsPlaying(false);
        return;
      }
      setIsPlaying(true);
      if (soundId) incrementSoundPlays(soundId);
      spawnCloud();

      let elapsed = 0;
      const totalDuration = duration || 5;
      const interval = setInterval(() => {
        elapsed += 0.1;
        setCurrentTime(elapsed);
        if (Math.random() < 0.3) spawnCloud();
        if (elapsed >= totalDuration) {
          clearInterval(interval);
          setIsPlaying(false);
          setCurrentTime(0);
        }
      }, 100);
      return;
    }

    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      audio.play();
      setIsPlaying(true);
      if (soundId) incrementSoundPlays(soundId);
      spawnCloud();
    }
  }, [audioUrl, isPlaying, soundId, duration, spawnCloud]);

  useEffect(() => {
    if (!audioRef.current) return;
    const audio = audioRef.current;

    const onTimeUpdate = () => {
      setCurrentTime(audio.currentTime);
      if (Math.random() < 0.2 && isPlaying) spawnCloud();
    };
    const onEnded = () => {
      setIsPlaying(false);
      setCurrentTime(0);
    };

    audio.addEventListener('timeupdate', onTimeUpdate);
    audio.addEventListener('ended', onEnded);

    return () => {
      audio.removeEventListener('timeupdate', onTimeUpdate);
      audio.removeEventListener('ended', onEnded);
    };
  }, [isPlaying, spawnCloud]);

  return (
    <div className="sound-player" style={{ position: 'relative' }}>
      {audioUrl && <audio ref={audioRef} src={audioUrl} preload="metadata" />}

      {/* Fart clouds */}
      {clouds.map((cloud) => (
        <div
          key={cloud.id}
          className={`fart-cloud ${cloud.variant}`}
          style={{
            width: cloud.size,
            height: cloud.size,
            left: `calc(24px + ${cloud.x}px)`,
            top: `calc(50% + ${cloud.y}px)`,
          }}
        />
      ))}

      <button
        className="sound-player__play-btn"
        onClick={togglePlay}
        aria-label={isPlaying ? 'Pause' : 'Play'}
      >
        {isPlaying ? <FiPause /> : <FiPlay style={{ marginLeft: '2px' }} />}
      </button>

      <div className="sound-player__waveform">
        {waveform.map((height, i) => {
          const barProgress = i / waveform.length;
          const isActive = barProgress <= progress && isPlaying;
          return (
            <div
              key={i}
              className={`sound-player__waveform-bar ${isActive ? 'sound-player__waveform-bar--active' : ''}`}
              style={{
                height: `${height * 100}%`,
                opacity: isActive ? 1 : 0.4,
                transition: 'all 0.15s ease',
              }}
            />
          );
        })}
      </div>

      <span className="sound-player__time">
        {formatDuration(currentTime)} / {formatDuration(duration || 0)}
      </span>
    </div>
  );
}
