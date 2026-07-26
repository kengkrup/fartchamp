import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import SoundCard from '../components/sound/SoundCard';
import { getAllSounds, getLeaderboard, seedMockData } from '../services/dataService';
import { formatNumber } from '../utils/formatters';
import { APP_NAME, APP_TAGLINE } from '../utils/constants';

export default function HomePage() {
  const [sounds, setSounds] = useState([]);
  const [topSounds, setTopSounds] = useState([]);

  useEffect(() => {
    seedMockData();
    setSounds(getAllSounds().slice(0, 6));
    setTopSounds(getLeaderboard('weekly').slice(0, 3));
  }, []);

  const stats = {
    totalSounds: getAllSounds().length,
    totalPlays: getAllSounds().reduce((sum, s) => sum + s.plays, 0),
    totalLikes: getAllSounds().reduce((sum, s) => sum + s.likes, 0),
  };

  return (
    <>
      {/* Hero */}
      <section className="hero">
        <div className="hero__bg" />
        <div className="container hero__content">
          <div className="hero__emoji float">💨</div>
          <h1 className="hero__title">
            <span className="gradient-text">{APP_NAME}</span>
            <br />
            {APP_TAGLINE}
          </h1>
          <p className="hero__subtitle">
            แพลตฟอร์มแข่งขันเสียงตดที่ยิ่งใหญ่ที่สุดในจักรวาล!
            อัปโหลดเสียง, Battle 1v1, โหวต และพิชิตตำแหน่งแชมป์!
          </p>
          <div className="hero__cta">
            <Link to="/upload" className="btn btn--primary btn--lg">
              🎙️ อัปโหลดเสียงตด
            </Link>
            <Link to="/battle" className="btn btn--secondary btn--lg">
              ⚔️ เข้า Battle Arena
            </Link>
          </div>

          <div className="hero__stats">
            <div className="hero__stat">
              <div className="hero__stat-value neon-glow">{formatNumber(stats.totalSounds)}</div>
              <div className="hero__stat-label">เสียงตด</div>
            </div>
            <div className="hero__stat">
              <div className="hero__stat-value neon-glow">{formatNumber(stats.totalPlays)}</div>
              <div className="hero__stat-label">ครั้งที่ฟัง</div>
            </div>
            <div className="hero__stat">
              <div className="hero__stat-value neon-glow">{formatNumber(stats.totalLikes)}</div>
              <div className="hero__stat-label">ถูกใจ</div>
            </div>
          </div>
        </div>
      </section>

      {/* Top Sounds This Week */}
      {topSounds.length > 0 && (
        <section className="section" style={{ background: 'var(--color-bg-secondary)' }}>
          <div className="container">
            <div className="section__header">
              <div>
                <h2 className="section__title">🔥 เสียงตดยอดฮิตประจำสัปดาห์</h2>
                <p className="section__subtitle">เสียงที่ได้รับความนิยมสูงสุดในสัปดาห์นี้</p>
              </div>
              <Link to="/leaderboard" className="btn btn--ghost">
                ดูทั้งหมด →
              </Link>
            </div>
            <div className="sound-grid">
              {topSounds.map((sound) => (
                <SoundCard key={sound.id} sound={sound} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Latest Sounds */}
      <section className="section">
        <div className="container">
          <div className="section__header">
            <div>
              <h2 className="section__title">🆕 เสียงตดล่าสุด</h2>
              <p className="section__subtitle">เสียงตดใหม่ล่าสุดจากคอมมูนิตี้</p>
            </div>
          </div>
          <div className="sound-grid">
            {sounds.map((sound) => (
              <SoundCard key={sound.id} sound={sound} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section" style={{ background: 'var(--color-bg-secondary)' }}>
        <div className="container" style={{ textAlign: 'center', maxWidth: 600 }}>
          <h2 className="section__title" style={{ marginBottom: 'var(--space-md)' }}>
            <span className="gradient-text">พร้อมจะเป็นแชมป์หรือยัง?</span>
          </h2>
          <p style={{ color: 'var(--color-text-secondary)', marginBottom: 'var(--space-xl)' }}>
            อัปโหลดเสียงตดที่ดีที่สุดของคุณ แล้วมาพิสูจน์ฝีมือในสนาม Battle!
          </p>
          <Link to="/upload" className="btn btn--primary btn--lg">
            🚀 เริ่มเลย!
          </Link>
        </div>
      </section>
    </>
  );
}
