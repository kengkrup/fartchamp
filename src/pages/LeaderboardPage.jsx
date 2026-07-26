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
        <div className="page-header">
          <h1 className="page-header__title">🏆 Leaderboard</h1>
          <p className="page-header__subtitle">
            Those with the most powerful farts in the universe
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
                  <div className="podium-card__author">
                    by {item.userName}
                  </div>
                  <div className="podium-card__score-wrap">
                    <div className="podium-card__label">Score</div>
                    <div className="podium-card__score">{formatNumber(item.score)}</div>
                  </div>
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
