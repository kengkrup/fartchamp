import { useState, useCallback } from 'react';
import { hasUserLiked, toggleLike } from '../../services/dataService';
import { formatNumber } from '../../utils/formatters';

export default function LikeButton({ soundId, initialLikes = 0 }) {
  const [liked, setLiked] = useState(() => hasUserLiked(soundId));
  const [likes, setLikes] = useState(initialLikes);
  const [animating, setAnimating] = useState(false);

  const handleToggle = useCallback(() => {
    const nowLiked = toggleLike(soundId);
    setLiked(nowLiked);
    setLikes((prev) => (nowLiked ? prev + 1 : prev - 1));

    if (nowLiked) {
      setAnimating(true);
      setTimeout(() => setAnimating(false), 600);
    }
  }, [soundId]);

  return (
    <button
      className={`like-btn ${liked ? 'like-btn--active' : ''}`}
      onClick={handleToggle}
      style={{ position: 'relative' }}
    >
      {animating && <div className="vote-burst" style={{ left: '50%', top: '50%', transform: 'translate(-50%, -50%)' }} />}
      <span className="like-btn__icon" style={{ fontSize: '1.1em' }}>
        {liked ? '💨' : '🌬️'}
      </span>
      <span className={animating ? 'count-up' : ''}>
        {formatNumber(likes)}
      </span>
    </button>
  );
}
