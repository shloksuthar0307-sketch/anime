export const MOODS = [
  { id: 'happy', emoji: '😊', label: 'Happy', color: '#FFD700' },
  { id: 'sad', emoji: '😢', label: 'Sad', color: '#4A90D9' },
  { id: 'motivated', emoji: '🔥', label: 'Motivated', color: '#FF4500' },
  { id: 'romantic', emoji: '💖', label: 'Romantic', color: '#FF69B4' },
  { id: 'dark', emoji: '🌑', label: 'Dark', color: '#BF00FF' },
  { id: 'lonely', emoji: '🌧️', label: 'Lonely', color: '#708090' },
  { id: 'chill', emoji: '🌿', label: 'Chill', color: '#00CED1' },
  { id: 'excited', emoji: '⚡', label: 'Excited', color: '#00F5FF' },
  { id: 'emotional', emoji: '🌊', label: 'Emotional', color: '#9370DB' },
] as const;

export const MOOD_GENRES: Record<string, { jikanIds: string; label: string }> = {
  happy: { jikanIds: '4,36', label: 'Comedy, Slice of Life' },
  sad: { jikanIds: '8,22', label: 'Drama, Romance' },
  motivated: { jikanIds: '2,23', label: 'Adventure, Shounen' },
  romantic: { jikanIds: '22,25', label: 'Romance, Shoujo' },
  dark: { jikanIds: '7,37', label: 'Mystery, Supernatural' },
  lonely: { jikanIds: '36,8', label: 'Slice of Life, Drama' },
  chill: { jikanIds: '36,4', label: 'Slice of Life, Comedy' },
  excited: { jikanIds: '1,24', label: 'Action, Sci-Fi' },
  emotional: { jikanIds: '8,10', label: 'Drama, Fantasy' },
};

export const GENRE_LIST = [
  'Action', 'Adventure', 'Comedy', 'Drama', 'Fantasy',
  'Horror', 'Mystery', 'Romance', 'Sci-Fi', 'Slice of Life',
  'Sports', 'Supernatural', 'Thriller', 'Music', 'Mecha',
] as const;

export const SEASONS = ['Winter', 'Spring', 'Summer', 'Fall'] as const;

export const getCurrentSeason = () => {
  const month = new Date().getMonth();
  if (month >= 0 && month <= 2) return 'winter';
  if (month >= 3 && month <= 5) return 'spring';
  if (month >= 6 && month <= 8) return 'summer';
  return 'fall';
};

export const getCurrentYear = () => new Date().getFullYear();
