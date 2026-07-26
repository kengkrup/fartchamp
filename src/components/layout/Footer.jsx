import { Link } from 'react-router-dom';
import { APP_NAME, APP_DESCRIPTION } from '../../utils/constants';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__inner">
          <div>
            <div className="footer__brand-name">
              💨 <span className="gradient-text">{APP_NAME}</span>
            </div>
            <p className="footer__brand-desc">{APP_DESCRIPTION}</p>
          </div>

          <div>
            <h4 className="footer__title">Navigation</h4>
            <Link to="/" className="footer__link">หน้าแรก</Link>
            <Link to="/battle" className="footer__link">Battle Arena</Link>
            <Link to="/upload" className="footer__link">อัปโหลดเสียง</Link>
            <Link to="/leaderboard" className="footer__link">Leaderboard</Link>
          </div>

          <div>
            <h4 className="footer__title">Community</h4>
            <a href="https://github.com" target="_blank" rel="noreferrer" className="footer__link">GitHub</a>
            <a href="#" className="footer__link">Discord</a>
            <a href="#" className="footer__link">Twitter</a>
          </div>
        </div>

        <div className="footer__bottom">
          <p>© {new Date().getFullYear()} {APP_NAME}. สร้างด้วย 💨 และ ❤️ | No actual farts were harmed in the making of this website.</p>
        </div>
      </div>
    </footer>
  );
}
