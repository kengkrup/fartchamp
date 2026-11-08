import { createBrowserRouter } from 'react-router-dom';
import Layout from './components/layout/Layout';
import HomePage from './pages/HomePage';
import BattlePage from './pages/BattlePage';
import UploadPage from './pages/UploadPage';
import LeaderboardPage from './pages/LeaderboardPage';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'battle', element: <BattlePage /> },
      { path: 'upload', element: <UploadPage /> },
      { path: 'leaderboard', element: <LeaderboardPage /> },
      { path: '*', element: (
        <div className="empty-state" style={{ padding: '4rem 0' }}>
          <div className="empty-state__icon">💨</div>
          <h3 className="empty-state__title">404 — Lost in the Wind</h3>
          <p className="empty-state__text">This page does not exist.</p>
        </div>
      ) },
    ],
  },
]);
