// App-wide constants

export const CATEGORIES = [
  { id: 'classic', label: 'Classic' },
  { id: 'thunder', label: 'Thunder' },
  { id: 'silent-deadly', label: 'Silent but Deadly' },
  { id: 'musical', label: 'Musical' },
  { id: 'machine-gun', label: 'Machine Gun' },
  { id: 'squeaker', label: 'Squeaker' },
  { id: 'wet', label: 'Wet' },
  { id: 'epic', label: 'Epic' },
];

export const RANKS = [
  { min: 0, title: 'Beginner Blaster' },
  { min: 10, title: 'Gas Cadet' },
  { min: 50, title: 'Wind Warrior' },
  { min: 100, title: 'Thunder Cheeks' },
  { min: 250, title: 'Gas Giant' },
  { min: 500, title: 'Fart Lord' },
  { min: 1000, title: 'The Supreme Cheek Clapper' },
];

export const BATTLE_DURATION_MS = 24 * 60 * 60 * 1000; // 24 hours

export const MAX_AUDIO_DURATION_SEC = 30;
export const MAX_AUDIO_SIZE_MB = 5;
export const ACCEPTED_AUDIO_TYPES = ['.mp3', '.wav', '.ogg', '.m4a', '.webm'];

export const LEADERBOARD_FILTERS = ['all-time', 'weekly', 'monthly'];

export const APP_NAME = 'FartChamp';
export const APP_TAGLINE = 'Upload, battle, and vote for the best sounds';
export const APP_DESCRIPTION = 'A platform for uploading and battling short sound clips';
