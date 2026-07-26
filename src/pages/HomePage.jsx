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
            The greatest fart sound competition platform in the universe!<br />
            Upload, Battle 1v1, Vote, and become the Champion!
          </p>
          <div className="hero__actions">
            <Link to="/upload" className="btn btn--primary btn--lg">
              🎙️ Upload a Fart
            </Link>
            <Link to="/battle" className="btn btn--secondary btn--lg">
              ⚔️ Enter Battle Arena
            </Link>
          </div>

          <div className="hero__stats">
            <div className="hero__stat-card">
              <div className="hero__stat-value">{formatNumber(stats.totalSounds)}</div>
              <div className="hero__stat-label">Farts</div>
            </div>
            <div className="hero__stat-card">
              <div className="hero__stat-value">{formatNumber(stats.totalPlays)}</div>
              <div className="hero__stat-label">Plays</div>
            </div>
            <div className="hero__stat-card">
              <div className="hero__stat-value">{formatNumber(stats.totalLikes)}</div>
              <div className="hero__stat-label">Likes</div>
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
                <h2 className="section__title">🔥 Top Farts of the Week</h2>
                <p className="section__subtitle">Most popular fart sounds this week</p>
              </div>
              <Link to="/leaderboard?filter=weekly" className="btn btn--text">
                View All →
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
              <h2 className="section__title">🆕 Latest Farts</h2>
              <p className="section__subtitle">Newest fart sounds from the community</p>
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
          <div className="cta__content">
            <h2 className="cta__title">
              <span className="gradient-text">Ready to become a Champion?</span>
            </h2>
            <p className="cta__description">
              Upload your best fart sound and prove your skills in the Battle Arena!
            </p>
            <Link to="/upload" className="btn btn--primary btn--lg">
              🚀 Get Started!
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
