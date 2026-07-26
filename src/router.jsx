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
    ],
  },
]);
