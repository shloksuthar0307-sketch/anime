export const formatScore = (score: number | null | undefined): string => {
  if (score == null) return 'N/A';
  return score.toFixed(1);
};

export const formatEpisodes = (episodes: number | null | undefined): string => {
  if (episodes == null) return 'TBA';
  return episodes.toString();
};

export const formatDate = (date: string | null | undefined): string => {
  if (!date) return 'Unknown';
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
};

export const truncateText = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength).trimEnd() + '...';
};

export const stripHtml = (html: string): string => {
  const tmp = document.createElement('div');
  tmp.innerHTML = html;
  return tmp.textContent || tmp.innerText || '';
};
