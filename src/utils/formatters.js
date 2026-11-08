// Formatting utility functions
import { RANKS } from './constants';

/**
 * Format a number with compact notation (1.2K, 3.4M)
 */
export function formatNumber(num) {
  if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
  if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
  return num.toString();
}

/**
 * Format seconds to mm:ss
 */
export function formatDuration(seconds) {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, '0')}`;
}

/**
 * Format relative time (e.g. "2 hours ago", "3 days ago")
 */
export function timeAgo(date) {
  const now = new Date();
  const d = new Date(date);
  const diffMs = now - d;
  const diffSec = Math.floor(diffMs / 1000);
  const diffMin = Math.floor(diffSec / 60);
  const diffHour = Math.floor(diffMin / 60);
  const diffDay = Math.floor(diffHour / 24);
  const diffWeek = Math.floor(diffDay / 7);
  const diffMonth = Math.floor(diffDay / 30);

  if (diffSec < 60) return 'just now';
  if (diffMin < 60) return `${diffMin}m ago`;
  if (diffHour < 24) return `${diffHour}h ago`;
  if (diffDay < 7) return `${diffDay}d ago`;
  if (diffWeek < 4) return `${diffWeek}w ago`;
  return `${diffMonth}mo ago`;
}

/**
 * Get rank info from total likes/wins
 */
export function getRank(totalScore) {
  let rank = RANKS[0];
  for (const r of RANKS) {
    if (totalScore >= r.min) rank = r;
  }
  return rank;
}

/**
 * Generate a random display name for anonymous users
 */
export function generateRandomName() {
  const adjectives = [
    'Thunderous', 'Silent', 'Epic', 'Mighty', 'Sneaky',
    'Explosive', 'Legendary', 'Turbulent', 'Atomic', 'Cosmic',
    'Groovy', 'Spicy', 'Nuclear', 'Volcanic', 'Supersonic',
  ];
  const nouns = [
    'Blaster', 'Ripper', 'Squeaker', 'Rumbler', 'Topper',
    'Boomer', 'Popper', 'Trumpeter', 'Whistler', 'Cannoneer',
    'Destroyer', 'Maestro', 'Phantom', 'Ninja', 'Champion',
  ];
  const adj = adjectives[Math.floor(Math.random() * adjectives.length)];
  const noun = nouns[Math.floor(Math.random() * nouns.length)];
  const num = Math.floor(Math.random() * 99) + 1;
  return `${adj}${noun}${num}`;
}

/**
 * Get initials from a display name
 */
export function getInitials(name) {
  if (!name) return '?';
  return name.charAt(0).toUpperCase();
}
