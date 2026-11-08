import { useState, useMemo, useCallback } from 'react';
import { getSoundById, getActiveBattles, createRandomBattle, voteBattle, hasUserVotedBattle, finalizeExpiredBattles } from '../../services/dataService';
import SoundPlayer from '../sound/SoundPlayer';
import { formatNumber, getInitials } from '../../utils/formatters';
import { FiRefreshCw } from 'react-icons/fi';

export default function BattleArena() {
  const [battleIndex, setBattleIndex] = useState(0);
  const [voted, setVoted] = useState({});

  const battles = useMemo(() => {
    finalizeExpiredBattles();
    let activeBattles = getActiveBattles();
    if (activeBattles.length === 0) {
      // Create some battles if none exist
      for (let i = 0; i < 3; i++) {
        const b = createRandomBattle();
        if (b) activeBattles.push(b);
      }
    }
    return activeBattles;
  }, []);

  const currentBattle = battles[battleIndex % battles.length] || null;

  const sound1 = currentBattle ? getSoundById(currentBattle.sound1Id) : null;
  const sound2 = currentBattle ? getSoundById(currentBattle.sound2Id) : null;

  const handleVote = useCallback((soundId) => {
    if (!currentBattle) return;
    if (voted[currentBattle.id] || hasUserVotedBattle(currentBattle.id)) return;

    voteBattle(currentBattle.id, soundId);
    setVoted((prev) => ({ ...prev, [currentBattle.id]: soundId }));
  }, [currentBattle, voted]);

  const nextBattle = useCallback(() => {
    setBattleIndex((prev) => prev + 1);
  }, []);

  const userVote = currentBattle ? (voted[currentBattle.id] || null) : null;
  const alreadyVoted = currentBattle ? (hasUserVotedBattle(currentBattle.id) || !!userVote) : false;

  if (!currentBattle || !sound1 || !sound2) {
    return (
      <div className="empty-state">
        <h3 className="empty-state__title">No Battles Available</h3>
        <p className="empty-state__text">At least 2 sounds are required to start a battle.</p>
      </div>
    );
  }

  // Re-read battle to get updated votes
  const updatedBattle = currentBattle;
  const s1Votes = updatedBattle.sound1Votes + (userVote === sound1.id ? 1 : 0);
  const s2Votes = updatedBattle.sound2Votes + (userVote === sound2.id ? 1 : 0);
  const totalVotes = s1Votes + s2Votes;

  return (
    <div>
      <div className="battle-arena">
        {/* Contestant 1 */}
        <div className={`glass-card battle-card slide-in-left ${userVote === sound1.id ? 'battle-card--winner' : ''}`}>
          <div className="battle-card__rank">
            <span className="badge badge--purple">Challenger #1</span>
          </div>
          <div className="sound-card__avatar" style={{ width: 56, height: 56, fontSize: 'var(--text-xl)', margin: '0 auto var(--space-md)' }}>
            {getInitials(sound1.userName)}
          </div>
          <h3 className="battle-card__name">{sound1.title}</h3>
          <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-muted)', marginBottom: 'var(--space-md)' }}>
            by {sound1.userName}
          </p>

          <SoundPlayer soundId={sound1.id} audioUrl={sound1.audioUrl} duration={sound1.audioDuration} />

          {alreadyVoted && totalVotes > 0 && (
            <div className="battle-card__votes gradient-text">
              {Math.round((s1Votes / totalVotes) * 100)}%
            </div>
          )}

          <button
            className={`btn ${alreadyVoted ? 'btn--secondary' : 'btn--primary'} battle-card__vote-btn`}
            onClick={() => handleVote(sound1.id)}
            disabled={alreadyVoted}
            style={{ marginTop: 'var(--space-md)' }}
          >
            {alreadyVoted ? 'Voted' : 'Vote for this sound'}
          </button>
        </div>

        {/* VS */}
        <div className="battle-arena__vs">
          <div className="battle-arena__vs-line" />
          <span className="battle-arena__vs-text">VS</span>
          <div className="battle-arena__vs-line" />
        </div>

        {/* Contestant 2 */}
        <div className={`glass-card battle-card slide-in-right ${userVote === sound2.id ? 'battle-card--winner' : ''}`}>
          <div className="battle-card__rank">
            <span className="badge badge--yellow">Challenger #2</span>
          </div>
          <div className="sound-card__avatar" style={{ width: 56, height: 56, fontSize: 'var(--text-xl)', margin: '0 auto var(--space-md)' }}>
            {getInitials(sound2.userName)}
          </div>
          <h3 className="battle-card__name">{sound2.title}</h3>
          <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-muted)', marginBottom: 'var(--space-md)' }}>
            by {sound2.userName}
          </p>

          <SoundPlayer soundId={sound2.id} audioUrl={sound2.audioUrl} duration={sound2.audioDuration} />

          {alreadyVoted && totalVotes > 0 && (
            <div className="battle-card__votes gradient-text">
              {Math.round((s2Votes / totalVotes) * 100)}%
            </div>
          )}

          <button
            className={`btn ${alreadyVoted ? 'btn--secondary' : 'btn--primary'} battle-card__vote-btn`}
            onClick={() => handleVote(sound2.id)}
            disabled={alreadyVoted}
            style={{ marginTop: 'var(--space-md)' }}
          >
            {alreadyVoted ? 'Voted' : 'Vote for this sound'}
          </button>
        </div>
      </div>

      {/* Next Battle */}
      {battles.length > 1 && (
        <div className="battle-page__next">
          <button className="btn btn--secondary" onClick={nextBattle}>
            <FiRefreshCw /> Next Battle
          </button>
        </div>
      )}
    </div>
  );
}
