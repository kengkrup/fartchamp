import BattleArena from '../components/battle/BattleArena';

export default function BattlePage() {
  return (
    <div className="battle-page">
      <div className="container">
        <div className="battle-page__header">
          <h1 className="page-header__title">Battle Arena</h1>
          <p className="page-header__subtitle">
            Listen to both sounds and vote for your favorite.
          </p>
        </div>

        <BattleArena />
      </div>
    </div>
  );
}
