// App-wide constants

export const CATEGORIES = [
  { id: 'classic', label: 'Classic 💨', emoji: '💨' },
  { id: 'thunder', label: 'Thunder ⚡', emoji: '⚡' },
  { id: 'silent-deadly', label: 'Silent but Deadly 🤫', emoji: '🤫' },
  { id: 'musical', label: 'Musical 🎵', emoji: '🎵' },
  { id: 'machine-gun', label: 'Machine Gun 🔫', emoji: '🔫' },
  { id: 'squeaker', label: 'Squeaker 🐭', emoji: '🐭' },
  { id: 'wet', label: 'Wet 💦', emoji: '💦' },
  { id: 'epic', label: 'Epic 🏆', emoji: '🏆' },
];

export const RANKS = [
  { min: 0, title: 'Beginner Blaster', emoji: '💨' },
  { min: 10, title: 'Gas Cadet', emoji: '🌀' },
  { min: 50, title: 'Wind Warrior', emoji: '🌪️' },
  { min: 100, title: 'Thunder Cheeks', emoji: '⚡' },
  { min: 250, title: 'Gas Giant', emoji: '🪐' },
  { min: 500, title: 'Fart Lord', emoji: '👑' },
  { min: 1000, title: 'The Supreme Cheek Clapper', emoji: '🏆' },
];

export const BATTLE_DURATION_MS = 24 * 60 * 60 * 1000; // 24 hours

export const MAX_AUDIO_DURATION_SEC = 30;
export const MAX_AUDIO_SIZE_MB = 5;
export const ACCEPTED_AUDIO_TYPES = ['.mp3', '.wav', '.ogg', '.m4a', '.webm'];

export const LEADERBOARD_FILTERS = ['all-time', 'weekly', 'monthly'];

export const APP_NAME = 'FartChamp';
export const APP_TAGLINE = 'Unleash the Power... Become a Legend 💨';
export const APP_DESCRIPTION = 'The greatest fart sound competition platform in the universe';
