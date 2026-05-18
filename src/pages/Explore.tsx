import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Grid3x3 as Grid3X3, List, Search } from 'lucide-react';
import { useSearch } from '../hooks/useAnime';
import { useDebounce } from '../hooks/useDebounce';
import { useAnimeStore } from '../store/useAnimeStore';
import { GENRE_LIST } from '../utils/constants';
import AnimeCard from '../components/ui/AnimeCard';
import SkeletonCard from '../components/ui/SkeletonCard';
import GenreBadge from '../components/ui/GenreBadge';
import PageWrapper from '../components/layout/PageWrapper';
import { jikanAPI } from '../services/jikan.service';
import { useQuery } from '@tanstack/react-query';

export default function Explore() {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialQuery = searchParams.get('q') || '';
  const [query, setQuery] = useState(initialQuery);
  const debouncedQuery = useDebounce(query, 350);
  const { selectedGenres, toggleGenre, clearGenres, sortBy, setSortBy, viewMode, setViewMode } = useAnimeStore();

  const { data: searchData, isLoading: searchLoading } = useSearch(debouncedQuery);

  const { data: browseData, isLoading: browseLoading } = useQuery({
    queryKey: ['browse', selectedGenres, sortBy],
    queryFn: async () => {
      const genreIds = selectedGenres.length > 0
        ? selectedGenres.map((g) => (GENRE_LIST as readonly string[]).indexOf(g) + 1).filter((id) => id > 0).join(',')
        : undefined;
      const params: Record<string, string> = { limit: '30' };
      if (genreIds) params.genres = genreIds;
      if (sortBy === 'score') params.order_by = 'score';
      else if (sortBy === 'popularity') params.order_by = 'members';
      else if (sortBy === 'new') params.order_by = 'start_date';
      else if (sortBy === 'title') params.order_by = 'title';
      params.sort = 'desc';
      const res = await jikanAPI.search('', params);
      return res.data.data;
    },
    enabled: !debouncedQuery,
    staleTime: 1000 * 60 * 5,
  });

  useEffect(() => {
    if (initialQuery) {
      setQuery(initialQuery);
      setSearchParams({});
    }
  }, [initialQuery, setSearchParams]);

  const anime = debouncedQuery ? searchData : browseData;
  const isLoading = debouncedQuery ? searchLoading : browseLoading;

  return (
    <PageWrapper>
      <div className="min-h-screen bg-void pt-8 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h1 className="font-display font-bold text-3xl sm:text-4xl text-text-primary mb-2">Explore Anime</h1>
            <p className="text-text-secondary text-sm">Discover your next favorite from thousands of titles</p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search anime by title..."
                className="w-full bg-void-surface/50 border border-glass-border rounded-card pl-10 pr-4 py-2.5 text-text-primary font-body text-sm placeholder:text-text-muted focus:outline-none focus:border-neon-cyan focus:shadow-neon-cyan transition-all duration-300"
              />
            </div>
            <div className="flex items-center gap-2">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-void-surface/50 border border-glass-border rounded-card px-3 py-2.5 text-text-primary text-sm font-mono focus:outline-none focus:border-neon-cyan transition-all"
              >
                <option value="score">Top Rated</option>
                <option value="popularity">Most Popular</option>
                <option value="new">Newest</option>
                <option value="title">A-Z</option>
              </select>
              <button
                onClick={() => setViewMode(viewMode === 'grid' ? 'list' : 'grid')}
                className="p-2.5 rounded-card border border-glass-border text-text-secondary hover:text-neon-cyan hover:border-neon-cyan/30 transition-all"
              >
                {viewMode === 'grid' ? <List className="w-4 h-4" /> : <Grid3X3 className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 mb-8">
            <button
              onClick={clearGenres}
              className={`px-3 py-1 rounded-full text-xs font-mono font-semibold border transition-all duration-200
                ${selectedGenres.length === 0
                  ? 'bg-neon-cyan/20 text-neon-cyan border-neon-cyan/30 ring-2 ring-neon-cyan/50'
                  : 'bg-glass-bg text-text-muted border-glass-border hover:text-text-secondary'
                }`}
            >
              All
            </button>
            {GENRE_LIST.map((genre) => (
              <GenreBadge
                key={genre}
                genre={genre}
                active={selectedGenres.includes(genre)}
                onClick={() => toggleGenre(genre)}
              />
            ))}
          </div>

          {isLoading ? (
            <div className={`grid gap-4 ${viewMode === 'grid' ? 'grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5' : 'grid-cols-1 sm:grid-cols-2'}`}>
              {Array.from({ length: 15 }).map((_, i) => <SkeletonCard key={i} />)}
            </div>
          ) : anime && anime.length > 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className={`grid gap-4 ${viewMode === 'grid' ? 'grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5' : 'grid-cols-1 sm:grid-cols-2'}`}
            >
              {anime.map((a: any, i: number) => (
                <AnimeCard key={a.mal_id} anime={a} index={i} />
              ))}
            </motion.div>
          ) : (
            <div className="text-center py-20">
              <p className="text-text-muted text-lg font-display">No anime found</p>
              <p className="text-text-muted text-sm mt-2">Try adjusting your search or filters</p>
            </div>
          )}
        </div>
      </div>
    </PageWrapper>
  );
}
