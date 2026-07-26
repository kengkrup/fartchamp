import { useState, useCallback } from 'react';
import { getComments, addComment } from '../../services/dataService';
import { timeAgo, getInitials } from '../../utils/formatters';
import { FiSend } from 'react-icons/fi';

export default function CommentSection({ soundId }) {
  const [comments, setComments] = useState(() => getComments(soundId));
  const [text, setText] = useState('');

  const handleSubmit = useCallback((e) => {
    e.preventDefault();
    if (!text.trim()) return;

    const comment = addComment(soundId, text.trim());
    setComments((prev) => [comment, ...prev]);
    setText('');
  }, [soundId, text]);

  return (
    <div className="comment-section">
      <h4 className="comment-section__title">
        💬 Comments ({comments.length})
      </h4>

      <form className="comment-section__form" onSubmit={handleSubmit}>
        <input
          type="text"
          className="input comment-section__input"
          placeholder="Write a comment..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          maxLength={200}
        />
        <button type="submit" className="btn btn--primary btn--icon" disabled={!text.trim()}>
          <FiSend />
        </button>
      </form>

      <div className="stagger-children">
        {comments.length === 0 ? (
          <p style={{ textAlign: 'center', color: 'var(--color-text-muted)', padding: 'var(--space-lg) 0', fontSize: 'var(--text-sm)' }}>
            No comments yet. Be the first! 💨
          </p>
        ) : (
          comments.map((comment) => (
            <div key={comment.id} className="comment">
              <div className="comment__avatar">
                {getInitials(comment.userName)}
              </div>
              <div className="comment__body">
                <div className="comment__header">
                  <span className="comment__name">{comment.userName}</span>
                  <span className="comment__time">{timeAgo(comment.createdAt)}</span>
                </div>
                <p className="comment__text">{comment.text}</p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
