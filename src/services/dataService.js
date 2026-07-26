// LocalStorage-based data service
// Replace with Firebase when ready for production

import { v4 as uuidv4 } from 'uuid';
import { generateRandomName } from '../utils/formatters';

const STORAGE_KEYS = {
  sounds: 'fartchamp_sounds',
  battles: 'fartchamp_battles',
  users: 'fartchamp_users',
  currentUser: 'fartchamp_current_user',
  votes: 'fartchamp_votes',
  comments: 'fartchamp_comments',
};

// --- Generic CRUD ---

function getAll(key) {
  try {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

function saveAll(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}

function getById(key, id) {
  const all = getAll(key);
  return all.find((item) => item.id === id) || null;
}

function create(key, item) {
  const all = getAll(key);
  all.push(item);
  saveAll(key, all);
  return item;
}

function update(key, id, updates) {
  const all = getAll(key);
  const index = all.findIndex((item) => item.id === id);
  if (index !== -1) {
    all[index] = { ...all[index], ...updates };
    saveAll(key, all);
    return all[index];
  }
  return null;
}

function remove(key, id) {
  const all = getAll(key);
  const filtered = all.filter((item) => item.id !== id);
  saveAll(key, filtered);
}

// --- User Service ---

export function getCurrentUser() {
  const stored = localStorage.getItem(STORAGE_KEYS.currentUser);
  if (stored) return JSON.parse(stored);

  // Create anonymous user
  const user = {
    id: uuidv4(),
    displayName: generateRandomName(),
    avatar: null,
    totalLikes: 0,
    totalWins: 0,
    createdAt: new Date().toISOString(),
  };
  localStorage.setItem(STORAGE_KEYS.currentUser, JSON.stringify(user));
  return user;
}

export function updateCurrentUser(updates) {
  const user = getCurrentUser();
  const updated = { ...user, ...updates };
  localStorage.setItem(STORAGE_KEYS.currentUser, JSON.stringify(updated));
  return updated;
}

// --- Sound Service ---

export function getAllSounds() {
  return getAll(STORAGE_KEYS.sounds).sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  );
}

export function getSoundById(id) {
  return getById(STORAGE_KEYS.sounds, id);
}

export function createSound({ title, description, category, audioUrl, audioDuration }) {
  const user = getCurrentUser();
  const sound = {
    id: uuidv4(),
    title,
    description: description || '',
    category,
    audioUrl,
    audioDuration: audioDuration || 0,
    userId: user.id,
    userName: user.displayName,
    likes: 0,
    plays: 0,
    wins: 0,
    losses: 0,
    createdAt: new Date().toISOString(),
  };
  return create(STORAGE_KEYS.sounds, sound);
}

export function incrementSoundPlays(id) {
  const sound = getSoundById(id);
  if (sound) {
    update(STORAGE_KEYS.sounds, id, { plays: sound.plays + 1 });
  }
}

// --- Vote / Like Service ---

export function getUserVotes() {
  return getAll(STORAGE_KEYS.votes);
}

export function hasUserLiked(soundId) {
  const user = getCurrentUser();
  const votes = getUserVotes();
  return votes.some((v) => v.soundId === soundId && v.userId === user.id && v.type === 'like');
}

export function toggleLike(soundId) {
  const user = getCurrentUser();
  const votes = getAll(STORAGE_KEYS.votes);
  const existingIndex = votes.findIndex(
    (v) => v.soundId === soundId && v.userId === user.id && v.type === 'like'
  );

  const sound = getSoundById(soundId);
  if (!sound) return false;

  if (existingIndex !== -1) {
    // Unlike
    votes.splice(existingIndex, 1);
    saveAll(STORAGE_KEYS.votes, votes);
    update(STORAGE_KEYS.sounds, soundId, { likes: Math.max(0, sound.likes - 1) });
    return false;
  } else {
    // Like
    votes.push({
      id: uuidv4(),
      soundId,
      userId: user.id,
      type: 'like',
      createdAt: new Date().toISOString(),
    });
    saveAll(STORAGE_KEYS.votes, votes);
    update(STORAGE_KEYS.sounds, soundId, { likes: sound.likes + 1 });
    return true;
  }
}

export function hasUserVotedBattle(battleId) {
  const user = getCurrentUser();
  const votes = getUserVotes();
  return votes.some((v) => v.battleId === battleId && v.userId === user.id && v.type === 'battle');
}

export function voteBattle(battleId, soundId) {
  const user = getCurrentUser();
  if (hasUserVotedBattle(battleId)) return false;

  const votes = getAll(STORAGE_KEYS.votes);
  votes.push({
    id: uuidv4(),
    battleId,
    soundId,
    userId: user.id,
    type: 'battle',
    createdAt: new Date().toISOString(),
  });
  saveAll(STORAGE_KEYS.votes, votes);

  // Update battle votes
  const battle = getBattleById(battleId);
  if (battle) {
    if (soundId === battle.sound1Id) {
      update(STORAGE_KEYS.battles, battleId, { sound1Votes: battle.sound1Votes + 1 });
    } else if (soundId === battle.sound2Id) {
      update(STORAGE_KEYS.battles, battleId, { sound2Votes: battle.sound2Votes + 1 });
    }
  }

  return true;
}

// --- Comment Service ---

export function getComments(soundId) {
  return getAll(STORAGE_KEYS.comments)
    .filter((c) => c.soundId === soundId)
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
}

export function addComment(soundId, text) {
  const user = getCurrentUser();
  const comment = {
    id: uuidv4(),
    soundId,
    text,
    userId: user.id,
    userName: user.displayName,
    likes: 0,
    createdAt: new Date().toISOString(),
  };
  return create(STORAGE_KEYS.comments, comment);
}

export function deleteComment(commentId) {
  remove(STORAGE_KEYS.comments, commentId);
}

// --- Battle Service ---

export function getAllBattles() {
  return getAll(STORAGE_KEYS.battles).sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  );
}

export function getActiveBattles() {
  return getAllBattles().filter((b) => b.status === 'active');
}

export function getBattleById(id) {
  return getById(STORAGE_KEYS.battles, id);
}

export function createBattle(sound1Id, sound2Id) {
  const battle = {
    id: uuidv4(),
    sound1Id,
    sound2Id,
    sound1Votes: 0,
    sound2Votes: 0,
    winnerId: null,
    status: 'active',
    createdAt: new Date().toISOString(),
    endsAt: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
  };
  return create(STORAGE_KEYS.battles, battle);
}

export function createRandomBattle() {
  const sounds = getAllSounds();
  if (sounds.length < 2) return null;

  // Pick two random different sounds
  const shuffled = [...sounds].sort(() => Math.random() - 0.5);
  return createBattle(shuffled[0].id, shuffled[1].id);
}

export function completeBattle(battleId) {
  const battle = getBattleById(battleId);
  if (!battle) return null;

  let winnerId = null;
  if (battle.sound1Votes > battle.sound2Votes) winnerId = battle.sound1Id;
  else if (battle.sound2Votes > battle.sound1Votes) winnerId = battle.sound2Id;

  if (winnerId) {
    const winner = getSoundById(winnerId);
    const loserId = winnerId === battle.sound1Id ? battle.sound2Id : battle.sound1Id;
    const loser = getSoundById(loserId);
    if (winner) update(STORAGE_KEYS.sounds, winnerId, { wins: winner.wins + 1 });
    if (loser) update(STORAGE_KEYS.sounds, loserId, { losses: loser.losses + 1 });
  }

  return update(STORAGE_KEYS.battles, battleId, { status: 'completed', winnerId });
}

// --- Leaderboard ---

export function getLeaderboard(filter = 'all-time') {
  const sounds = getAllSounds();

  let filtered = sounds;
  if (filter === 'weekly') {
    const weekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
    filtered = sounds.filter((s) => new Date(s.createdAt) > weekAgo);
  } else if (filter === 'monthly') {
    const monthAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
    filtered = sounds.filter((s) => new Date(s.createdAt) > monthAgo);
  }

  // Score = likes * 2 + wins * 5 + plays
  return filtered
    .map((s) => ({
      ...s,
      score: s.likes * 2 + s.wins * 5 + s.plays,
    }))
    .sort((a, b) => b.score - a.score);
}

// --- Seed Mock Data ---

export function seedMockData() {
  if (getAllSounds().length > 0) return; // Already seeded

  const defaultSounds = [
    { title: 'Thunder Clap Supreme', description: 'An earth-shattering thunderous roar', category: 'thunder', likes: 142, plays: 891, wins: 23, losses: 5 },
    { title: 'The Silent Assassin', description: 'Quiet... but deadly', category: 'silent-deadly', likes: 98, plays: 567, wins: 18, losses: 8 },
    { title: 'Musical Masterpiece', description: 'A fart as beautiful as music', category: 'musical', likes: 234, plays: 1203, wins: 31, losses: 3 },
    { title: 'Machine Gun Salute', description: 'Rat-tat-tat-tat... rapid fire!', category: 'machine-gun', likes: 176, plays: 934, wins: 25, losses: 7 },
    { title: 'Classic Rumbler', description: 'The classic fart everyone loves', category: 'classic', likes: 89, plays: 445, wins: 12, losses: 15 },
    { title: 'Squeaky Clean', description: 'High-pitched, like rubbing a balloon', category: 'squeaker', likes: 156, plays: 678, wins: 20, losses: 9 },
    { title: 'Atomic Bomb', description: 'A nuclear explosion from below', category: 'epic', likes: 312, plays: 1567, wins: 42, losses: 2 },
    { title: 'Wet & Wild', description: 'Dangerous... might have side effects', category: 'wet', likes: 67, plays: 890, wins: 8, losses: 20 },
    { title: 'The Trombone', description: 'Sounds like playing a trombone', category: 'musical', likes: 198, plays: 823, wins: 28, losses: 6 },
    { title: 'Ninja Puff', description: 'Comes and goes silently', category: 'silent-deadly', likes: 145, plays: 612, wins: 16, losses: 11 },
    { title: 'Dragon Breath (From below)', description: 'A dragon breathing fire... from the back', category: 'epic', likes: 267, plays: 1345, wins: 35, losses: 4 },
    { title: 'The Whoopee Cushion', description: 'Classic whoopee cushion sound', category: 'classic', likes: 123, plays: 556, wins: 14, losses: 13 },
  ];

  const mockUsers = [
    'ThunderCheeks69', 'SilentButDeadly', 'FartMaestro', 'GasGiant420',
    'AtomicBlaster', 'SqueakyNinja', 'WindWarrior99', 'CosmicRipper',
    'MightyRumbler', 'NuclearBoomer', 'VolcanicVent', 'SpicyBlaster',
  ];

  defaultSounds.forEach((mock, index) => {
    const sound = {
      id: uuidv4(),
      ...mock,
      audioUrl: null, // No actual audio in mock
      audioDuration: Math.floor(Math.random() * 15) + 2,
      userId: `user-${index}`,
      userName: mockUsers[index],
      createdAt: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString(),
    };
    create(STORAGE_KEYS.sounds, sound);
  });

  // Create some mock comments
  const sounds = getAllSounds();
  const sampleComments = [
    'Greatest fart sound I have ever heard! 💨',
    'LMAOOO im dead 😂',
    'A true champion 🏆',
    'This sound shook the earth!',
    'Drop the recipe... what did you eat? 🤣',
    'Bro... you need a license for that.',
    'This sound changed my life forever.',
    'Amazing, much respect 🙏',
  ];

  sounds.forEach((sound) => {
    const numComments = Math.floor(Math.random() * 4);
    for (let i = 0; i < numComments; i++) {
      const comment = {
        id: uuidv4(),
        soundId: sound.id,
        text: sampleComments[Math.floor(Math.random() * sampleComments.length)],
        userId: `user-${Math.floor(Math.random() * 12)}`,
        userName: mockUsers[Math.floor(Math.random() * mockUsers.length)],
        likes: Math.floor(Math.random() * 20),
        createdAt: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000).toISOString(),
      };
      create(STORAGE_KEYS.comments, comment);
    }
  });

  // Create a few battles
  if (sounds.length >= 4) {
    createBattle(sounds[0].id, sounds[1].id);
    createBattle(sounds[2].id, sounds[3].id);
    if (sounds.length >= 6) {
      createBattle(sounds[4].id, sounds[5].id);
    }
  }
}

// --- Clear All Data ---
export function clearAllData() {
  Object.values(STORAGE_KEYS).forEach((key) => localStorage.removeItem(key));
}
