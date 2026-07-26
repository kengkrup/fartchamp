import { useMemo } from 'react';
import Leaderboard from '../components/leaderboard/Leaderboard';
import { getLeaderboard } from '../services/dataService';
import { formatNumber, getInitials } from '../utils/formatters';

export default function LeaderboardPage() {
  const topThree = useMemo(() => getLeaderboard('all-time').slice(0, 3), []);

  // Reorder for podium display: 2nd, 1st, 3rd
  const podiumOrder = topThree.length >= 3
    ? [topThree[1], topThree[0], topThree[2]]
    : topThree;

  const getPodiumRank = (index) => {
    if (topThree.length < 3) return index + 1;
    return [2, 1, 3][index];
  };

  const crowns = { 1: '👑', 2: '🥈', 3: '🥉' };

  return (
    <div className="leaderboard-page">
      <div className="container">
        <div className="leaderboard-page__header">
          <h1 className="leaderboard-page__title">
            🏆 <span className="gradient-text">Hall of Champions</span>
          </h1>
          <p style={{ color: 'var(--color-text-secondary)' }}>
            ผู้ที่มีเสียงตดทรงพลังที่สุดในจักรวาล
          </p>
        </div>

        {/* Podium */}
        {topThree.length >= 3 && (
          <div className="leaderboard-page__podium">
            {podiumOrder.map((item, i) => {
              const rank = getPodiumRank(i);
              return (
                <div key={item.id} className={`podium-card podium-card--${rank} glass-card`}>
                  <div className={`podium-card__crown ${rank === 1 ? 'crown-shimmer' : ''}`}>
                    {crowns[rank]}
                  </div>
                  <div className="podium-card__avatar">
                    {getInitials(item.userName)}
                  </div>
                  <h3 className="podium-card__name">{item.title}</h3>
                  <p style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)', marginBottom: 'var(--space-sm)' }}>
                    โดย {item.userName}
                  </p>
                  <div className="podium-card__score">{formatNumber(item.score)}</div>
                  <div className="podium-card__label">คะแนน</div>
                </div>
              );
            })}
          </div>
        )}

        {/* Full Leaderboard */}
        <Leaderboard />
      </div>
    </div>
  );
}
