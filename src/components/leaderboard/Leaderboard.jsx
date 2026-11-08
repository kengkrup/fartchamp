import { useState, useMemo } from 'react';
import { getLeaderboard } from '../../services/dataService';
import { formatNumber, getInitials, getRank } from '../../utils/formatters';

export default function Leaderboard() {
  const [filter, setFilter] = useState('all-time');
  const items = useMemo(() => getLeaderboard(filter), [filter]);

  const filters = [
    { id: 'all-time', label: 'All-time' },
    { id: 'weekly', label: 'Weekly' },
    { id: 'monthly', label: 'Monthly' },
  ];

  const getRankClass = (index) => {
    if (index === 0) return 'leaderboard__item--gold';
    if (index === 1) return 'leaderboard__item--silver';
    if (index === 2) return 'leaderboard__item--bronze';
    return '';
  };

  const getRankNumClass = (index) => {
    if (index <= 2) return `leaderboard__rank--${index + 1}`;
    return '';
  };

  return (
    <div className="leaderboard">
      <div className="leaderboard__header">
        <h2 className="section__title gradient-text">Rankings</h2>
        <div className="leaderboard__filters">
          {filters.map((f) => (
            <button
              key={f.id}
              className={`leaderboard__filter ${filter === f.id ? 'leaderboard__filter--active' : ''}`}
              onClick={() => setFilter(f.id)}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      <div className="stagger-children">
        {items.length === 0 ? (
          <div className="empty-state">
            <h3 className="empty-state__title">No data yet</h3>
            <p className="empty-state__text">Upload a sound to appear on the leaderboard.</p>
          </div>
        ) : (
          items.slice(0, 20).map((item, index) => {
            const rank = getRank(item.score);
            return (
              <div
                key={item.id}
                className={`leaderboard__item ${getRankClass(index)}`}
              >
                <div className={`leaderboard__rank ${getRankNumClass(index)}`}>
                  {index + 1}
                </div>

                <div className="sound-card__avatar" style={{ width: 40, height: 40, fontSize: 'var(--text-base)' }}>
                  {getInitials(item.userName)}
                </div>

                <div className="leaderboard__info">
                  <div className="leaderboard__name">{item.title}</div>
                  <div className="leaderboard__user">
                    {item.userName} • {rank.title}
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-md)' }}>
                  <div style={{ textAlign: 'right' }}>
                    <div className="leaderboard__score">{formatNumber(item.score)}</div>
                    <div style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)' }}>Score</div>
                  </div>
                  <div style={{ display: 'flex', gap: 'var(--space-sm)', fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)' }}>
                    <span>{item.likes} likes</span>
                    <span>{item.wins} wins</span>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
