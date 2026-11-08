import { useState } from 'react';
import { Link } from 'react-router-dom';
import SoundPlayer from './SoundPlayer';
import LikeButton from '../social/LikeButton';
import CommentSection from '../social/CommentSection';
import { CATEGORIES } from '../../utils/constants';
import { formatNumber, timeAgo, getInitials } from '../../utils/formatters';
import { FiMessageCircle, FiHeadphones, FiShare2 } from 'react-icons/fi';

export default function SoundCard({ sound, showComments = false }) {
  const [commentsOpen, setCommentsOpen] = useState(false);
  const category = CATEGORIES.find((c) => c.id === sound.category);

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: sound.title,
        text: `Listen to "${sound.title}" on FartChamp`,
        url: window.location.origin,
      });
    } else {
      navigator.clipboard.writeText(window.location.origin);
    }
  };

  return (
    <div className="glass-card sound-card slide-in-up">
      <div className="sound-card__header">
        <div className="sound-card__avatar">
          {getInitials(sound.userName)}
        </div>
        <div className="sound-card__info">
          <h3 className="sound-card__title">{sound.title}</h3>
          <span className="sound-card__user">
            by {sound.userName} • {timeAgo(sound.createdAt)}
          </span>
        </div>
        {category && (
          <span className="badge badge--green sound-card__category">
            {category.label}
          </span>
        )}
      </div>

      {sound.description && (
        <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-secondary)', marginBottom: 'var(--space-md)' }}>
          {sound.description}
        </p>
      )}

      <div className="sound-card__player">
        <SoundPlayer
          soundId={sound.id}
          audioUrl={sound.audioUrl}
          duration={sound.audioDuration}
        />
      </div>

      <div className="sound-card__actions">
        <LikeButton soundId={sound.id} initialLikes={sound.likes} />

        <button
          className="like-btn"
          onClick={() => setCommentsOpen(!commentsOpen)}
        >
          <FiMessageCircle className="like-btn__icon" />
          <span>Comments</span>
        </button>

        <div className="sound-card__stat" style={{ marginLeft: 'auto' }}>
          <FiHeadphones />
          <span>{formatNumber(sound.plays)}</span>
        </div>

        <button className="like-btn" onClick={handleShare}>
          <FiShare2 className="like-btn__icon" />
        </button>
      </div>

      {(commentsOpen || showComments) && (
        <CommentSection soundId={sound.id} />
      )}
    </div>
  );
}
