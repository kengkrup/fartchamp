import BattleArena from '../components/battle/BattleArena';

export default function BattlePage() {
  return (
    <div className="battle-page">
      <div className="container">
        <div className="battle-page__header">
          <h1 className="battle-page__title">
            ⚔️ <span className="gradient-text">Battle Arena</span>
          </h1>
          <p className="battle-page__subtitle">
            ฟังเสียงตดทั้งสองฝั่ง แล้วโหวตให้กับเสียงที่คุณชอบ!
          </p>
        </div>

        <BattleArena />
      </div>
    </div>
  );
}
